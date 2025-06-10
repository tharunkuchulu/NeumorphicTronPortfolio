import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { TransitionProvider } from "@/components/GlobalTransitionManager";
import Portfolio from "@/pages/Portfolio";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AnalyticsProvider>
          <TransitionProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </TransitionProvider>
        </AnalyticsProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
