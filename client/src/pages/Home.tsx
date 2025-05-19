import { useState } from "react";
import ChatBot from "@/components/ChatBot";
import Header from "@/components/Header";
import TripTypeSelector from "@/components/TripTypeSelector";
import FlightSearchForm from "@/components/FlightSearchForm";
import SpecialOffers from "@/components/SpecialOffers";
import BestFlightDeals from "@/components/BestFlightDeals";
import Footer from "@/components/Footer";

type TripType = "one-way" | "round-trip" | "multi-city";

export default function Home() {
  const [tripType, setTripType] = useState<TripType>("round-trip");

  const handleTripTypeChange = (newTripType: TripType) => {
    setTripType(newTripType);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-6 flex-grow">
        <h1 className="text-2xl font-medium text-sw-gray-900 mb-6">
          Instant quote request
        </h1>

        {/* Trip Type Selection */}
        <TripTypeSelector onChange={handleTripTypeChange} />

        {/* Flight Search Form */}
        <FlightSearchForm tripType={tripType} />

        {/* Special Offers Section */}
        <SpecialOffers />

        {/* Best Flight Deals Section */}
        <BestFlightDeals />
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
