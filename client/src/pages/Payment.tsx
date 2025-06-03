import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { ArrowLeft, CreditCard, Lock, Users, Calendar, ShieldCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Payment() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const { toast } = useToast();
  
  // Parse search parameters
  const origin = searchParams.get("origin") || "LAX";
  const destination = searchParams.get("destination") || "SFO";
  const departureDate = searchParams.get("departureDate") || "10 Oct 2022";
  const returnDate = searchParams.get("returnDate") || "18 Oct 2022";
  const flightNumber = searchParams.get("flightNumber") || "SW 1422";
  const totalPrice = parseFloat(searchParams.get("totalPrice") || "1499.90");
  const passengers = parseInt(searchParams.get("passengers") || "10");
  
  // Form state
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // Handle back navigation
  const handleBack = () => {
    // Navigate back to itinerary page with the same parameters
    setLocation(`/itinerary?${search}`);
  };
  
  // Format credit card input
  const formatCreditCard = (value: string) => {
    const v = value.replace(/[^0-9]/gi, '').substr(0, 16);
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }
    return parts.join(' ');
  };
  
  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/[^0-9]/gi, '').substr(0, 4);
    if (v.length >= 2) {
      return `${v.substr(0, 2)}/${v.substr(2, 2)}`;
    }
    return v;
  };
  
  // Process payment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!cardholderName || !cardNumber || !expiryDate || !cvv || !billingAddress || 
        !city || !state || !zip || !email || !phone || !agreeTerms) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Card validation
    if (cardNumber.replace(/\\s/g, '').length < 16) {
      toast({
        title: "Invalid card",
        description: "Please enter a valid credit card number.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate payment processing
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      toast({
        title: "Payment Successful",
        description: "Your group booking has been confirmed!",
      });
      
      // Navigate to confirmation page with all the data
      const confirmationParams = new URLSearchParams(search);
      
      // Add payment information 
      confirmationParams.set("paymentComplete", "true");
      confirmationParams.set("cardholderName", cardholderName);
      confirmationParams.set("email", email);
      confirmationParams.set("phone", phone);
      
      // Ensure origin and destination details are passed (even if already in params)
      confirmationParams.set("origin", origin);
      confirmationParams.set("destination", destination);
      confirmationParams.set("departureDate", departureDate);
      if (returnDate) confirmationParams.set("returnDate", returnDate);
      
      // Generate a booking number
      const bookingNumber = "SW" + Math.floor(Math.random() * 10000000).toString().padStart(8, '0');
      confirmationParams.set("bookingNumber", bookingNumber);
      
      setLocation(`/confirmation?${confirmationParams.toString()}`);
    }, 2000);
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
            Back to Itinerary
          </Button>
          <h1 className="text-2xl font-medium text-sw-gray-900">Payment</h1>
        </div>
        
        {/* Booking Summary */}
        <div className="bg-sky-50 p-4 rounded-lg mb-6">
          <div className="flex flex-wrap items-center">
            <div className="flex items-center text-sw-gray-800 mb-2 md:mb-0 mr-6">
              <div className="font-medium">{origin} to {destination}</div>
              <div className="text-sm text-sw-gray-600 ml-2">
                ({flightNumber})
              </div>
            </div>
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 text-sw-gray-500 mr-1" />
              <span className="text-sm text-sw-gray-600">{departureDate}{returnDate ? ` - ${returnDate}` : ''}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-sw-gray-500 mr-1" />
              <span className="text-sm text-sw-gray-600">{passengers} Passengers</span>
            </div>
            <div className="ml-auto font-bold text-sw-gray-800">
              Total: {formatPrice(totalPrice)}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-sw-gray-800 mb-4 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Details
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="col-span-2">
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input 
                          id="cardholderName" 
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                          placeholder="As it appears on your card"
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative mt-1">
                          <Input 
                            id="cardNumber" 
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCreditCard(e.target.value))}
                            placeholder="1234 5678 9012 3456"
                            className="pl-10"
                            required
                          />
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sw-gray-500" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input 
                          id="expiryDate" 
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                          placeholder="MM/YY"
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cvv">Security Code (CVV)</Label>
                        <div className="relative mt-1">
                          <Input 
                            id="cvv" 
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, '').substr(0, 3))}
                            placeholder="123"
                            className="pl-10"
                            required
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sw-gray-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-sw-gray-800 mb-4">Billing Address</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="billingAddress">Street Address</Label>
                        <Input 
                          id="billingAddress" 
                          value={billingAddress}
                          onChange={(e) => setBillingAddress(e.target.value)}
                          placeholder="1234 Main St"
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Los Angeles"
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input 
                            id="state" 
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="CA"
                            className="mt-1"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input 
                            id="zip" 
                            value={zip}
                            onChange={(e) => setZip(e.target.value.replace(/[^0-9]/g, '').substr(0, 5))}
                            placeholder="90001"
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-sw-gray-800 mb-4">Contact Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(555) 123-4567"
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <Checkbox 
                      id="terms" 
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
                      className="mt-1"
                    />
                    <Label 
                      htmlFor="terms" 
                      className="ml-2 text-sm text-sw-gray-600"
                    >
                      I agree to the Infiniti Airlines <a href="#" className="text-sw-blue hover:underline">terms and conditions</a> and <a href="#" className="text-sw-blue hover:underline">fare rules</a>.
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-sw-yellow text-sw-gray-800 hover:bg-yellow-500 transition-colors"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-sw-gray-800 mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      'Complete Booking'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Price Summary */}
          <div>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-sw-gray-800 mb-4">Booking Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-sw-gray-600">Base fare</span>
                    <span>{formatPrice(totalPrice * 0.8)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-sw-gray-600">Taxes & fees</span>
                    <span>{formatPrice(totalPrice * 0.2)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold mb-6">
                  <span>Total</span>
                  <span className="text-lg">{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <div className="flex items-center text-sm font-medium text-sw-gray-800 mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-sw-blue" />
                    Trip Details
                  </div>
                  <div className="text-xs text-sw-gray-600 space-y-1">
                    <div>Outbound: {departureDate}</div>
                    {returnDate && <div>Return: {returnDate}</div>}
                    <div>{passengers} Passengers</div>
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  <div className="flex items-start text-xs text-sw-gray-600">
                    <ShieldCheck className="h-4 w-4 text-sw-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span>Your payment is secure and encrypted</span>
                  </div>
                  <div className="flex items-start text-xs text-sw-gray-600">
                    <Info className="h-4 w-4 text-sw-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span>Need help with your booking? Contact Infiniti Group Desk at 1-800-435-9792</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}