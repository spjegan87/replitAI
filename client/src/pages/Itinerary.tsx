import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { 
  ArrowLeft, ChevronRight, Calendar, Users, Clock, PlaneTakeoff, 
  PlaneLanding, Check, AlertCircle, CalendarDays, UserCircle, 
  Baby, Mail, Phone, Info 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function Itinerary() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  
  // Parse search parameters
  const origin = searchParams.get("origin") || "LAX";
  const destination = searchParams.get("destination") || "SFO";
  const departureDate = searchParams.get("departureDate") || "10 Oct 2022";
  const returnDate = searchParams.get("returnDate") || "18 Oct 2022";
  const flightNumber = searchParams.get("flightNumber") || "SW 1422";
  const departureTime = searchParams.get("departureTime") || "06:45 AM";
  const arrivalTime = searchParams.get("arrivalTime") || "09:20 AM";
  const duration = searchParams.get("duration") || "2h 35m";
  const price = parseFloat(searchParams.get("price") || "149.99");
  const passengers = parseInt(searchParams.get("passengers") || "10");
  const adultCount = parseInt(searchParams.get("adultCount") || "8");
  const childCount = parseInt(searchParams.get("childCount") || "2");
  const infantCount = parseInt(searchParams.get("infantCount") || "0");
  const cabin = searchParams.get("cabin") || "economy";
  const aircraft = searchParams.get("aircraft") || "Boeing 737-800";

  // Handle back navigation
  const handleBack = () => {
    // Navigate back to search results page with the same parameters
    const searchParamsStr = search.substring(1); // Remove the leading '?'
    setLocation(`/search-results?${searchParamsStr}`);
  };
  
  // Passenger details state
  const [passengerDetails, setPassengerDetails] = useState<Array<{
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    dob: string;
    type: 'adult' | 'child' | 'infant';
  }>>([]);
  
  // Generate initial passenger forms based on passenger counts
  useEffect(() => {
    const initialPassengers = [];
    
    // Create adult passengers
    for (let i = 0; i < adultCount; i++) {
      initialPassengers.push({
        firstName: '',
        lastName: '',
        email: i === 0 ? '' : undefined, // Only require email for primary passenger
        phone: i === 0 ? '' : undefined, // Only require phone for primary passenger
        dob: '',
        type: 'adult' as const
      });
    }
    
    // Create child passengers
    for (let i = 0; i < childCount; i++) {
      initialPassengers.push({
        firstName: '',
        lastName: '',
        email: undefined,
        phone: undefined,
        dob: '',
        type: 'child' as const
      });
    }
    
    // Create infant passengers
    for (let i = 0; i < infantCount; i++) {
      initialPassengers.push({
        firstName: '',
        lastName: '',
        email: undefined,
        phone: undefined,
        dob: '',
        type: 'infant' as const
      });
    }
    
    setPassengerDetails(initialPassengers);
  }, [adultCount, childCount, infantCount]);
  
  // Update passenger details
  const updatePassenger = (index: number, field: string, value: string) => {
    const updated = [...passengerDetails];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setPassengerDetails(updated);
  };
  
  // Check if all required fields are filled
  const isFormValid = () => {
    return passengerDetails.every((passenger, index) => {
      // For every passenger, first and last name and DOB are required
      if (!passenger.firstName || !passenger.lastName || !passenger.dob) return false;
      
      // For primary passenger (first adult), email and phone are also required
      if (index === 0 && passenger.type === 'adult') {
        return Boolean(passenger.email && passenger.phone);
      }
      
      return true;
    });
  };
  
  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (!isFormValid()) {
      alert("Please fill in all required passenger information.");
      return;
    }
    
    // Add additional parameters for payment page
    const paymentParams = new URLSearchParams(search);
    paymentParams.set("totalPrice", (price * passengers).toString());
    
    // Add passenger details as JSON string
    paymentParams.set("passengerDetails", JSON.stringify(passengerDetails));
    
    setLocation(`/payment?${paymentParams.toString()}`);
  };
  
  // Calculate total price
  const totalPrice = price * passengers;
  
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
            Back to Search
          </Button>
          <h1 className="text-2xl font-medium text-sw-gray-900">Trip Itinerary</h1>
        </div>
        
        {/* Itinerary Summary */}
        <div className="bg-sky-50 p-4 rounded-lg mb-6">
          <div className="flex flex-wrap items-center">
            <div className="flex items-center text-sw-gray-800 mb-2 md:mb-0 mr-6">
              <div className="font-medium mr-2">{origin}</div>
              <ChevronRight className="h-5 w-5 text-sw-gray-500 mr-2" />
              <div className="font-medium">{destination}</div>
            </div>
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 text-sw-gray-500 mr-1" />
              <span className="text-sm text-sw-gray-600">{departureDate}{returnDate ? ` - ${returnDate}` : ''}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-sw-gray-500 mr-1" />
              <span className="text-sm text-sw-gray-600">
                {passengers} Passengers ({adultCount} Adult{adultCount !== 1 ? 's' : ''}, 
                {childCount > 0 ? ` ${childCount} Child${childCount !== 1 ? 'ren' : ''}` : ''}
                {infantCount > 0 ? `, ${infantCount} Infant${infantCount !== 1 ? 's' : ''}` : ''})
              </span>
            </div>
          </div>
        </div>
        
        {/* Flight Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Outbound Flight */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-sw-gray-800">Outbound Flight</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">Confirmed</Badge>
                  </div>
                  <div className="text-sm text-sw-gray-600">
                    {departureDate} · Southwest Airlines · {flightNumber}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-center">
                      <div className="text-xl font-bold">{departureTime}</div>
                      <div className="text-sm text-sw-gray-600">{departureDate}</div>
                      <div className="text-sm font-medium">{origin}</div>
                    </div>
                    
                    <div className="flex flex-col items-center mx-4 pt-2">
                      <div className="text-xs text-sw-gray-500">{duration}</div>
                      <div className="w-20 md:w-28 h-0.5 bg-sw-gray-300 my-1 relative"></div>
                      <div className="text-xs text-sw-gray-500">Nonstop</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xl font-bold">{arrivalTime}</div>
                      <div className="text-sm text-sw-gray-600">{departureDate}</div>
                      <div className="text-sm font-medium">{destination}</div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <PlaneTakeoff className="h-5 w-5 text-sw-gray-500 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium text-sw-gray-800">Departure</div>
                        <div className="text-sm text-sw-gray-600">Terminal 1, Gate A12</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <PlaneLanding className="h-5 w-5 text-sw-gray-500 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium text-sw-gray-800">Arrival</div>
                        <div className="text-sm text-sw-gray-600">Terminal B, Gate 22</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-sw-gray-500 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium text-sw-gray-800">Flight Duration</div>
                        <div className="text-sm text-sw-gray-600">{duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Return flight would go here if round trip */}
            {returnDate && (
              <Card className="mt-6">
                <CardContent className="p-0">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-sw-gray-800">Return Flight</h3>
                      <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">Confirmed</Badge>
                    </div>
                    <div className="text-sm text-sw-gray-600">
                      {returnDate} · Southwest Airlines · {flightNumber}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-center">
                        <div className="text-xl font-bold">{departureTime}</div>
                        <div className="text-sm text-sw-gray-600">{returnDate}</div>
                        <div className="text-sm font-medium">{destination}</div>
                      </div>
                      
                      <div className="flex flex-col items-center mx-4 pt-2">
                        <div className="text-xs text-sw-gray-500">{duration}</div>
                        <div className="w-20 md:w-28 h-0.5 bg-sw-gray-300 my-1 relative"></div>
                        <div className="text-xs text-sw-gray-500">Nonstop</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-xl font-bold">{arrivalTime}</div>
                        <div className="text-sm text-sw-gray-600">{returnDate}</div>
                        <div className="text-sm font-medium">{origin}</div>
                      </div>
                    </div>
                    
                    {/* Return flight details would mirror outbound */}
                    <Separator className="my-4" />
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <PlaneTakeoff className="h-5 w-5 text-sw-gray-500 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-sw-gray-800">Departure</div>
                          <div className="text-sm text-sw-gray-600">Terminal B, Gate 15</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <PlaneLanding className="h-5 w-5 text-sw-gray-500 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-sw-gray-800">Arrival</div>
                          <div className="text-sm text-sw-gray-600">Terminal 1, Gate B8</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-sw-gray-500 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-sw-gray-800">Flight Duration</div>
                          <div className="text-sm text-sw-gray-600">{duration}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Price Summary */}
          <div>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-sw-gray-800 mb-4">Price Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-sw-gray-600">Base fare ({cabin})</span>
                    <span>{formatPrice(price)} × {passengers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-sw-gray-600">Taxes & fees</span>
                    <span>Included</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold mb-6">
                  <span>Total</span>
                  <span className="text-lg">{formatPrice(totalPrice)}</span>
                </div>
                
                <Button 
                  className="w-full bg-sw-yellow text-sw-gray-800 hover:bg-yellow-500 transition-colors"
                  onClick={handleProceedToPayment}
                >
                  Proceed to Payment
                </Button>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-start text-xs text-sw-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Free date changes up to 24 hours before departure</span>
                  </div>
                  <div className="flex items-start text-xs text-sw-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Two checked bags included for each passenger</span>
                  </div>
                  <div className="flex items-start text-xs text-sw-gray-600">
                    <AlertCircle className="h-4 w-4 text-sw-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span>Group bookings require full payment at time of booking</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 text-center">
              <span className="text-xs text-sw-gray-500">Have questions about your booking?</span>
              <div className="text-sm font-medium text-sw-blue mt-1">Call 1-800-435-9792</div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}