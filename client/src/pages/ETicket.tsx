import { useEffect, useRef, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { 
  ArrowLeft, 
  Printer, 
  CalendarClock, 
  Plane, 
  MapPin, 
  Clock, 
  Info, 
  Luggage, 
  QrCode, 
  Download,
  UserCircle,
  Users,
  Baby,
  Mail,
  Phone,
  Calendar,
  CalendarDays,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/utils";

export default function ETicket() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const ticketRef = useRef<HTMLDivElement>(null);
  
  // Parse search parameters
  const bookingNumber = searchParams.get("bookingNumber") || "SW" + Math.floor(Math.random() * 10000000).toString().padStart(8, '0');
  const origin = searchParams.get("origin") || "LAX";
  const destination = searchParams.get("destination") || "SFO";
  const departureDate = searchParams.get("departureDate") || "10 Oct 2022";
  const returnDate = searchParams.get("returnDate") || "18 Oct 2022";
  const departureTime = searchParams.get("departureTime") || "06:45 AM";
  const arrivalTime = searchParams.get("arrivalTime") || "09:20 AM";
  const flightNumber = searchParams.get("flightNumber") || "SW 1422";
  const passengers = parseInt(searchParams.get("passengers") || "10");
  const adultCount = parseInt(searchParams.get("adultCount") || "8");
  const childCount = parseInt(searchParams.get("childCount") || "2");
  const infantCount = parseInt(searchParams.get("infantCount") || "0");
  const cabin = searchParams.get("cabin") || "economy";
  const duration = searchParams.get("duration") || "2h 35m";
  const aircraft = searchParams.get("aircraft") || "Boeing 737-800";
  
  // Parse passenger details
  const [passengerDetails, setPassengerDetails] = useState<Array<{
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    dob: string;
    type: 'adult' | 'child' | 'infant';
  }>>([]);
  
  // Parse passenger details from URL
  useEffect(() => {
    const passengerDetailsParam = searchParams.get("passengerDetails");
    if (passengerDetailsParam) {
      try {
        const parsedDetails = JSON.parse(passengerDetailsParam);
        setPassengerDetails(parsedDetails);
      } catch (err) {
        console.error("Error parsing passenger details:", err);
        // If parsing fails, create sample passengers
        createSamplePassengers();
      }
    } else {
      // If no passenger details, create sample ones
      createSamplePassengers();
    }
  }, []);
  
  // Create sample passengers if no details provided
  const createSamplePassengers = () => {
    const samplePassengers = [];
    
    // Add sample adults
    for (let i = 0; i < adultCount; i++) {
      samplePassengers.push({
        firstName: i === 0 ? "John" : `Adult ${i+1}`,
        lastName: i === 0 ? "Doe" : "Passenger",
        email: i === 0 ? "john.doe@example.com" : undefined,
        phone: i === 0 ? "555-123-4567" : undefined,
        dob: "1985-01-01",
        type: 'adult' as const,
      });
    }
    
    // Add sample children
    for (let i = 0; i < childCount; i++) {
      samplePassengers.push({
        firstName: `Child ${i+1}`,
        lastName: "Passenger",
        dob: "2015-05-15",
        type: 'child' as const,
      });
    }
    
    // Add sample infants
    for (let i = 0; i < infantCount; i++) {
      samplePassengers.push({
        firstName: `Infant ${i+1}`,
        lastName: "Passenger",
        dob: "2021-10-10",
        type: 'infant' as const,
      });
    }
    
    setPassengerDetails(samplePassengers);
  };
  
  // Handle back to confirmation
  const handleBack = () => {
    setLocation(`/confirmation?${search}`);
  };
  
  // Handle printing ticket
  const handlePrint = () => {
    const printContent = ticketRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;
    
    if (printContent) {
      document.body.innerHTML = `
        <style>
          @page { size: auto; margin: 10mm; }
          body { font-family: 'Inter', sans-serif; }
          .ticket-container { max-width: 800px; margin: 0 auto; }
        </style>
        <div class="ticket-container">${printContent}</div>
      `;
      
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };
  
  // Handle download as PDF
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF file
    alert("In a production environment, this would download a PDF of your e-ticket.");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Button 
              variant="outline" 
              className="mr-3" 
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-medium text-sw-gray-900">E-Ticket</h1>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
        
        <div ref={ticketRef}>
          {/* Ticket Header */}
          <div className="flex items-center justify-between bg-sw-blue text-white p-4 rounded-t-lg">
            <div className="flex items-center">
              <div className="font-bold text-xl mr-2">Southwest Airlines</div>
              <div className="text-sm">E-Ticket Receipt</div>
            </div>
            <div className="text-right">
              <div className="text-sm">Booking Reference:</div>
              <div className="font-bold">{bookingNumber}</div>
            </div>
          </div>
          
          {/* Main Ticket Content */}
          <Card className="rounded-t-none mb-6">
            <CardContent className="p-6">
              {/* Flight Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="font-bold text-sw-gray-800 mb-3 flex items-center">
                    <Plane className="h-5 w-5 mr-2 text-sw-blue" />
                    Flight Details
                  </h2>
                  
                  <div className="bg-gray-50 p-4 rounded-md space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-sw-gray-500">Outbound</div>
                        <div className="font-bold text-sw-gray-800">{departureDate}</div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
                        Confirmed
                      </Badge>
                    </div>
                    
                    <div className="flex items-start justify-between">
                      <div className="text-center">
                        <div className="text-xl font-bold">{departureTime}</div>
                        <div className="text-sm">{origin}</div>
                      </div>
                      
                      <div className="flex-1 px-4 pt-2">
                        <div className="h-0.5 bg-sw-gray-300 relative">
                          <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-sw-blue"></div>
                          <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-sw-blue"></div>
                        </div>
                        <div className="text-center text-xs text-sw-gray-500 mt-1">{flightNumber}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-xl font-bold">{arrivalTime}</div>
                        <div className="text-sm">{destination}</div>
                      </div>
                    </div>
                    
                    {returnDate && (
                      <>
                        <Separator />
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs text-sw-gray-500">Return</div>
                            <div className="font-bold text-sw-gray-800">{returnDate}</div>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
                            Confirmed
                          </Badge>
                        </div>
                        
                        <div className="flex items-start justify-between">
                          <div className="text-center">
                            <div className="text-xl font-bold">{departureTime}</div>
                            <div className="text-sm">{destination}</div>
                          </div>
                          
                          <div className="flex-1 px-4 pt-2">
                            <div className="h-0.5 bg-sw-gray-300 relative">
                              <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-sw-blue"></div>
                              <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-sw-blue"></div>
                            </div>
                            <div className="text-center text-xs text-sw-gray-500 mt-1">{flightNumber}</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-xl font-bold">{arrivalTime}</div>
                            <div className="text-sm">{origin}</div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h2 className="font-bold text-sw-gray-800 mb-3 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-sw-blue" />
                    Passenger & Ticket Information
                  </h2>
                  
                  <div className="bg-gray-50 p-4 rounded-md space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-sw-gray-500">Group Size</div>
                        <div className="font-bold text-sw-gray-800">{passengers} Passengers</div>
                        <div className="text-xs text-sw-gray-600">
                          {adultCount} Adult{adultCount !== 1 ? 's' : ''}, 
                          {childCount > 0 ? ` ${childCount} Child${childCount !== 1 ? 'ren' : ''}` : ''}
                          {infantCount > 0 ? `, ${infantCount} Infant${infantCount !== 1 ? 's' : ''}` : ''}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-sw-gray-500">Class</div>
                        <div className="font-bold text-sw-gray-800">{cabin.charAt(0).toUpperCase() + cabin.slice(1)}</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="text-xs text-sw-gray-500">Booking Date</div>
                      <div className="font-bold text-sw-gray-800">{new Date().toLocaleDateString()}</div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3 text-sw-gray-800 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-sw-blue" />
                        Passenger Information
                      </h3>
                      <div className="space-y-4">
                        <Tabs defaultValue="passenger-1" className="w-full">
                          <TabsList className="mb-4 flex flex-wrap overflow-x-auto">
                            {passengerDetails.map((passenger, index) => (
                              <TabsTrigger 
                                key={index} 
                                value={`passenger-${index + 1}`}
                                className="flex items-center"
                              >
                                {passenger.type === 'adult' ? (
                                  <UserCircle className="h-4 w-4 mr-1" />
                                ) : passenger.type === 'child' ? (
                                  <Users className="h-4 w-4 mr-1" />
                                ) : (
                                  <Baby className="h-4 w-4 mr-1" />
                                )}
                                {passenger.firstName} {passenger.lastName}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                          
                          {passengerDetails.map((passenger, index) => (
                            <TabsContent key={index} value={`passenger-${index + 1}`} className="mt-2">
                              <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-md border border-sky-100">
                                <div className="col-span-2 border-b border-sky-100 pb-2 mb-2">
                                  <Badge className={`mr-2 ${
                                    passenger.type === 'adult' ? 'bg-blue-100 text-blue-800' : 
                                    passenger.type === 'child' ? 'bg-green-100 text-green-800' : 
                                    'bg-purple-100 text-purple-800'
                                  }`}>
                                    {passenger.type.charAt(0).toUpperCase() + passenger.type.slice(1)} Passenger
                                  </Badge>
                                  {index === 0 && passenger.type === 'adult' && (
                                    <span className="text-xs text-sw-blue ml-2">Primary Contact</span>
                                  )}
                                </div>
                                
                                <div>
                                  <div className="text-xs text-sw-gray-500">Full Name</div>
                                  <div className="font-bold text-sw-gray-800 flex items-center">
                                    <UserCircle className="h-4 w-4 mr-1 text-sw-gray-400" />
                                    {passenger.firstName} {passenger.lastName}
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="text-xs text-sw-gray-500">Seat Assignment</div>
                                  <div className="font-bold text-sw-gray-800">
                                    {String.fromCharCode(65 + Math.floor(Math.random() * 6))}{Math.floor(Math.random() * 30) + 1}
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="text-xs text-sw-gray-500">Date of Birth</div>
                                  <div className="font-bold text-sw-gray-800 flex items-center">
                                    <CalendarDays className="h-4 w-4 mr-1 text-sw-gray-400" />
                                    {passenger.dob}
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="text-xs text-sw-gray-500">Frequent Flyer</div>
                                  <div className="font-bold text-sw-gray-800">--</div>
                                </div>
                                
                                {passenger.email && (
                                  <div>
                                    <div className="text-xs text-sw-gray-500">Email</div>
                                    <div className="font-bold text-sw-gray-800 flex items-center">
                                      <Mail className="h-4 w-4 mr-1 text-sw-gray-400" />
                                      {passenger.email}
                                    </div>
                                  </div>
                                )}
                                
                                {passenger.phone && (
                                  <div>
                                    <div className="text-xs text-sw-gray-500">Phone</div>
                                    <div className="font-bold text-sw-gray-800 flex items-center">
                                      <Phone className="h-4 w-4 mr-1 text-sw-gray-400" />
                                      {passenger.phone}
                                    </div>
                                  </div>
                                )}
                                
                                <div className="col-span-2 mt-2 text-xs text-sw-gray-500 bg-gray-50 p-2 rounded">
                                  <div className="flex items-start">
                                    <Check className="h-4 w-4 mr-1 text-green-500 shrink-0" />
                                    <div>
                                      Two checked bags included for this passenger
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-center mt-4">
                      <div className="flex flex-col items-center text-center">
                        <QrCode className="h-24 w-24 text-sw-gray-800 mb-2" />
                        <div className="text-xs text-sw-gray-600">Boarding QR Code</div>
                        <div className="text-xs text-sw-gray-800 font-medium mt-1">{bookingNumber}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Important Information */}
              <div>
                <h2 className="font-bold text-sw-gray-800 mb-3 flex items-center">
                  <Luggage className="h-5 w-5 mr-2 text-sw-blue" />
                  Baggage Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <div className="font-medium">Carry-on Baggage</div>
                    <div className="text-sm text-sw-gray-600">1 bag per passenger</div>
                    <div className="text-xs text-sw-gray-500">Max. 10 kg (22 lbs)</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <div className="font-medium">Checked Baggage</div>
                    <div className="text-sm text-sw-gray-600">2 bags per passenger</div>
                    <div className="text-xs text-sw-gray-500">Max. 23 kg (50 lbs) each</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <div className="font-medium">Group Equipment</div>
                    <div className="text-sm text-sw-gray-600">Special arrangements</div>
                    <div className="text-xs text-sw-gray-500">Contact Group Desk</div>
                  </div>
                </div>
                
                <div className="bg-sky-50 p-4 rounded-md mb-4">
                  <h3 className="font-medium text-sw-gray-800 mb-2">Check-in Information</h3>
                  <ul className="text-sm text-sw-gray-600 space-y-1">
                    <li>• Check-in opens 24 hours before departure.</li>
                    <li>• Group check-in is available at the Southwest Group Check-in counter.</li>
                    <li>• Please arrive at the airport at least 2 hours before your scheduled departure.</li>
                    <li>• Have this e-ticket and valid ID ready for all passengers.</li>
                  </ul>
                </div>
                
                <div className="text-xs text-sw-gray-500 italic">
                  This document serves as an official e-ticket for your Southwest Airlines flight. 
                  For inquiries regarding your group booking, please contact the Southwest Group Desk 
                  at 1-800-435-9792 or send an email to groupdesk@southwest.com.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}