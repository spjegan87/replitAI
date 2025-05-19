import { Switch, Route } from "wouter";
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
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

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
        <I18nextProvider i18n={i18n}>
          <Router />
        </I18nextProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;