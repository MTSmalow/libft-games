import { useState } from "react";
import { Link } from "wouter";
import { LIBFT_FUNCTIONS, CATEGORY_COLORS, CATEGORY_LABELS } from "@/data/libftData";

export default function FunctionRef() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories = [...new Set(LIBFT_FUNCTIONS.map((f) => f.category))];

  const filtered = LIBFT_FUNCTIONS.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !activeCategory || f.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen px-4 py-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link href="/"><button className="text-muted-foreground hover:text-blue-400 transition-colors text-sm font-mono">← voltar</button></Link>
        <span className="text-xs text-muted-foreground font-mono">{filtered.length} funções</span>
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-bold text-blue-400 glow-text-cyan mb-1">Referência Rápida</h1>
        <p className="text-muted-foreground text-xs">Todas as funções da libft com protótipos e exemplos</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-mono">$</span>
        <input
          type="text"
          placeholder="Buscar função ou descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm font-mono
            focus:outline-none focus:border-blue-500/60 placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1 rounded border text-xs font-mono transition-colors
            ${!activeCategory ? "border-blue-500/60 bg-blue-500/15 text-blue-300" : "border-border text-muted-foreground hover:border-blue-500/30"}`}
        >
          Todas
        </button>
        {categories.map((cat) => {
          const colors = CATEGORY_COLORS[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-3 py-1 rounded border text-xs font-mono transition-colors
                ${activeCategory === cat ? colors : "border-border text-muted-foreground hover:border-current"}`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          );
        })}
      </div>

      {/* Functions list */}
      <div className="space-y-2">
        {filtered.map((fn) => {
          const isOpen = expanded === fn.name;
          const colors = CATEGORY_COLORS[fn.category];
          return (
            <div
              key={fn.name}
              className={`terminal-border rounded-lg bg-card overflow-hidden transition-all duration-200`}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : fn.name)}
                className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold font-mono ${colors.split(" ")[0]}`}>
                    {fn.name}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded border ${colors}`}>
                    {CATEGORY_LABELS[fn.category]}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground hidden sm:block max-w-xs truncate">
                    {fn.description}
                  </span>
                  <span className={`text-muted-foreground text-sm transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-border/50 pt-3 slide-in">
                  <p className="text-sm text-foreground mb-3">{fn.description}</p>

                  <div className="code-block rounded-lg p-3 mb-3">
                    <div className="text-xs text-muted-foreground font-mono mb-1">// protótipo</div>
                    <code className="text-green-300 font-mono text-sm">{fn.prototype}</code>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="bg-secondary/30 rounded p-3">
                      <div className="text-xs text-muted-foreground font-mono mb-1">// parâmetros</div>
                      <p className="text-xs text-foreground/80">{fn.params}</p>
                    </div>
                    <div className="bg-secondary/30 rounded p-3">
                      <div className="text-xs text-muted-foreground font-mono mb-1">// retorno</div>
                      <p className="text-xs text-foreground/80">{fn.returns}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-yellow-500/5 border border-yellow-500/20 rounded p-3 mb-3">
                    <span className="text-yellow-400 text-xs mt-0.5">💡</span>
                    <p className="text-xs text-yellow-300/80">{fn.hint}</p>
                  </div>

                  {fn.example && (
                    <div className="code-block rounded-lg p-3">
                      <div className="text-xs text-muted-foreground font-mono mb-1">// exemplo</div>
                      <pre className="text-cyan-300 font-mono text-xs whitespace-pre-wrap">{fn.example}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground font-mono text-sm">
            <div className="text-2xl mb-2">∅</div>
            Nenhuma função encontrada para "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
