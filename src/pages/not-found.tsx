import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl font-bold text-green-400/30 font-mono mb-4">404</div>
        <div className="text-xl font-bold text-muted-foreground mb-2">Página não encontrada</div>
        <p className="text-muted-foreground text-sm mb-6 font-mono">
          <span className="text-red-400">error:</span> segmentation fault (core dumped)
        </p>
        <Link href="/">
          <button className="px-5 py-2 rounded border border-green-500/40 text-green-400 hover:bg-green-500/10 transition-colors text-sm font-mono">
            ← Voltar ao Menu
          </button>
        </Link>
      </div>
    </div>
  );
}
