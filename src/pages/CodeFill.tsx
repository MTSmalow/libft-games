import { useState } from "react";
import { Link } from "wouter";
import { CODE_FILL_QUESTIONS } from "@/data/libftData";

export default function CodeFill() {
  const [current, setCurrent] = useState(0);
  const [inputs, setInputs] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [totalBlanks, setTotalBlanks] = useState(0);

  const q = CODE_FILL_QUESTIONS[current];

  const handleInput = (idx: number, val: string) => {
    const next = [...inputs];
    next[idx] = val;
    setInputs(next);
  };

  const handleCheck = () => {
    const res = q.blanks.map((b, i) =>
      (inputs[i] || "").trim().toLowerCase() === b.answer.trim().toLowerCase()
    );
    setResults(res);
    const correct = res.filter(Boolean).length;
    setScore(correct);
    setChecked(true);
  };

  const handleNext = () => {
    setTotalScore((t) => t + score);
    setTotalBlanks((t) => t + q.blanks.length);
    if (current + 1 >= CODE_FILL_QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setInputs([]);
      setChecked(false);
      setResults([]);
      setScore(0);
    }
  };

  const renderCode = () => {
    let code = q.codeTemplate;
    const parts: React.ReactNode[] = [];
    let keyIdx = 0;

    q.blanks.forEach((blank, idx) => {
      const split = code.split(blank.placeholder);
      if (split.length > 1) {
        parts.push(<span key={`pre-${idx}`}>{split[0]}</span>);
        code = split.slice(1).join(blank.placeholder);

        const isCorrect = checked && results[idx] === true;
        const isWrong = checked && results[idx] === false;

        parts.push(
          <span key={`blank-${idx}`} className="inline-flex items-center">
            <input
              type="text"
              value={inputs[idx] || ""}
              onChange={(e) => handleInput(idx, e.target.value)}
              disabled={checked}
              placeholder={`___${idx + 1}___`}
              className={`
                inline-block border-b-2 bg-transparent font-mono text-sm text-center outline-none px-1
                min-w-[80px] max-w-[160px]
                ${isCorrect ? "border-green-400 text-green-300" :
                  isWrong ? "border-red-400 text-red-300" :
                  "border-yellow-500/60 text-yellow-300 focus:border-yellow-400"}
              `}
              style={{ width: Math.max(80, (inputs[idx]?.length || 6) * 9) + "px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !checked) handleCheck();
              }}
            />
            {isCorrect && <span className="text-green-400 ml-1 text-xs">✓</span>}
            {isWrong && <span className="text-red-400 ml-1 text-xs">✗</span>}
          </span>
        );
        keyIdx++;
      }
    });
    parts.push(<span key="rest">{code}</span>);
    return parts;
  };

  if (finished) {
    const pct = Math.round(((totalScore + score) / (totalBlanks + q.blanks.length)) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full terminal-border rounded-xl p-8 bg-card text-center slide-in">
          <div className="text-4xl font-bold mb-2 text-purple-400">
            {totalScore}/{totalBlanks}
          </div>
          <div className={`text-xl font-bold mb-4 ${pct >= 80 ? "text-green-400" : pct >= 60 ? "text-yellow-400" : "text-red-400"}`}>
            {pct >= 80 ? "Mão na massa!" : pct >= 60 ? "Quase lá!" : "Continue praticando!"}
          </div>
          <p className="text-muted-foreground text-sm mb-8">
            Você preencheu corretamente {pct}% das lacunas de código.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setCurrent(0); setInputs([]); setChecked(false);
                setResults([]); setScore(0); setFinished(false);
                setTotalScore(0); setTotalBlanks(0);
              }}
              className="px-5 py-2 rounded border border-purple-500/40 text-purple-400 hover:bg-purple-500/10 transition-colors text-sm font-mono"
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
        <Link href="/"><button className="text-muted-foreground hover:text-purple-400 transition-colors text-sm font-mono">← voltar</button></Link>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground font-mono">{current + 1}/{CODE_FILL_QUESTIONS.length}</span>
        </div>
      </div>

      <div className="h-1 bg-secondary rounded-full mb-8">
        <div className="h-full bg-purple-400 rounded-full transition-all duration-500"
          style={{ width: `${(current / CODE_FILL_QUESTIONS.length) * 100}%` }} />
      </div>

      <div className="terminal-border rounded-xl bg-card overflow-hidden mb-6 slide-in" key={current}>
        <div className="flex items-center gap-2 px-4 py-2 bg-secondary/30 border-b border-border">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="text-xs text-muted-foreground ml-2 font-mono">{q.title}.c</span>
        </div>

        <div className="p-5">
          <div className="mb-4">
            <div className="text-purple-400 font-bold text-base mb-1">{q.title}</div>
            <p className="text-muted-foreground text-sm">{q.description}</p>
          </div>

          <div className="code-block rounded-lg p-4 mb-4 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed text-green-300 whitespace-pre-wrap">
              {renderCode()}
            </pre>
          </div>

          {/* Hints */}
          <div className="space-y-2 mb-4">
            {q.blanks.map((blank, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-mono">
                <span className="text-yellow-500/60">___{idx + 1}___</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-yellow-300/70">{blank.hint}</span>
                {checked && (
                  <span className={results[idx] ? "text-green-400" : "text-red-400"}>
                    {results[idx] ? "✓" : `✗ (correto: ${blank.answer})`}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {checked && (
        <div className="code-block rounded-lg p-4 mb-6 slide-in">
          <div className="text-xs text-purple-500/60 font-mono mb-1">// explicação</div>
          <p className="text-sm text-purple-300/90 leading-relaxed">{q.explanation}</p>
          <div className="mt-2 text-xs font-mono text-purple-400">
            Acertos: {score}/{q.blanks.length}
          </div>
        </div>
      )}

      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={inputs.filter(Boolean).length === 0}
          className="w-full py-3 rounded-lg border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 transition-colors font-mono text-sm disabled:opacity-40"
        >
          Verificar Respostas
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-lg border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 transition-colors font-mono text-sm"
        >
          {current + 1 >= CODE_FILL_QUESTIONS.length ? "Ver Resultado →" : "Próxima →"}
        </button>
      )}
    </div>
  );
}
