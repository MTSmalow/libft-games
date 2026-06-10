import { useState } from "react";
import { Link } from "wouter";

interface OutputQuestion {
  title: string;
  code: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: OutputQuestion[] = [
  {
    title: "ft_strlen + printf",
    code: `char *s = "42 school";
printf("%zu", ft_strlen(s));`,
    options: ["9", "8", "10", "2"],
    correct: 0,
    explanation: '4, 2, espaço, s, c, h, o, o, l = 9 caracteres. ft_strlen não conta o \'\\0\'.',
  },
  {
    title: "ft_atoi negativo",
    code: `printf("%d", ft_atoi("   -0042"));`,
    options: ["-42", "42", "0", "-0042"],
    correct: 0,
    explanation: 'ft_atoi ignora espaços iniciais, processa o \'-\', e lê "0042" convertendo para -42.',
  },
  {
    title: "ft_substr básico",
    code: `char *s = ft_substr("libft42", 3, 2);
printf("%s", s);`,
    options: ["ft", "ib", "bt", "42"],
    correct: 0,
    explanation: '"libft42": índice 0=l, 1=i, 2=b, 3=f, 4=t. ft_substr(s, 3, 2) pega 2 chars a partir do índice 3: "ft".',
  },
  {
    title: "ft_strjoin",
    code: `char *s = ft_strjoin("Hello", " World");
printf("%zu", ft_strlen(s));`,
    options: ["11", "10", "12", "5"],
    correct: 0,
    explanation: '"Hello" (5) + " World" (6) = 11 caracteres no total. ft_strlen não conta o \'\\0\'.',
  },
  {
    title: "ft_strtrim",
    code: `char *s = ft_strtrim("xxHello Worldxx", "x");
printf("%s", s);`,
    options: ["Hello World", "xxHello World", "Hello Worldxx", "Hello"],
    correct: 0,
    explanation: 'ft_strtrim remove todos os \'x\' do início e do fim. O \'x\' dentro da string NÃO é removido.',
  },
  {
    title: "ft_isalpha retorno",
    code: `int a = ft_isalpha('A');
int b = ft_isalpha('5');
printf("%d %d", a > 0, b);`,
    options: ["1 0", "1 1", "0 0", "65 0"],
    correct: 0,
    explanation: 'ft_isalpha(\'A\') retorna valor não-zero (>0), então (a > 0) é 1. ft_isalpha(\'5\') retorna 0.',
  },
  {
    title: "ft_strchr com \\0",
    code: `char *s = "42";
char *p = ft_strchr(s, '\\0');
printf("%d", p != NULL);`,
    options: ["1", "0", "Segfault", "2"],
    correct: 0,
    explanation: "ft_strchr pode encontrar o terminador '\\0'. A string sempre termina com '\\0', então p aponta para o final da string, não é NULL.",
  },
  {
    title: "ft_itoa",
    code: `char *s = ft_itoa(-2147483648);
printf("%s", s);`,
    options: ["-2147483648", "2147483648", "NULL", "0"],
    correct: 0,
    explanation: "ft_itoa deve tratar INT_MIN (-2147483648) corretamente, usando long internamente para evitar overflow.",
  },
  {
    title: "ft_memset",
    code: `char buf[6] = "hello";
ft_memset(buf, 'x', 3);
printf("%s", buf);`,
    options: ["xxxlo", "xxxxx", "hello", "xxx"],
    correct: 0,
    explanation: 'ft_memset preenche os PRIMEIROS n=3 bytes com \'x\': buf = {\'x\',\'x\',\'x\',\'l\',\'o\',\'\\0\'}. printf lê até \'\\0\'.',
  },
  {
    title: "ft_split básico",
    code: `char **arr = ft_split("a:b:c", ':');
printf("%s", arr[1]);`,
    options: ["b", "a", "c", ":b:"],
    correct: 0,
    explanation: 'ft_split("a:b:c", \':\') resulta em ["a", "b", "c", NULL]. O índice 1 é "b".',
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions(q: OutputQuestion): OutputQuestion {
  const indexed = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correct }));
  const shuffled = shuffle(indexed);
  return { ...q, options: shuffled.map((x) => x.opt), correct: shuffled.findIndex((x) => x.isCorrect) };
}

export default function OutputGame() {
  const [questions, setQuestions] = useState(() => shuffle(QUESTIONS).map(shuffleOptions));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const q = questions[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.correct;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, correct]);
  };

  const handleNext = () => {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  if (finished) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full terminal-border rounded-xl p-8 bg-card text-center slide-in">
          <div className="text-4xl font-bold mb-2 text-yellow-400">{score}/{QUESTIONS.length}</div>
          <div className={`text-xl font-bold mb-4 ${pct >= 80 ? "text-green-400" : pct >= 60 ? "text-yellow-400" : "text-red-400"}`}>
            {pct >= 80 ? "Você pensa como um compilador!" : pct >= 60 ? "Bom trabalho!" : "Continue praticando!"}
          </div>
          <div className="text-muted-foreground text-sm mb-8">
            Acertou {pct}% das questões de saída de código.
          </div>
          <div className="flex gap-2 mb-8 justify-center flex-wrap">
            {answers.map((ok, i) => (
              <div key={i} className={`w-8 h-8 rounded text-xs flex items-center justify-center font-bold font-mono
                ${ok ? "bg-green-500/20 text-green-400 border border-green-500/40" : "bg-red-500/20 text-red-400 border border-red-500/40"}`}>
                {i + 1}
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setQuestions(shuffle(QUESTIONS).map(shuffleOptions)); setCurrent(0); setSelected(null); setScore(0); setFinished(false); setAnswers([]); }}
              className="px-5 py-2 rounded border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10 transition-colors text-sm font-mono"
            >
              Jogar Novamente
            </button>
            <Link href="/"><button className="px-5 py-2 rounded border border-muted text-muted-foreground hover:bg-secondary/50 transition-colors text-sm font-mono">Menu</button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link href="/"><button className="text-muted-foreground hover:text-yellow-400 transition-colors text-sm font-mono">← voltar</button></Link>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground font-mono">{current + 1}/{QUESTIONS.length}</span>
          <span className="text-yellow-400 font-mono text-sm font-bold">✓ {score}</span>
        </div>
      </div>

      <div className="h-1 bg-secondary rounded-full mb-8">
        <div className="h-full bg-yellow-400 rounded-full transition-all duration-500" style={{ width: `${(current / QUESTIONS.length) * 100}%` }} />
      </div>

      <div className="terminal-border rounded-xl bg-card overflow-hidden mb-6 slide-in" key={current}>
        {/* Code header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-secondary/30 border-b border-border">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="text-xs text-muted-foreground ml-2 font-mono">{q.title}.c</span>
        </div>

        {/* Code block */}
        <div className="p-5">
          <div className="text-xs text-muted-foreground font-mono mb-3">// Qual a saída deste código?</div>
          <pre className="code-block rounded p-4 text-sm text-green-300 font-mono overflow-x-auto leading-relaxed">
            <code>{q.code}</code>
          </pre>
        </div>

        {/* Options */}
        <div className="px-5 pb-5 space-y-2">
          <div className="text-xs text-muted-foreground font-mono mb-3">// Saída (stdout):</div>
          {q.options.map((opt, idx) => {
            let style = "border-border text-foreground hover:border-yellow-500/50 hover:bg-yellow-500/5";
            if (selected !== null) {
              if (idx === q.correct) style = "border-green-500 bg-green-500/20 text-green-300";
              else if (idx === selected) style = "border-red-500 bg-red-500/20 text-red-300";
              else style = "border-border text-muted-foreground opacity-50";
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 font-mono text-sm ${style} ${selected === null ? "cursor-pointer" : "cursor-default"}`}
              >
                <span className="text-muted-foreground mr-3">{String.fromCharCode(65 + idx)})</span>
                <span className="text-cyan-300">"{opt}"</span>
              </button>
            );
          })}
        </div>
      </div>

      {selected !== null && (
        <div className="code-block rounded-lg p-4 mb-6 slide-in">
          <div className="text-xs text-yellow-500/60 font-mono mb-1">// explicação</div>
          <p className="text-sm text-yellow-300/90 leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-lg border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 transition-colors font-mono text-sm"
        >
          {current + 1 >= QUESTIONS.length ? "Ver Resultado →" : "Próxima →"}
        </button>
      )}
    </div>
  );
}
