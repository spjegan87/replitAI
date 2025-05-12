import { useLocation } from "wouter";
import { Check, Calendar, Printer, User, Mail, Users, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Confirmation() {
  const [, setLocation] = useLocation();
  
  // In a real app, we would fetch this data from the server
  const bookingDetails = {
    bookingNumber: "SW" + Math.floor(Math.random() * 100000000).toString().padStart(8, '0'),
    departureDate: "10 Oct 2022",
    returnDate: "18 Oct 2022",
    origin: "LAX",
    destination: "SFO",
    flightNumbers: ["SW 1422", "SW 3316"],
    passengers: 10,
    totalPrice: "$1,499.90",
    contactName: "John Doe",
    contactEmail: "john.doe@example.com",
    contactPhone: "(555) 123-4567"
  };
  
  // Go to homepage
  const handleGoHome = () => {
    setLocation("/");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="bg-green-50 rounded-lg p-6 mb-6 text-center">
            <div className="inline-flex items-center justify-center bg-green-100 rounded-full w-16 h-16 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-sw-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-sm text-sw-gray-600 mb-4">
              Your group booking has been successfully confirmed. Your confirmation number is:
            </p>
            <div className="text-xl font-bold text-sw-blue mb-4">
              {bookingDetails.bookingNumber}
            </div>
            <p className="text-sm text-sw-gray-600">
              A confirmation email has been sent to {bookingDetails.contactEmail}
            </p>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-sw-gray-800">Trip Details</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-sm"
                  onClick={() => window.print()}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-sw-blue mr-2" />
                    <h3 className="font-semibold text-sw-gray-800">Outbound Flight</h3>
                  </div>
                  <div className="text-sm space-y-1 text-sw-gray-600 mb-4">
                    <div>Date: {bookingDetails.departureDate}</div>
                    <div>Flight: {bookingDetails.flightNumbers[0]}</div>
                    <div className="font-medium">{bookingDetails.origin} to {bookingDetails.destination}</div>
                  </div>
                  
                  {bookingDetails.returnDate && (
                    <>
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 text-sw-blue mr-2" />
                        <h3 className="font-semibold text-sw-gray-800">Return Flight</h3>
                      </div>
                      <div className="text-sm space-y-1 text-sw-gray-600">
                        <div>Date: {bookingDetails.returnDate}</div>
                        <div>Flight: {bookingDetails.flightNumbers[1]}</div>
                        <div className="font-medium">{bookingDetails.destination} to {bookingDetails.origin}</div>
                      </div>
                    </>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-sw-blue mr-2" />
                    <h3 className="font-semibold text-sw-gray-800">Group Information</h3>
                  </div>
                  <div className="text-sm space-y-1 text-sw-gray-600 mb-4">
                    <div>Total Passengers: {bookingDetails.passengers}</div>
                    <div>Group Type: Adhoc</div>
                    <div>Total Price: {bookingDetails.totalPrice}</div>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <User className="h-5 w-5 text-sw-blue mr-2" />
                    <h3 className="font-semibold text-sw-gray-800">Contact Information</h3>
                  </div>
                  <div className="text-sm space-y-1 text-sw-gray-600">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-sw-gray-400 mr-2" />
                      {bookingDetails.contactName}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-sw-gray-400 mr-2" />
                      {bookingDetails.contactEmail}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-sw-gray-400 mr-2" />
                      {bookingDetails.contactPhone}
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="text-sm text-sw-gray-600 bg-sky-50 p-4 rounded-md">
                <div className="font-medium text-sw-gray-800 mb-2">Important Information:</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Please arrive at the airport at least 2 hours before your scheduled departure.</li>
                  <li>Each passenger is allowed to bring 2 checked bags and 1 carry-on item.</li>
                  <li>Group boarding will begin 30 minutes before the scheduled departure time.</li>
                  <li>For any changes to your booking, please contact our Group Desk at 1-800-435-9792.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <Button 
              className="bg-sw-yellow text-sw-gray-800 hover:bg-yellow-500 transition-colors"
              onClick={handleGoHome}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}