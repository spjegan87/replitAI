import { Switch, Route } from "wouter";
import "./i18n";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import SearchResults from "@/pages/SearchResults";
import Itinerary from "@/pages/Itinerary";
import Payment from "@/pages/Payment";
import Confirmation from "@/pages/Confirmation";
import ETicket from "@/pages/ETicket";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search-results" component={SearchResults} />
      <Route path="/itinerary" component={Itinerary} />
      <Route path="/payment" component={Payment} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/e-ticket" component={ETicket} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
