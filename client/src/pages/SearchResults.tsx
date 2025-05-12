import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Clock, PlaneTakeoff, PlaneLanding, ChevronRight, ChevronDown, Luggage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/utils";

// Sample search results data
interface FlightResult {
  id: number;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  origin: string;
  destination: string;
  price: number;
  stops: number;
  flightNumber: string;
}

const sampleFlightResults: FlightResult[] = [
  {
    id: 1,
    airline: "Southwest",
    departureTime: "06:45 AM",
    arrivalTime: "09:20 AM",
    duration: "2h 35m",
    origin: "LAX",
    destination: "SFO",
    price: 149.99,
    stops: 0,
    flightNumber: "SW 1422"
  },
  {
    id: 2,
    airline: "Southwest",
    departureTime: "08:30 AM",
    arrivalTime: "11:15 AM",
    duration: "2h 45m",
    origin: "LAX",
    destination: "SFO",
    price: 129.99,
    stops: 0,
    flightNumber: "SW 2156"
  },
  {
    id: 3,
    airline: "Southwest",
    departureTime: "10:15 AM",
    arrivalTime: "01:45 PM",
    duration: "3h 30m",
    origin: "LAX",
    destination: "SFO",
    price: 109.99,
    stops: 1,
    flightNumber: "SW 994"
  },
  {
    id: 4,
    airline: "Southwest",
    departureTime: "02:30 PM",
    arrivalTime: "05:10 PM",
    duration: "2h 40m",
    origin: "LAX",
    destination: "SFO",
    price: 189.99,
    stops: 0,
    flightNumber: "SW 3316"
  },
  {
    id: 5,
    airline: "Southwest",
    departureTime: "06:20 PM",
    arrivalTime: "09:05 PM",
    duration: "2h 45m",
    origin: "LAX",
    destination: "SFO",
    price: 159.99,
    stops: 0,
    flightNumber: "SW 5827"
  }
];

export default function SearchResults() {
  const [, setLocation] = useLocation();
  const [flights, setFlights] = useState<FlightResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("price");
  
  // Simulate loading flight results
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlights(sampleFlightResults);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle back navigation
  const handleBack = () => {
    setLocation("/");
  };
  
  // Apply sorting to flight results
  const sortedFlights = [...flights].sort((a, b) => {
    if (selectedFilter === "price") return a.price - b.price;
    if (selectedFilter === "duration") {
      const aDuration = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1].split('m')[0].trim());
      const bDuration = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1].split('m')[0].trim());
      return aDuration - bDuration;
    }
    if (selectedFilter === "departure") {
      const aTime = a.departureTime.includes("PM") && !a.departureTime.includes("12:") ? 
        parseInt(a.departureTime.split(':')[0]) + 12 : 
        parseInt(a.departureTime.split(':')[0]);
      const bTime = b.departureTime.includes("PM") && !b.departureTime.includes("12:") ? 
        parseInt(b.departureTime.split(':')[0]) + 12 : 
        parseInt(b.departureTime.split(':')[0]);
      return aTime - bTime;
    }
    return 0;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            className="mr-3" 
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-medium text-sw-gray-900">Flight Search Results</h1>
        </div>
        
        {/* Search Details Summary */}
        <div className="bg-sky-50 p-4 rounded-lg mb-6">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center text-sw-gray-800 mb-2 md:mb-0">
              <div className="font-medium mr-4">Los Angeles (LAX)</div>
              <ChevronRight className="h-5 w-5 text-sw-gray-500 mr-4" />
              <div className="font-medium">San Francisco (SFO)</div>
            </div>
            <div className="text-sm text-sw-gray-600">
              Round Trip | 10 Passengers | Economy | 10 Oct - 18 Oct 2022
            </div>
          </div>
        </div>
        
        {/* Filter Options */}
        <div className="flex flex-wrap items-center mb-6 gap-3">
          <div className="text-sm font-medium text-sw-gray-700 mr-2">Sort by:</div>
          
          <Button 
            variant={selectedFilter === "price" ? "default" : "outline"} 
            className={`text-sm py-1 h-auto ${selectedFilter === "price" ? "bg-sw-blue" : ""}`}
            onClick={() => setSelectedFilter("price")}
          >
            Price
          </Button>
          
          <Button 
            variant={selectedFilter === "duration" ? "default" : "outline"} 
            className={`text-sm py-1 h-auto ${selectedFilter === "duration" ? "bg-sw-blue" : ""}`}
            onClick={() => setSelectedFilter("duration")}
          >
            Duration
          </Button>
          
          <Button 
            variant={selectedFilter === "departure" ? "default" : "outline"} 
            className={`text-sm py-1 h-auto ${selectedFilter === "departure" ? "bg-sw-blue" : ""}`}
            onClick={() => setSelectedFilter("departure")}
          >
            Departure Time
          </Button>
        </div>
        
        {/* Flight Results */}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sw-blue"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedFlights.map((flight) => (
              <Card key={flight.id} className="shadow-sm border-gray-200">
                <CardContent className="p-0">
                  <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    {/* Flight Info */}
                    <div className="col-span-1 md:col-span-2">
                      <div className="flex items-center mb-3">
                        <div className="font-bold text-sw-blue mr-2">{flight.airline}</div>
                        <div className="text-sm text-sw-gray-600">{flight.flightNumber}</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <div className="text-lg font-bold">{flight.departureTime}</div>
                          <div className="text-sm text-sw-gray-600">{flight.origin}</div>
                        </div>
                        
                        <div className="flex flex-col items-center mx-2">
                          <div className="text-xs text-sw-gray-500">{flight.duration}</div>
                          <div className="w-20 md:w-28 h-0.5 bg-sw-gray-300 my-1 relative">
                            {flight.stops > 0 && (
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-sw-gray-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="text-xs text-sw-gray-500">
                            {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop`}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-bold">{flight.arrivalTime}</div>
                          <div className="text-sm text-sw-gray-600">{flight.destination}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Additional Info */}
                    <div className="col-span-1 flex flex-col space-y-1 text-sm text-sw-gray-600">
                      <div className="flex items-center">
                        <Luggage className="h-4 w-4 mr-2" />
                        <span>Carry-on included</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Flight duration: {flight.duration}</span>
                      </div>
                    </div>
                    
                    {/* Price & Book */}
                    <div className="col-span-1 text-right">
                      <div className="text-2xl font-bold text-sw-blue mb-2">
                        {formatPrice(flight.price)}
                      </div>
                      <div className="text-xs text-sw-gray-500 mb-3">per person</div>
                      <Button className="bg-sw-yellow text-sw-gray-800 hover:bg-yellow-500 transition-colors">
                        Select
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 p-3 flex justify-between items-center bg-gray-50 text-sm">
                    <span className="text-sw-gray-600">Flight operated by Southwest Airlines</span>
                    <Button variant="ghost" size="sm" className="text-sw-blue flex items-center">
                      Flight Details
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}