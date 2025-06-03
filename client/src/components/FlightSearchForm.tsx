import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  PlaneTakeoff,
  PlaneLanding,
  CalendarDays,
  Plus,
  User,
  Baby,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { airports, filterAirports, Airport } from "@/data/airports";

type TripType = "one-way" | "round-trip" | "multi-city";

interface FlightSearchFormProps {
  tripType: TripType;
}

export default function FlightSearchForm({ tripType }: FlightSearchFormProps) {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [originQuery, setOriginQuery] = useState<string>("");
  const [destinationQuery, setDestinationQuery] = useState<string>("");
  const [originAirports, setOriginAirports] = useState<Airport[]>([]);
  const [destinationAirports, setDestinationAirports] = useState<Airport[]>([]);
  const [openOrigin, setOpenOrigin] = useState(false);
  const [openDestination, setOpenDestination] = useState(false);
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [preference, setPreference] = useState<string>("");
  const [cabin, setCabin] = useState<string>("economy");
  const [groupCategory, setGroupCategory] = useState<string>("Adhoc");
  const [isFlexible, setIsFlexible] = useState<boolean>(false);
  const [showRemarks, setShowRemarks] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<string>("");

  // Passenger counts
  const [adultCount, setAdultCount] = useState<number>(8);
  const [childCount, setChildCount] = useState<number>(2);
  const [infantCount, setInfantCount] = useState<number>(0);

  // Form validation errors
  const [errors, setErrors] = useState<{
    origin?: string;
    destination?: string;
    departureDate?: string;
    returnDate?: string;
    passengers?: string;
  }>({});

  const [, setLocation] = useLocation();

  // Filter airports when origin query changes
  useEffect(() => {
    // Always filter airports, even with empty query
    const filtered = filterAirports(originQuery);
    setOriginAirports(filtered);
    setOpenOrigin(true);
  }, [originQuery]);

  // Filter airports when destination query changes
  useEffect(() => {
    // Always filter airports, even with empty query
    const filtered = filterAirports(destinationQuery);
    setDestinationAirports(filtered);
    setOpenDestination(true);
  }, [destinationQuery]);

  // Handle airport selection for origin
  const handleOriginSelect = (airport: Airport) => {
    // Set origin with city name and code
    setOrigin(`${airport.city} (${airport.code})`);
    // Auto-populate destination query with origin city
    setDestinationQuery(airport.city);
    setOpenDestination(true);
    setOriginQuery("");
    setOpenOrigin(false);
    // Clear any error related to origin
    setErrors((prev) => ({ ...prev, origin: undefined }));
  };

  // Handle airport selection for destination
  const handleDestinationSelect = (airport: Airport) => {
    setDestination(`${airport.city} (${airport.code})`);
    setDestinationQuery("");
    setOpenDestination(false);
    // Clear any error related to destination
    setErrors((prev) => ({ ...prev, destination: undefined }));
  };

  // Validate form inputs
  const validateForm = (): boolean => {
    const newErrors: {
      origin?: string;
      destination?: string;
      departureDate?: string;
      returnDate?: string;
      passengers?: string;
    } = {};

    // Validate origin
    if (!origin) {
      newErrors.origin = "Origin is required";
    }

    // Validate destination
    if (!destination) {
      newErrors.destination = "Destination is required";
    } else if (origin === destination) {
      newErrors.destination = "Origin and destination cannot be the same";
    }

    // Validate departure date
    if (!departureDate) {
      newErrors.departureDate = "Departure date is required";
    }

    // Validate return date for round trips
    if (tripType === "round-trip" && !returnDate) {
      newErrors.returnDate = "Return date is required";
    }

    // Validate return date is after departure date
    if (departureDate && returnDate && tripType === "round-trip") {
      if (returnDate < departureDate) {
        newErrors.returnDate = "Return date must be after departure date";
      }
    }

    // Validate passenger count
    const totalPassengers = adultCount + childCount + infantCount;
    if (totalPassengers <= 0) {
      newErrors.passengers = "At least one passenger is required";
    } else if (totalPassengers > 100) {
      newErrors.passengers = "Maximum 100 passengers allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    // Format dates to string representation
    const departureDateStr = departureDate
      ? format(departureDate, "dd MMM yyyy")
      : "";
    const returnDateStr = returnDate ? format(returnDate, "dd MMM yyyy") : "";

    // Calculate total passenger count
    const totalPassengers = adultCount + childCount + infantCount;

    // Create search params to pass all flight details data to the search results page
    const searchParams = new URLSearchParams({
      // Trip information
      tripType,
      origin: origin || "",
      destination: destination || "",
      departureDate: departureDateStr,
      returnDate: returnDateStr,

      // Passenger information
      passengers: totalPassengers.toString(),
      adultCount: adultCount.toString(),
      childCount: childCount.toString(),
      infantCount: infantCount.toString(),

      // Flight preferences
      cabin: cabin || "economy",
      groupCategory: groupCategory || "Adhoc",
      isFlexible: isFlexible.toString(),

      // Additional information
      preference: preference || "",
      remarks: remarks || "",
    }).toString();

    // Navigate to search results page with the search parameters
    setLocation(`/search-results?${searchParams}`);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6">
          {/* Origin Field */}
          <div>
            <Label className="text-sm font-medium text-sw-gray-700 mb-1">
              Origin <span className="text-red-500">*</span>
            </Label>
            <Popover open={openOrigin} onOpenChange={setOpenOrigin}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <PlaneTakeoff className="h-4 w-4 text-sw-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter Origin City or Airport"
                    className={`pl-10 pr-3 py-2.5 w-full border ${errors.origin ? "border-red-500" : "border-sw-gray-300"} rounded-md`}
                    value={origin || originQuery}
                    onChange={(e) => {
                      if (origin) setOrigin("");
                      setOriginQuery(e.target.value);
                      // Clear error when typing
                      if (errors.origin) {
                        setErrors((prev) => ({ ...prev, origin: undefined }));
                      }
                    }}
                    onClick={() => {
                      if (origin) {
                        setOriginQuery("");
                        setOrigin("");
                      }
                      // Show dropdown when field is clicked
                      setOpenOrigin(true);
                    }}
                    onFocus={() => {
                      // Show dropdown when field is focused
                      setOpenOrigin(true);
                      if (!originAirports.length) {
                        const filtered = filterAirports("");
                        setOriginAirports(filtered);
                      }
                    }}
                    required
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-full" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search airports..."
                    value={originQuery}
                    onValueChange={setOriginQuery}
                    className="h-9"
                  />
                  <CommandEmpty>No airports found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {originAirports.map((airport) => (
                      <CommandItem
                        key={airport.code}
                        onSelect={() => handleOriginSelect(airport)}
                        className={`cursor-pointer ${airport.country === "India" ? "bg-blue-50" : ""}`}
                      >
                        <div className="flex items-center">
                          <span className="font-bold text-sm mr-2">
                            {airport.code}
                          </span>
                          <span className="text-sm">
                            {airport.city}, {airport.country}
                          </span>
                          {airport.country === "India" && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                              India
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-sw-gray-500 ml-6">
                          {airport.name}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.origin && (
              <p className="text-red-500 text-sm mt-1">{errors.origin}</p>
            )}
          </div>

          {/* Destination Field */}
          <div>
            <Label className="text-sm font-medium text-sw-gray-700 mb-1">
              Destination <span className="text-red-500">*</span>
            </Label>
            <Popover open={openDestination} onOpenChange={setOpenDestination}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <PlaneLanding className="h-4 w-4 text-sw-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter Destination City or Airport"
                    className={`pl-10 pr-3 py-2.5 w-full border ${errors.destination ? "border-red-500" : "border-sw-gray-300"} rounded-md`}
                    value={destination || destinationQuery}
                    onChange={(e) => {
                      if (destination) setDestination("");
                      setDestinationQuery(e.target.value);
                      // Clear error when typing
                      if (errors.destination) {
                        setErrors((prev) => ({
                          ...prev,
                          destination: undefined,
                        }));
                      }
                    }}
                    onClick={() => {
                      if (destination) {
                        setDestinationQuery("");
                        setDestination("");
                      }
                      // Show dropdown when field is clicked
                      setOpenDestination(true);
                    }}
                    onFocus={() => {
                      // Show dropdown when field is focused
                      setOpenDestination(true);
                      if (!destinationAirports.length) {
                        const filtered = filterAirports("");
                        setDestinationAirports(filtered);
                      }
                    }}
                    required
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-full" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search airports..."
                    value={destinationQuery}
                    onValueChange={setDestinationQuery}
                    className="h-9"
                  />
                  <CommandEmpty>No airports found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {destinationAirports.map((airport) => (
                      <CommandItem
                        key={airport.code}
                        onSelect={() => handleDestinationSelect(airport)}
                        className={`cursor-pointer ${airport.country === "India" ? "bg-blue-50" : ""}`}
                      >
                        <div className="flex items-center">
                          <span className="font-bold text-sm mr-2">
                            {airport.code}
                          </span>
                          <span className="text-sm">
                            {airport.city}, {airport.country}
                          </span>
                          {airport.country === "India" && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                              India
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-sw-gray-500 ml-6">
                          {airport.name}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.destination && (
              <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
            )}
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
                      "w-full pl-8 pr-3 py-2 border rounded-md text-left font-normal h-10",
                      errors.departureDate
                        ? "border-red-500"
                        : "border-sw-gray-300",
                      !departureDate && "text-muted-foreground",
                    )}
                    onClick={() => {
                      if (errors.departureDate) {
                        setErrors((prev) => ({
                          ...prev,
                          departureDate: undefined,
                        }));
                      }
                    }}
                  >
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <CalendarIcon className="h-4 w-4 text-sw-gray-400" />
                    </div>
                    {departureDate ? (
                      format(departureDate, "PPP")
                    ) : (
                      <span>Select Departure Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                    disabled={
                      (date) => date < new Date(new Date().setHours(0, 0, 0, 0)) // Disable past dates
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Return Date */}
          {tripType !== "one-way" && (
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
                        !returnDate && "text-muted-foreground",
                      )}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-4 w-4 text-sw-gray-400" />
                      </div>
                      {returnDate ? (
                        format(returnDate, "PPP")
                      ) : (
                        <span>Select Return Date</span>
                      )}
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
          <div>
            <Label className="text-sm font-medium text-sw-gray-700 mb-1">
              Preference
            </Label>
            <Select value={preference} onValueChange={setPreference}>
              <SelectTrigger className="w-full h-10 border border-sw-gray-300 rounded-md">
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
          <div>
            <Label className="text-sm font-medium text-sw-gray-700 mb-1 hidden">
              No Of Passengers <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-3 gap-2 cls-top-3">
              <div className="space-y-1">
                <Label
                  htmlFor="adultCount"
                  className="text-xs text-sw-gray-600 flex items-center"
                >
                  <User className="h-4 w-4 text-sw-gray-400 mr-1" />
                  Adult
                </Label>
                <div className="flex items-center border border-sw-gray-300 rounded-md h-10">
                  <button
                    type="button"
                    className="px-2 py-1 text-sw-gray-500 hover:text-sw-gray-700 h-full"
                    onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                  >
                    -
                  </button>
                  <Input
                    id="adultCount"
                    type="number"
                    min="1"
                    max="100"
                    value={adultCount}
                    onChange={(e) =>
                      setAdultCount(parseInt(e.target.value) || 1)
                    }
                    className="border-0 text-center w-10 p-0 h-full"
                  />
                  <button
                    type="button"
                    className="px-2 py-1 text-sw-gray-500 hover:text-sw-gray-700 h-full"
                    onClick={() => setAdultCount(adultCount + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="childCount"
                  className="text-xs text-sw-gray-600 flex items-center"
                >
                  <User className="h-3 w-3 text-sw-gray-400 mr-1" />
                  Child
                </Label>
                <div className="flex items-center border border-sw-gray-300 rounded-md">
                  <button
                    type="button"
                    className="px-2 py-1 text-sw-gray-500 hover:text-sw-gray-700"
                    onClick={() => setChildCount(Math.max(0, childCount - 1))}
                  >
                    -
                  </button>
                  <Input
                    id="childCount"
                    type="number"
                    min="0"
                    max="100"
                    value={childCount}
                    onChange={(e) =>
                      setChildCount(parseInt(e.target.value) || 0)
                    }
                    className="border-0 text-center w-10 p-0"
                  />
                  <button
                    type="button"
                    className="px-2 py-1 text-sw-gray-500 hover:text-sw-gray-700"
                    onClick={() => setChildCount(childCount + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="infantCount"
                  className="text-xs text-sw-gray-600 flex items-center"
                >
                  <Baby className="h-4 w-4 text-sw-gray-400 mr-1" />
                  Infant
                </Label>
                <div className="flex items-center border border-sw-gray-300 rounded-md">
                  <button
                    type="button"
                    className="px-2 py-1 text-sw-gray-500 hover:text-sw-gray-700"
                    onClick={() => setInfantCount(Math.max(0, infantCount - 1))}
                  >
                    -
                  </button>
                  <Input
                    id="infantCount"
                    type="number"
                    min="0"
                    max="100"
                    value={infantCount}
                    onChange={(e) =>
                      setInfantCount(parseInt(e.target.value) || 0)
                    }
                    className="border-0 text-center w-10 p-0"
                  />
                  <button
                    type="button"
                    className="px-2 py-1 text-sw-gray-500 hover:text-sw-gray-700"
                    onClick={() => setInfantCount(infantCount + 1)}
                  >
                    +
                  </button>
                </div>
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
            <CalendarDays
              className={`h-4 w-4 mr-2 ${isFlexible ? "text-sw-blue" : "text-sw-gray-400"}`}
            />
            <span
              className={`text-sm font-medium ${isFlexible ? "text-sw-blue" : "text-sw-gray-700"}`}
            >
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
