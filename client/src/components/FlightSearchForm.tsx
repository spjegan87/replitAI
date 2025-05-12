import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown, PlaneTakeoff, PlaneLanding, CalendarDays, Plus, User, Baby } from "lucide-react";
import { cn } from "@/lib/utils";

type TripType = 'one-way' | 'round-trip' | 'multi-city';

interface FlightSearchFormProps {
  tripType: TripType;
}

export default function FlightSearchForm({ tripType }: FlightSearchFormProps) {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [preference, setPreference] = useState<string>("");
  const [cabin, setCabin] = useState<string>("economy");
  const [groupCategory, setGroupCategory] = useState<string>("Adhoc");
  const [isFlexible, setIsFlexible] = useState<boolean>(false);
  const [showRemarks, setShowRemarks] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<string>("");

  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format dates to string representation
    const departureDateStr = departureDate ? format(departureDate, "dd MMM yyyy") : "";
    const returnDateStr = returnDate ? format(returnDate, "dd MMM yyyy") : "";
    
    // Create search params to pass data to the search results page
    const searchParams = new URLSearchParams({
      tripType,
      origin: origin || "",
      destination: destination || "",
      departureDate: departureDateStr,
      returnDate: returnDateStr,
      cabin: cabin || "economy",
      passengers: "10", // Default from form UI
      groupCategory: groupCategory || "Adhoc"
    }).toString();
    
    // Navigate to search results page with the search parameters
    setLocation(`/search-results?${searchParams}`);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Origin Field */}
          <div>
            <Label className="text-sm font-medium text-sw-gray-700 mb-1">
              Origin <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PlaneTakeoff className="h-4 w-4 text-sw-gray-400" />
              </div>
              <Input 
                type="text" 
                placeholder="Entry Origin City" 
                className="pl-10 pr-3 py-2.5 w-full border border-sw-gray-300 rounded-md"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
            </div>
          </div>
          
          {/* Destination Field */}
          <div>
            <Label className="text-sm font-medium text-sw-gray-700 mb-1">
              Destination <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PlaneLanding className="h-4 w-4 text-sw-gray-400" />
              </div>
              <Input 
                type="text" 
                placeholder="Entry Destination City" 
                className="pl-10 pr-3 py-2.5 w-full border border-sw-gray-300 rounded-md"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
          </div>
          
          {/* Departure Date */}
          <div>
            <Label className="text-sm font-medium text-sw-gray-700 mb-1">
              Destination Date <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-10 pr-3 py-2.5 border border-sw-gray-300 rounded-md text-left font-normal",
                      !departureDate && "text-muted-foreground"
                    )}
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-4 w-4 text-sw-gray-400" />
                    </div>
                    {departureDate ? format(departureDate, "PPP") : <span>Select Departure Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {/* Return Date */}
          {tripType !== 'one-way' && (
            <div>
              <Label className="text-sm font-medium text-sw-gray-700 mb-1">
                Return Date <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-10 pr-3 py-2.5 border border-sw-gray-300 rounded-md text-left font-normal",
                        !returnDate && "text-muted-foreground"
                      )}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-4 w-4 text-sw-gray-400" />
                      </div>
                      {returnDate ? format(returnDate, "PPP") : <span>Select Return Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      disabled={(date) => 
                        departureDate ? date < departureDate : false
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
          
          {/* Preference */}
          <div className={tripType === 'one-way' ? "md:col-span-2 lg:col-span-1" : ""}>
            <Label className="text-sm font-medium text-sw-gray-700 mb-1">
              Preference
            </Label>
            <Select value={preference} onValueChange={setPreference}>
              <SelectTrigger className="w-full border border-sw-gray-300 rounded-md">
                <SelectValue placeholder="Preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct">Direct flights</SelectItem>
                <SelectItem value="lowest">Lowest fare</SelectItem>
                <SelectItem value="shortest">Shortest duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* No of Passengers */}
          <div className="md:col-span-2 lg:col-span-1">
            <Label className="text-sm font-medium text-sw-gray-700 mb-1">
              No Of Passengers <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center border border-sw-gray-300 rounded-md px-3 py-2.5 bg-white">
                <User className="h-4 w-4 text-sw-gray-400 mr-1" />
                <span className="text-sm">Adult</span>
              </div>
              <div className="flex items-center border border-sw-gray-300 rounded-md px-3 py-2.5 bg-white">
                <User className="h-3 w-3 text-sw-gray-400 mr-1" />
                <span className="text-sm">Child</span>
              </div>
              <div className="flex items-center border border-sw-gray-300 rounded-md px-3 py-2.5 bg-white">
                <Baby className="h-4 w-4 text-sw-gray-400 mr-1" />
                <span className="text-sm">Infant</span>
              </div>
            </div>
          </div>
          
          {/* Cabin */}
          <div>
            <Label className="text-sm font-medium text-sw-gray-700 mb-1">
              Cabin <span className="text-red-500">*</span>
            </Label>
            <Select value={cabin} onValueChange={setCabin}>
              <SelectTrigger className="w-full border border-sw-gray-300 rounded-md">
                <SelectValue placeholder="Economy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="first">First</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Group Category */}
          <div>
            <Label className="text-sm font-medium text-sw-gray-700 mb-1">
              Group Category <span className="text-red-500">*</span>
            </Label>
            <Input 
              type="text" 
              placeholder="Adhoc" 
              className="w-full border border-sw-gray-300 rounded-md"
              value={groupCategory}
              onChange={(e) => setGroupCategory(e.target.value)}
              required
            />
          </div>
        </div>
        
        {/* Additional Options */}
        <div className="flex items-center mt-4 mb-6">
          <div 
            className="flex items-center mr-6 cursor-pointer"
            onClick={() => setIsFlexible(!isFlexible)}
          >
            <CalendarDays className={`h-4 w-4 mr-2 ${isFlexible ? 'text-sw-blue' : 'text-sw-gray-400'}`} />
            <span className={`text-sm font-medium ${isFlexible ? 'text-sw-blue' : 'text-sw-gray-700'}`}>
              Flexible On Dates
            </span>
          </div>
          
          <div 
            className="text-sw-blue text-sm font-medium cursor-pointer"
            onClick={() => setShowRemarks(!showRemarks)}
          >
            <Plus className="h-4 w-4 inline mr-1" />
            Add Remarks
          </div>
        </div>
        
        {showRemarks && (
          <div className="mb-4">
            <Label className="text-sm font-medium text-sw-gray-700 mb-1">
              Remarks
            </Label>
            <Input 
              type="text" 
              placeholder="Add any special requests or notes" 
              className="w-full border border-sw-gray-300 rounded-md"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        )}
        
        {/* Search Button */}
        <div className="flex justify-center">
          <Button 
            type="submit" 
            className="bg-sw-yellow text-sw-gray-800 px-8 py-3 rounded font-medium hover:bg-yellow-500 transition-colors"
          >
            Get Fares
          </Button>
        </div>
      </form>
    </div>
  );
}
