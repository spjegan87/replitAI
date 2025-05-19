import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import SearchResults from "@/pages/SearchResults";
import Itinerary from "@/pages/Itinerary";
import Payment from "@/pages/Payment";
import Confirmation from "@/pages/Confirmation";
import ETicket from "@/pages/ETicket";
import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function Router() {
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [hasNetworkError, setHasNetworkError] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Session timeout after 2 minutes
    const sessionTimeout = setTimeout(() => {
      setIsSessionExpired(true);
      setLocation("/session-expired");
    }, 2 * 60 * 1000);

    // Network error detection
    window.addEventListener('offline', () => setHasNetworkError(true));
    window.addEventListener('online', () => setHasNetworkError(false));

    return () => {
      clearTimeout(sessionTimeout);
      window.removeEventListener('offline', () => setHasNetworkError(true));
      window.removeEventListener('online', () => setHasNetworkError(false));
    };
  }, [setLocation]);

  if (hasNetworkError) {
    return <ErrorPage type="network" />;
  }

  if (isSessionExpired) {
    return <ErrorPage type="session" />;
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search-results" component={SearchResults} />
      <Route path="/itinerary" component={Itinerary} />
      <Route path="/payment" component={Payment} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/e-ticket" component={ETicket} />
      <Route>
        {() => <ErrorPage type="404" />}
      </Route>
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