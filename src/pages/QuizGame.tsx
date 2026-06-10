import { useState, useCallback } from "react";
import { Link } from "wouter";
import { QUIZ_QUESTIONS } from "@/data/libftData";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions<T extends { options: string[]; correct: number }>(q: T): T {
  const indexed = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correct }));
  const shuffled = shuffle(indexed);
  const newCorrect = shuffled.findIndex((x) => x.isCorrect);
  return { ...q, options: shuffled.map((x) => x.opt), correct: newCorrect };
}

export default function QuizGame() {
  const [questions, setQuestions] = useState(() =>
    shuffle(QUIZ_QUESTIONS).slice(0, 10).map(shuffleOptions)
  );
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const q = questions[current];

  const handleSelect = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.correct;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, correct]);
    setShowExplanation(true);
  }, [selected, q]);

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  }, [current, questions.length]);

  const restart = () => {
    setQuestions(shuffle(QUIZ_QUESTIONS).slice(0, 10).map(shuffleOptions));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setShowExplanation(false);
  };

  const progress = ((current) / questions.length) * 100;

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const grade = pct >= 80 ? "Excelente!" : pct >= 60 ? "Bom trabalho!" : "Continue estudando!";
    const gradeColor = pct >= 80 ? "text-green-400" : pct >= 60 ? "text-yellow-400" : "text-red-400";
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full terminal-border rounded-xl p-8 bg-card text-center slide-in">
          <div className="text-4xl font-bold mb-2 text-green-400 glow-text">
            {score}/{questions.length}
          </div>
          <div className={`text-2xl font-bold mb-4 ${gradeColor}`}>{grade}</div>
          <div className="text-muted-foreground mb-6 text-sm">
            Você acertou {pct}% das questões sobre a libft.
          </div>

          <div className="flex gap-2 mb-8 justify-center flex-wrap">
            {answers.map((ok, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded text-xs flex items-center justify-center font-bold font-mono
                  ${ok ? "bg-green-500/20 text-green-400 border border-green-500/40" : "bg-red-500/20 text-red-400 border border-red-500/40"}`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={restart}
              className="px-5 py-2 rounded border border-green-500/40 text-green-400 hover:bg-green-500/10 transition-colors text-sm font-mono"
            >
              Jogar Novamente
            </button>
            <Link href="/">
              <button className="px-5 py-2 rounded border border-muted text-muted-foreground hover:bg-secondary/50 transition-colors text-sm font-mono">
                Menu
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <button className="text-muted-foreground hover:text-green-400 transition-colors text-sm font-mono">
            ← voltar
          </button>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground font-mono">
            {current + 1}/{questions.length}
          </span>
          <span className="text-green-400 font-mono text-sm font-bold">
            ✓ {score}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-secondary rounded-full mb-8">
        <div
          className="h-full bg-green-400 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Function badge */}
      <div className="mb-3">
        <span className="text-xs font-mono px-2 py-1 rounded border border-green-500/30 bg-green-500/10 text-green-400">
          {q.functionName}
        </span>
      </div>

      {/* Question */}
      <div className="terminal-border rounded-xl p-6 bg-card mb-6 slide-in" key={current}>
        <h2 className="text-lg font-bold text-white mb-6 leading-relaxed font-mono">
          <span className="text-green-400">Q{current + 1}. </span>
          {q.question}
        </h2>

        <div className="space-y-3">
          {q.options.map((option, idx) => {
            let style = "border-border text-foreground hover:border-green-500/50 hover:bg-green-500/5";
            if (selected !== null) {
              if (idx === q.correct) {
                style = "border-green-500 bg-green-500/20 text-green-300";
              } else if (idx === selected && idx !== q.correct) {
                style = "border-red-500 bg-red-500/20 text-red-300";
              } else {
                style = "border-border text-muted-foreground opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                className={`
                  w-full text-left px-4 py-3 rounded-lg border transition-all duration-150
                  font-mono text-sm ${style}
                  ${selected === null ? "cursor-pointer" : "cursor-default"}
                `}
              >
                <span className="text-muted-foreground mr-3">
                  {String.fromCharCode(65 + idx)})
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="code-block rounded-lg p-4 mb-6 slide-in">
          <div className="text-xs text-green-500/60 font-mono mb-1">// explicação</div>
          <p className="text-sm text-green-300/90 leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {/* Next button */}
      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-lg border border-green-500/50 text-green-400 hover:bg-green-500/10 transition-colors font-mono text-sm glow-green pulse-glow"
        >
          {current + 1 >= questions.length ? "Ver Resultado →" : "Próxima Questão →"}
        </button>
      )}
    </div>
  );
}
