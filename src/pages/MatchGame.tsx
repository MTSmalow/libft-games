import { useState, useCallback, useEffect } from "react";
import { Link } from "wouter";
import { MATCH_PAIRS } from "@/data/libftData";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function MatchGame() {
  const pairs = MATCH_PAIRS.slice(0, 10);
  const [functions] = useState(() => shuffle(pairs.map((p) => p.function)));
  const [descriptions] = useState(() => shuffle(pairs.map((p) => p.description)));

  const [selectedFn, setSelectedFn] = useState<string | null>(null);
  const [selectedDesc, setSelectedDesc] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [finished, startTime]);

  const handleFn = useCallback((fn: string) => {
    if (matched.has(fn)) return;
    if (selectedFn === fn) {
      setSelectedFn(null);
      return;
    }
    setSelectedFn(fn);
    setWrong(null);
  }, [matched, selectedFn]);

  const handleDesc = useCallback((desc: string) => {
    if (!selectedFn) return;
    const pairedFn = pairs.find((p) => p.description === desc)?.function;
    if (pairedFn === selectedFn) {
      const newMatched = new Set(matched);
      newMatched.add(selectedFn);
      setMatched(newMatched);
      setScore((s) => s + 1);
      setSelectedFn(null);
      setSelectedDesc(null);
      setWrong(null);
      if (newMatched.size === pairs.length) {
        setTimeout(() => setFinished(true), 300);
      }
    } else {
      setWrong(desc);
      setMistakes((m) => m + 1);
      setTimeout(() => {
        setSelectedFn(null);
        setSelectedDesc(null);
        setWrong(null);
      }, 600);
    }
  }, [selectedFn, matched, pairs]);

  const restart = () => {
    setSelectedFn(null);
    setSelectedDesc(null);
    setMatched(new Set());
    setWrong(null);
    setScore(0);
    setMistakes(0);
    setFinished(false);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full terminal-border rounded-xl p-8 bg-card text-center slide-in">
          <div className="text-5xl mb-4">🎉</div>
          <div className="text-3xl font-bold text-green-400 glow-text mb-2">Parabéns!</div>
          <p className="text-muted-foreground mb-6 text-sm">
            Você conectou todos os {pairs.length} pares!
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-secondary/50 rounded-lg p-3">
              <div className="text-xl font-bold text-white font-mono">{formatTime(elapsed)}</div>
              <div className="text-xs text-muted-foreground">Tempo total</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3">
              <div className={`text-xl font-bold font-mono ${mistakes === 0 ? "text-green-400" : mistakes < 5 ? "text-yellow-400" : "text-red-400"}`}>
                {mistakes}
              </div>
              <div className="text-xs text-muted-foreground">Erros</div>
            </div>
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
    <div className="min-h-screen px-4 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <button className="text-muted-foreground hover:text-green-400 transition-colors text-sm font-mono">
            ← voltar
          </button>
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-cyan-400 font-mono text-sm">{formatTime(elapsed)}</span>
          <span className="text-green-400 font-mono text-sm font-bold">✓ {score}/{pairs.length}</span>
          <span className="text-red-400 font-mono text-sm">✗ {mistakes}</span>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-bold text-cyan-400 glow-text-cyan">Jogo da Memória</h1>
        <p className="text-muted-foreground text-xs mt-1">
          Clique em uma função, depois clique na descrição correspondente
        </p>
      </div>

      {/* Progress */}
      <div className="h-1 bg-secondary rounded-full mb-8">
        <div
          className="h-full bg-cyan-400 rounded-full transition-all duration-300"
          style={{ width: `${(score / pairs.length) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Functions column */}
        <div>
          <div className="text-xs text-muted-foreground font-mono mb-3 uppercase tracking-wider">
          </div>
          <div className="space-y-2">
            {functions.map((fn) => {
              const isMatched = matched.has(fn);
              const isSelected = selectedFn === fn;
              return (
                <button
                  key={fn}
                  onClick={() => handleFn(fn)}
                  disabled={isMatched}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg border font-mono text-sm transition-all duration-150
                    ${isMatched
                      ? "border-green-500/30 bg-green-500/10 text-green-400/50 line-through cursor-default"
                      : isSelected
                        ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 glow-cyan"
                        : "border-border text-foreground hover:border-cyan-500/50 hover:bg-cyan-500/5 cursor-pointer"
                    }
                  `}
                >
                  {fn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Descriptions column */}
        <div>
          <div className="text-xs text-muted-foreground font-mono mb-3 uppercase tracking-wider">
          </div>
          <div className="space-y-2">
            {descriptions.map((desc) => {
              const matchedFn = pairs.find((p) => p.description === desc)?.function;
              const isMatched = matchedFn ? matched.has(matchedFn) : false;
              const isWrong = wrong === desc;
              return (
                <button
                  key={desc}
                  onClick={() => handleDesc(desc)}
                  disabled={isMatched || !selectedFn}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150
                    ${isMatched
                      ? "border-green-500/30 bg-green-500/10 text-green-400/50 cursor-default"
                      : isWrong
                        ? "border-red-500 bg-red-500/20 text-red-300"
                        : selectedFn
                          ? "border-border text-foreground hover:border-cyan-500/50 hover:bg-cyan-500/5 cursor-pointer"
                          : "border-border text-muted-foreground cursor-default opacity-60"
                    }
                  `}
                >
                  {desc}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {!selectedFn && score < pairs.length && (
        <div className="mt-6 text-center text-xs text-muted-foreground font-mono animate-pulse">
          Selecione uma função para começar
        </div>
      )}
    </div>
  );
}
