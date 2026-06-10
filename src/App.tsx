import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import QuizGame from "@/pages/QuizGame";
import MatchGame from "@/pages/MatchGame";
import OutputGame from "@/pages/OutputGame";
import WordSearch from "@/pages/WordSearch";
import CodeFill from "@/pages/CodeFill";
import FunctionRef from "@/pages/FunctionRef";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quiz" component={QuizGame} />
      <Route path="/match" component={MatchGame} />
      <Route path="/output" component={OutputGame} />
      <Route path="/wordsearch" component={WordSearch} />
      <Route path="/codefill" component={CodeFill} />
      <Route path="/reference" component={FunctionRef} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="min-h-screen scanline">
            <Router />
          </div>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
