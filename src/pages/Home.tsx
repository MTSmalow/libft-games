import { Link } from "wouter";
import { useState, useEffect } from "react";
import { LIBFT_FUNCTIONS } from "@/data/libftData";

function pickRandom5(): string[] {
  const all = [...LIBFT_FUNCTIONS];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.slice(0, 5).map((f) => f.name);
}

const games = [
  {
    path: "/quiz",
    icon: "?",
    title: "Quiz de Funções",
    description: "Teste seus conhecimentos sobre o que cada função faz, seus retornos e comportamentos especiais.",
    color: "green",
    badge: "15 perguntas",
    difficulty: "Médio",
  },
  {
    path: "/match",
    icon: "⟷",
    title: "Jogo da Memória",
    description: "Conecte cada função ft_ com sua descrição correta. Treine a memorização das funções.",
    color: "cyan",
    badge: "20 pares",
    difficulty: "Fácil",
  },
  {
    path: "/output",
    icon: ">",
    title: "Adivinhe a Saída",
    description: "Dado um trecho de código C usando funções libft, qual será o output? Pense como um compilador.",
    color: "yellow",
    badge: "10 questões",
    difficulty: "Difícil",
  },
  {
    path: "/codefill",
    icon: "_",
    title: "Complete o Código",
    description: "Preencha as lacunas nas implementações das funções. Entenda como cada função é construída.",
    color: "purple",
    badge: "5 funções",
    difficulty: "Difícil",
  },
  {
    path: "/wordsearch",
    icon: "#",
    title: "Caça-Palavras",
    description: "Encontre os nomes das funções libft escondidos na grade. Treine o vocabulário do projeto.",
    color: "orange",
    badge: "18 funções",
    difficulty: "Fácil",
  },
  {
    path: "/reference",
    icon: "{}",
    title: "Referência Rápida",
    description: "Consulte todas as funções do libft com protótipos, parâmetros, retornos e exemplos de uso.",
    color: "blue",
    badge: "33 funções",
    difficulty: "Consulta",
  },
];

const colorMap: Record<string, { border: string; text: string; bg: string; badge: string; glow: string }> = {
  green:  { border: "border-green-500/40",  text: "text-green-400",  bg: "hover:bg-green-500/5",  badge: "bg-green-500/20 text-green-300",  glow: "hover:border-green-400/70 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]" },
  cyan:   { border: "border-cyan-500/40",   text: "text-cyan-400",   bg: "hover:bg-cyan-500/5",   badge: "bg-cyan-500/20 text-cyan-300",    glow: "hover:border-cyan-400/70 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]" },
  yellow: { border: "border-yellow-500/40", text: "text-yellow-400", bg: "hover:bg-yellow-500/5", badge: "bg-yellow-500/20 text-yellow-300", glow: "hover:border-yellow-400/70 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]" },
  purple: { border: "border-purple-500/40", text: "text-purple-400", bg: "hover:bg-purple-500/5", badge: "bg-purple-500/20 text-purple-300", glow: "hover:border-purple-400/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]" },
  orange: { border: "border-orange-500/40", text: "text-orange-400", bg: "hover:bg-orange-500/5", badge: "bg-orange-500/20 text-orange-300", glow: "hover:border-orange-400/70 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]" },
  blue:   { border: "border-blue-500/40",   text: "text-blue-400",   bg: "hover:bg-blue-500/5",   badge: "bg-blue-500/20 text-blue-300",    glow: "hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
};

const difficultyColor: Record<string, string> = {
  "Fácil":    "text-green-400",
  "Médio":    "text-yellow-400",
  "Difícil":  "text-red-400",
  "Consulta": "text-blue-400",
};

export default function Home() {
  const [randomFns] = useState(pickRandom5);
  const [typed, setTyped] = useState("");
  const fullText = "libft_games";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen px-4 py-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <span className="text-green-500/60 text-sm font-mono tracking-widest">42 SCHOOL PROJECT</span>
        </div>
        <h1 className="text-5xl font-bold mb-3 glow-text">
          <span className="text-green-400">$</span>{" "}
          <span className="text-white">{typed}</span>
          {typed.length < fullText.length && (
            <span className="inline-block w-0.5 h-10 bg-green-400 ml-1 animate-pulse" />
          )}
        </h1>
        <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
          Aprenda as funções da libft da 42 jogando.
          <br />
          <span className="text-green-400/80">Teoria + prática + diversão.</span>
        </p>

        <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
          {randomFns.map((fn) => (
            <span key={fn} className="text-xs font-mono px-2 py-1 rounded border border-green-500/20 text-green-500/60">
              {fn}
            </span>
          ))}
        </div>
      </div>

      {/* Terminal prompt */}
      <div className="mb-8 px-4 py-3 rounded-lg border border-green-500/20 bg-green-500/5 flex items-center gap-3">
        <span className="text-green-400 text-sm">$</span>
        <span className="text-green-300/80 text-sm font-mono">Escolha um jogo para começar a aprender as funções do libft</span>
        <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse" />
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => {
          const c = colorMap[game.color];
          return (
            <Link key={game.path} href={game.path}>
              <div
                className={`
                  group relative rounded-lg border p-5 cursor-pointer transition-all duration-200
                  bg-card terminal-border
                  ${c.border} ${c.bg} ${c.glow}
                `}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`text-2xl font-bold font-mono ${c.text}`}>
                    {game.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded font-mono ${c.badge}`}>
                      {game.badge}
                    </span>
                    <span className={`text-xs font-mono ${difficultyColor[game.difficulty]}`}>
                      {game.difficulty}
                    </span>
                  </div>
                </div>

                <h2 className={`text-base font-bold mb-2 ${c.text}`}>
                  {game.title}
                </h2>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {game.description}
                </p>

                <div className={`mt-4 text-xs font-mono ${c.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  → Jogar agora
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-xs text-muted-foreground space-y-1">
        <div>
          <span className="text-green-500/50">// </span>
          Baseado no projeto libft da 42 School
        </div>
        <div className="text-green-500/30">
          {"/* ft_strlen | ft_memcpy | ft_atoi | ft_split | ft_substr ... */"}
        </div>
      </div>
    </div>
  );
}
