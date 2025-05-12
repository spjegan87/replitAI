import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { 
  ArrowLeft, 
  Clock, 
  PlaneTakeoff, 
  PlaneLanding, 
  ChevronRight, 
  ChevronDown, 
  Luggage, 
  Wifi, 
  BatteryMedium,
  Coffee,
  ScreenShare,
  Filter,
  Sliders
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/utils";
import { FlightResult, flightResults, filterFlights } from "@/data/flights";

export default function SearchResults() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  
  // Parse search parameters
  const origin = searchParams.get("origin") || "LAX";
  const destination = searchParams.get("destination") || "SFO";
  const departureDate = searchParams.get("departureDate") || "10 Oct 2022";
  const returnDate = searchParams.get("returnDate") || "18 Oct 2022";
  const tripType = searchParams.get("tripType") || "round-trip";
  const cabin = searchParams.get("cabin") || "economy";
  const passengers = searchParams.get("passengers") || "10";
  const adultCount = parseInt(searchParams.get("adultCount") || "8");
  const childCount = parseInt(searchParams.get("childCount") || "2");
  const infantCount = parseInt(searchParams.get("infantCount") || "0");
  
  // Filter and sorting states
  const [flights, setFlights] = useState<FlightResult[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<FlightResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("price");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter options
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [maxStops, setMaxStops] = useState<number>(2);
  const [flightType, setFlightType] = useState<'all' | 'domestic' | 'international'>('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 5;
  
  // Load flights data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Extract origin and destination codes from the formatted strings
      const originCode = origin.match(/\(([^)]+)\)/) ? origin.match(/\(([^)]+)\)/)![1] : origin;
      const destinationCode = destination.match(/\(([^)]+)\)/) ? destination.match(/\(([^)]+)\)/)![1] : destination;
      
      // Filter flights based on origin and destination
      const matchedFlights = filterFlights({
        origin: originCode,
        destination: destinationCode
      });
      
      // If no exact matches, show all flights
      const flightsToShow = matchedFlights.length > 0 ? matchedFlights : flightResults;
      
      setFlights(flightsToShow);
      setFilteredFlights(flightsToShow);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [origin, destination]);
  
  // Apply filters when filter options change
  useEffect(() => {
    if (flights.length === 0) return;
    
    const filtered = flights.filter(flight => {
      // Filter by max price
      if (flight.price > maxPrice) return false;
      
      // Filter by max stops
      if (flight.stops > maxStops) return false;
      
      // Filter by flight type
      if (flightType !== 'all' && flight.type !== flightType) return false;
      
      // Filter by amenities
      if (selectedAmenities.length > 0) {
        const hasAllSelectedAmenities = selectedAmenities.every(amenity => 
          flight.amenities.includes(amenity)
        );
        if (!hasAllSelectedAmenities) return false;
      }
      
      return true;
    });
    
    // Sort flights based on the selected filter
    const sorted = [...filtered].sort((a, b) => {
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
    
    setFilteredFlights(sorted);
    setCurrentPage(1); // Reset to first page when filters change
  }, [flights, maxPrice, maxStops, flightType, selectedAmenities, selectedFilter]);
  
  // Get current flights for pagination
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);
  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);
  
  // Toggle amenity selection
  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
  
  // Handle back navigation
  const handleBack = () => {
    setLocation("/");
  };
  
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
              <div className="font-medium mr-4">{origin}</div>
              <ChevronRight className="h-5 w-5 text-sw-gray-500 mr-4" />
              <div className="font-medium">{destination}</div>
            </div>
            <div className="text-sm text-sw-gray-600">
              {tripType === 'one-way' ? 'One Way' : tripType === 'round-trip' ? 'Round Trip' : 'Multi-City'} | 
              {' '}{passengers} Passengers | {cabin.charAt(0).toUpperCase() + cabin.slice(1)} | 
              {' '}{departureDate}{returnDate ? ` - ${returnDate}` : ''}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Filter sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium text-sw-gray-800 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Results
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-sw-blue"
                  onClick={() => {
                    setMaxPrice(1500);
                    setMaxStops(2);
                    setFlightType('all');
                    setSelectedAmenities([]);
                  }}
                >
                  Reset All
                </Button>
              </div>
              
              <div className="space-y-4">
                {/* Price Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Price Range (up to {formatPrice(maxPrice)})
                  </Label>
                  <Slider
                    defaultValue={[maxPrice]}
                    max={1500}
                    step={50}
                    onValueChange={(values) => setMaxPrice(values[0])}
                    className="mb-2"
                  />
                </div>
                
                <Separator />
                
                {/* Stops Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Stops
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="nonstop" 
                        checked={maxStops === 0}
                        onCheckedChange={() => setMaxStops(0)}
                      />
                      <Label htmlFor="nonstop" className="text-sm">Nonstop only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="max1stop" 
                        checked={maxStops === 1}
                        onCheckedChange={() => setMaxStops(1)}
                      />
                      <Label htmlFor="max1stop" className="text-sm">Max 1 stop</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="max2stops" 
                        checked={maxStops === 2}
                        onCheckedChange={() => setMaxStops(2)}
                      />
                      <Label htmlFor="max2stops" className="text-sm">Max 2 stops</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Flight Type Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Flight Type
                  </Label>
                  <Select value={flightType} onValueChange={(value: 'all' | 'domestic' | 'international') => setFlightType(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Flights" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Flights</SelectItem>
                      <SelectItem value="domestic">Domestic Only</SelectItem>
                      <SelectItem value="international">International Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                {/* Amenities Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Amenities
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="wifi" 
                        checked={selectedAmenities.includes("Wi-Fi")}
                        onCheckedChange={() => toggleAmenity("Wi-Fi")}
                      />
                      <Label htmlFor="wifi" className="text-sm flex items-center">
                        <Wifi className="h-3 w-3 mr-2" />
                        Wi-Fi
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="power" 
                        checked={selectedAmenities.includes("Power outlets")}
                        onCheckedChange={() => toggleAmenity("Power outlets")}
                      />
                      <Label htmlFor="power" className="text-sm flex items-center">
                        <BatteryMedium className="h-3 w-3 mr-2" />
                        Power outlets
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="meal" 
                        checked={selectedAmenities.includes("Meal service")}
                        onCheckedChange={() => toggleAmenity("Meal service")}
                      />
                      <Label htmlFor="meal" className="text-sm flex items-center">
                        <Coffee className="h-3 w-3 mr-2" />
                        Meal service
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="entertainment" 
                        checked={selectedAmenities.includes("Entertainment")}
                        onCheckedChange={() => toggleAmenity("Entertainment")}
                      />
                      <Label htmlFor="entertainment" className="text-sm flex items-center">
                        <ScreenShare className="h-3 w-3 mr-2" />
                        Entertainment
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <div className="text-sm text-sw-gray-500">Found {filteredFlights.length} flights</div>
              </div>
            </div>
          </div>
          
          {/* Flight Results */}
          <div className="md:col-span-3">
            {/* Sort Options */}
            <div className="flex flex-wrap items-center mb-4 gap-3 bg-white p-3 rounded-lg border">
              <div className="text-sm font-medium text-sw-gray-700 mr-2 flex items-center">
                <Sliders className="h-4 w-4 mr-2" />
                Sort by:
              </div>
              
              <Button 
                variant={selectedFilter === "price" ? "default" : "outline"} 
                size="sm"
                className={`text-sm ${selectedFilter === "price" ? "bg-sw-blue" : ""}`}
                onClick={() => setSelectedFilter("price")}
              >
                Price
              </Button>
              
              <Button 
                variant={selectedFilter === "duration" ? "default" : "outline"} 
                size="sm"
                className={`text-sm ${selectedFilter === "duration" ? "bg-sw-blue" : ""}`}
                onClick={() => setSelectedFilter("duration")}
              >
                Duration
              </Button>
              
              <Button 
                variant={selectedFilter === "departure" ? "default" : "outline"} 
                size="sm"
                className={`text-sm ${selectedFilter === "departure" ? "bg-sw-blue" : ""}`}
                onClick={() => setSelectedFilter("departure")}
              >
                Departure Time
              </Button>
              
              <div className="ml-auto text-sm text-sw-gray-600">
                {indexOfFirstFlight + 1}-{Math.min(indexOfLastFlight, filteredFlights.length)} of {filteredFlights.length} flights
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-10 bg-white rounded-lg border">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sw-blue"></div>
              </div>
            ) : filteredFlights.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg border">
                <div className="text-lg font-medium text-sw-gray-800 mb-2">No flights found</div>
                <div className="text-sm text-sw-gray-600">Try adjusting your filters to see more results</div>
              </div>
            ) : (
              <div className="space-y-4">
                {currentFlights.map((flight) => (
                  <Card key={flight.id} className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        {/* Left badge for flight type */}
                        <div className="absolute -left-1 top-6">
                          <Badge className={`${flight.type === 'domestic' ? 'bg-green-500' : 'bg-blue-500'} text-white rounded-l-none`}>
                            {flight.type === 'domestic' ? 'Domestic' : 'International'}
                          </Badge>
                        </div>
                        
                        {/* Flight Info */}
                        <div className="col-span-1 md:col-span-2">
                          <div className="flex items-center mb-3">
                            <div className="font-bold text-sw-blue mr-2">{flight.airline}</div>
                            <div className="text-sm text-sw-gray-600">{flight.flightNumber}</div>
                            <div className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded text-sw-gray-700">
                              {flight.aircraft}
                            </div>
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
                            <Luggage className="h-4 w-4 mr-2 text-sw-gray-400" />
                            <span>Carry-on included</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-sw-gray-400" />
                            <span>Flight duration: {flight.duration}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {flight.amenities.map((amenity, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Price & Book */}
                        <div className="col-span-1 text-right">
                          <div className="text-2xl font-bold text-sw-blue mb-2">
                            {formatPrice(flight.price)}
                          </div>
                          <div className="text-xs text-sw-gray-500 mb-3">per person</div>
                          <Button 
                            className="bg-sw-yellow text-sw-gray-800 hover:bg-yellow-500 transition-colors"
                            onClick={() => {
                              // Pass flight details to itinerary page
                              const params = new URLSearchParams(search);
                              params.set("flightNumber", flight.flightNumber);
                              params.set("departureTime", flight.departureTime);
                              params.set("arrivalTime", flight.arrivalTime);
                              params.set("duration", flight.duration);
                              params.set("price", flight.price.toString());
                              params.set("aircraft", flight.aircraft);
                              setLocation(`/itinerary?${params.toString()}`);
                            }}
                          >
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
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-6">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      {Array.from({ length: totalPages }).map((_, idx) => (
                        <Button 
                          key={idx}
                          variant={currentPage === idx + 1 ? "default" : "outline"} 
                          size="sm"
                          className={currentPage === idx + 1 ? "bg-sw-blue" : ""}
                          onClick={() => setCurrentPage(idx + 1)}
                        >
                          {idx + 1}
                        </Button>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="text-center mt-6 text-sm text-sw-gray-500">
                  Group bookings may qualify for special rates and services. Contact the Southwest Group Desk at 1-800-433-5368 for more information.
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}