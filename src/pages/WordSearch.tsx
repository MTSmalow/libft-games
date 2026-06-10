import { useState, useCallback, useEffect } from "react";
import { Link } from "wouter";
import { WORD_SEARCH_FUNCTIONS } from "@/data/libftData";

const GRID_SIZE = 15;

function buildGrid(words: string[]): { grid: string[][], placements: Map<string, number[][]> } {
  const grid: string[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => "")
  );
  const placements = new Map<string, number[][]>();

  const directions = [
    [0, 1], [1, 0], [1, 1], [-1, 1],
    [0, -1], [-1, 0], [-1, -1], [1, -1],
  ];

  for (const word of words) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 200) {
      attempts++;
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      const cells: number[][] = [];
      let fits = true;

      for (let i = 0; i < word.length; i++) {
        const r = row + dir[0] * i;
        const c = col + dir[1] * i;
        if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) { fits = false; break; }
        if (grid[r][c] !== "" && grid[r][c] !== word[i]) { fits = false; break; }
        cells.push([r, c]);
      }

      if (fits) {
        for (let i = 0; i < word.length; i++) {
          grid[cells[i][0]][cells[i][1]] = word[i];
        }
        placements.set(word, cells);
        placed = true;
      }
    }
  }

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, placements };
}

export default function WordSearch() {
  const words = WORD_SEARCH_FUNCTIONS.slice(0, 12);
  const [{ grid, placements }] = useState(() => buildGrid(words));
  const [found, setFound] = useState<Set<string>>(new Set());
  const [selecting, setSelecting] = useState<number[][] | null>(null);
  const [startCell, setStartCell] = useState<[number, number] | null>(null);
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());
  const [finished, setFinished] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (finished) return;
    const i = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(i);
  }, [finished, startTime]);

  const cellKey = (r: number, c: number) => `${r},${c}`;

  const getFoundCells = (): Set<string> => {
    const cells = new Set<string>();
    for (const word of found) {
      const placement = placements.get(word);
      if (placement) {
        for (const [r, c] of placement) cells.add(cellKey(r, c));
      }
    }
    return cells;
  };

  const getCellsBetween = (start: [number, number], end: [number, number]): number[][] => {
    const [r1, c1] = start;
    const [r2, c2] = end;
    const dr = Math.sign(r2 - r1);
    const dc = Math.sign(c2 - c1);
    const len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1));
    if (r1 !== r2 && c1 !== c2 && Math.abs(r2 - r1) !== Math.abs(c2 - c1)) return [[r1, c1]];
    const cells: number[][] = [];
    for (let i = 0; i <= len; i++) {
      cells.push([r1 + dr * i, c1 + dc * i]);
    }
    return cells;
  };

  const handleMouseDown = (r: number, c: number) => {
    setStartCell([r, c]);
    setSelecting([[r, c]]);
    setHighlighted(new Set([cellKey(r, c)]));
  };

  const handleMouseEnter = (r: number, c: number) => {
    if (!startCell) return;
    const cells = getCellsBetween(startCell, [r, c]);
    setSelecting(cells);
    setHighlighted(new Set(cells.map(([r, c]) => cellKey(r, c))));
  };

  const handleMouseUp = () => {
    if (!selecting || !startCell) return;
    const word = selecting.map(([r, c]) => grid[r][c]).join("");
    const wordRev = word.split("").reverse().join("");

    for (const target of words) {
      if ((word === target || wordRev === target) && !found.has(target)) {
        const newFound = new Set(found);
        newFound.add(target);
        setFound(newFound);
        if (newFound.size === words.length) setFinished(true);
        break;
      }
    }

    setStartCell(null);
    setSelecting(null);
    setHighlighted(new Set());
  };

  const foundCells = getFoundCells();
  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full terminal-border rounded-xl p-8 bg-card text-center slide-in">
          <div className="text-4xl mb-3">🔍</div>
          <div className="text-3xl font-bold text-orange-400 mb-2">Encontrou tudo!</div>
          <p className="text-muted-foreground text-sm mb-4">Todas as {words.length} funções encontradas!</p>
          <div className="text-xl font-bold font-mono text-white mb-8">{formatTime(elapsed)}</div>
          <div className="flex gap-3 justify-center">
            <Link href="/"><button className="px-5 py-2 rounded border border-muted text-muted-foreground hover:bg-secondary/50 transition-colors text-sm font-mono">Menu</button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-5xl mx-auto select-none">
      <div className="flex items-center justify-between mb-6">
        <Link href="/"><button className="text-muted-foreground hover:text-orange-400 transition-colors text-sm font-mono">← voltar</button></Link>
        <div className="flex items-center gap-4">
          <span className="text-orange-400 font-mono text-sm">{formatTime(elapsed)}</span>
          <span className="text-orange-400 font-mono text-sm font-bold">{found.size}/{words.length}</span>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="text-xl font-bold text-orange-400">Caça-Palavras libft</h1>
        <p className="text-muted-foreground text-xs mt-1">Clique e arraste para selecionar as funções (sem o prefixo ft_)</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Grid */}
        <div
          className="terminal-border rounded-xl p-3 bg-card"
          onMouseLeave={handleMouseUp}
        >
          {grid.map((row, r) => (
            <div key={r} className="flex">
              {row.map((cell, c) => {
                const key = cellKey(r, c);
                const isFound = foundCells.has(key);
                const isHighlighted = highlighted.has(key);
                return (
                  <div
                    key={c}
                    className={`
                      w-7 h-7 flex items-center justify-center text-xs font-bold font-mono cursor-pointer
                      transition-colors duration-100 rounded-sm
                      ${isFound
                        ? "bg-orange-500/30 text-orange-300"
                        : isHighlighted
                          ? "bg-cyan-500/30 text-cyan-300"
                          : "text-green-400/70 hover:text-green-300 hover:bg-green-500/10"
                      }
                    `}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                    onMouseUp={handleMouseUp}
                  >
                    {cell}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Word list */}
        <div className="flex-1">
          <div className="text-xs text-muted-foreground font-mono mb-3 uppercase tracking-wider">
            // Funções para encontrar (sem ft_):
          </div>
          <div className="grid grid-cols-2 gap-2">
            {words.map((word) => (
              <div
                key={word}
                className={`px-3 py-2 rounded border font-mono text-xs transition-colors
                  ${found.has(word)
                    ? "border-orange-500/40 bg-orange-500/15 text-orange-400 line-through"
                    : "border-border text-muted-foreground"
                  }`}
              >
                {found.has(word) ? "✓ " : "○ "}
                ft_{word.toLowerCase()}
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 rounded border border-border bg-secondary/20 text-xs text-muted-foreground font-mono">
            <div className="text-green-400/60 mb-1">// Direções:</div>
            <div>→ horizontal</div>
            <div>↓ vertical</div>
            <div>↗ ↘ diagonal</div>
            <div>← ↑ ↙ ↖ reverso</div>
          </div>
        </div>
      </div>
    </div>
  );
}
