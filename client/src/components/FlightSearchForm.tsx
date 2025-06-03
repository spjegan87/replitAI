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
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { airports, filterAirports, Airport } from "@/data/airports";

type TripType = "one-way" | "round-trip" | "multi-city";

interface FlightSector {
  id: string;
  origin: string;
  destination: string;
  departureDate: Date | undefined;
  originQuery: string;
  destinationQuery: string;
  originAirports: Airport[];
  destinationAirports: Airport[];
  openOrigin: boolean;
  openDestination: boolean;
}

interface FlightSearchFormProps {
  tripType: TripType;
}

export default function FlightSearchForm({ tripType }: FlightSearchFormProps) {
  // Single trip states (for one-way and round-trip)
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

  // Multi-city states
  const [multiCitySectors, setMultiCitySectors] = useState<FlightSector[]>([
    {
      id: "sector-1",
      origin: "",
      destination: "",
      departureDate: undefined,
      originQuery: "",
      destinationQuery: "",
      originAirports: [],
      destinationAirports: [],
      openOrigin: false,
      openDestination: false,
    },
    {
      id: "sector-2",
      origin: "",
      destination: "",
      departureDate: undefined,
      originQuery: "",
      destinationQuery: "",
      originAirports: [],
      destinationAirports: [],
      openOrigin: false,
      openDestination: false,
    },
  ]);

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
    multiCity?: string;
  }>({});

  const [, setLocation] = useLocation();

  // Filter airports when origin query changes
  useEffect(() => {
    const filtered = filterAirports(originQuery);
    setOriginAirports(filtered);
    setOpenOrigin(true);
  }, [originQuery]);

  // Filter airports when destination query changes
  useEffect(() => {
    const filtered = filterAirports(destinationQuery);
    setDestinationAirports(filtered);
    setOpenDestination(true);
  }, [destinationQuery]);

  // Multi-city sector management functions
  const addMultiCitySector = () => {
    const newSector: FlightSector = {
      id: `sector-${multiCitySectors.length + 1}`,
      origin: "",
      destination: "",
      departureDate: undefined,
      originQuery: "",
      destinationQuery: "",
      originAirports: [],
      destinationAirports: [],
      openOrigin: false,
      openDestination: false,
    };
    setMultiCitySectors([...multiCitySectors, newSector]);
  };

  const removeMultiCitySector = (sectorId: string) => {
    if (multiCitySectors.length > 2) {
      setMultiCitySectors(multiCitySectors.filter(sector => sector.id !== sectorId));
    }
  };

  const updateMultiCitySector = (sectorId: string, field: keyof FlightSector, value: any) => {
    setMultiCitySectors(sectors => 
      sectors.map(sector => 
        sector.id === sectorId ? { ...sector, [field]: value } : sector
      )
    );
  };

  const handleMultiCityOriginSelect = (sectorId: string, airport: Airport) => {
    updateMultiCitySector(sectorId, 'origin', `${airport.city} (${airport.code})`);
    updateMultiCitySector(sectorId, 'originQuery', '');
    updateMultiCitySector(sectorId, 'openOrigin', false);
    
    // Auto-populate destination query for the same sector
    updateMultiCitySector(sectorId, 'destinationQuery', airport.city);
    updateMultiCitySector(sectorId, 'openDestination', true);
  };

  const handleMultiCityDestinationSelect = (sectorId: string, airport: Airport) => {
    updateMultiCitySector(sectorId, 'destination', `${airport.city} (${airport.code})`);
    updateMultiCitySector(sectorId, 'destinationQuery', '');
    updateMultiCitySector(sectorId, 'openDestination', false);
    
    // Auto-populate next sector's origin if it exists
    const currentIndex = multiCitySectors.findIndex(s => s.id === sectorId);
    if (currentIndex < multiCitySectors.length - 1) {
      const nextSectorId = multiCitySectors[currentIndex + 1].id;
      updateMultiCitySector(nextSectorId, 'originQuery', airport.city);
      updateMultiCitySector(nextSectorId, 'openOrigin', true);
    }
  };

  // Filter airports for multi-city sectors
  useEffect(() => {
    multiCitySectors.forEach(sector => {
      if (sector.originQuery !== undefined) {
        const filtered = filterAirports(sector.originQuery);
        updateMultiCitySector(sector.id, 'originAirports', filtered);
      }
      if (sector.destinationQuery !== undefined) {
        const filtered = filterAirports(sector.destinationQuery);
        updateMultiCitySector(sector.id, 'destinationAirports', filtered);
      }
    });
  }, [multiCitySectors.map(s => s.originQuery).join(','), multiCitySectors.map(s => s.destinationQuery).join(',')]);

  // Handle airport selection for origin
  const handleOriginSelect = (airport: Airport) => {
    setOrigin(`${airport.city} (${airport.code})`);
    setDestinationQuery(airport.city);
    setOpenDestination(true);
    setOriginQuery("");
    setOpenOrigin(false);
    setErrors((prev) => ({ ...prev, origin: undefined }));
  };

  // Handle airport selection for destination
  const handleDestinationSelect = (airport: Airport) => {
    setDestination(`${airport.city} (${airport.code})`);
    setDestinationQuery("");
    setOpenDestination(false);
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
      multiCity?: string;
    } = {};

    if (tripType === "multi-city") {
      // Validate multi-city sectors
      let hasValidSector = false;
      for (let i = 0; i < multiCitySectors.length; i++) {
        const sector = multiCitySectors[i];
        if (!sector.origin || !sector.destination || !sector.departureDate) {
          if (i < 2) { // First two sectors are required
            newErrors.multiCity = `Sector ${i + 1}: Origin, destination, and departure date are required`;
            break;
          }
        } else {
          hasValidSector = true;
          // Check if origin and destination are the same within a sector
          if (sector.origin === sector.destination) {
            newErrors.multiCity = `Sector ${i + 1}: Origin and destination cannot be the same`;
            break;
          }
        }
      }
      
      if (!hasValidSector && !newErrors.multiCity) {
        newErrors.multiCity = "At least one complete sector is required";
      }
    } else {
      // Validate single trip (one-way/round-trip)
      if (!origin) {
        newErrors.origin = "Origin is required";
      }

      if (!destination) {
        newErrors.destination = "Destination is required";
      } else if (origin === destination) {
        newErrors.destination = "Origin and destination cannot be the same";
      }

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

    // Calculate total passenger count
    const totalPassengers = adultCount + childCount + infantCount;

    let searchParams: URLSearchParams;

    if (tripType === "multi-city") {
      // Handle multi-city form submission
      const validSectors = multiCitySectors.filter(sector => 
        sector.origin && sector.destination && sector.departureDate
      );

      const multiCityData = {
        tripType,
        sectors: validSectors.map((sector, index) => ({
          sectorNumber: index + 1,
          origin: sector.origin,
          destination: sector.destination,
          departureDate: format(sector.departureDate!, "dd MMM yyyy"),
        })),
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
      };

      searchParams = new URLSearchParams({
        tripType,
        multiCityData: JSON.stringify(multiCityData),
        // Include basic params for backward compatibility
        passengers: totalPassengers.toString(),
        adultCount: adultCount.toString(),
        childCount: childCount.toString(),
        infantCount: infantCount.toString(),
        cabin: cabin || "economy",
        groupCategory: groupCategory || "Adhoc",
        isFlexible: isFlexible.toString(),
        preference: preference || "",
        remarks: remarks || "",
      });
    } else {
      // Handle single trip form submission (one-way/round-trip)
      const departureDateStr = departureDate
        ? format(departureDate, "dd MMM yyyy")
        : "";
      const returnDateStr = returnDate ? format(returnDate, "dd MMM yyyy") : "";

      searchParams = new URLSearchParams({
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
      });
    }

    // Navigate to search results page with the search parameters
    setLocation(`/search-results?${searchParams.toString()}`);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        {tripType === "multi-city" ? (
          // Multi-city form layout
          <div className="space-y-6">
            {multiCitySectors.map((sector, index) => (
              <div key={sector.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-sw-gray-700">
                    Sector {index + 1}
                  </h3>
                  {index >= 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMultiCitySector(sector.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Origin Field for Multi-city */}
                  <div>
                    <Label className="text-sm font-medium text-sw-gray-700 mb-1">
                      Origin <span className="text-red-500">*</span>
                    </Label>
                    <Popover 
                      open={sector.openOrigin} 
                      onOpenChange={(open) => updateMultiCitySector(sector.id, 'openOrigin', open)}
                    >
                      <PopoverTrigger asChild>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                            <PlaneTakeoff className="h-4 w-4 text-sw-gray-400" />
                          </div>
                          <Input
                            type="text"
                            placeholder="Enter Origin City or Airport"
                            className="pl-10 pr-3 py-2.5 w-full border border-sw-gray-300 rounded-md"
                            value={sector.origin || sector.originQuery}
                            onChange={(e) => {
                              if (sector.origin) updateMultiCitySector(sector.id, 'origin', '');
                              updateMultiCitySector(sector.id, 'originQuery', e.target.value);
                            }}
                            onClick={() => {
                              if (sector.origin) {
                                updateMultiCitySector(sector.id, 'originQuery', '');
                                updateMultiCitySector(sector.id, 'origin', '');
                              }
                              updateMultiCitySector(sector.id, 'openOrigin', true);
                            }}
                            onFocus={() => {
                              updateMultiCitySector(sector.id, 'openOrigin', true);
                              if (!sector.originAirports.length) {
                                const filtered = filterAirports("");
                                updateMultiCitySector(sector.id, 'originAirports', filtered);
                              }
                            }}
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-full" align="start">
                        <Command>
                          <CommandInput
                            placeholder="Search airports..."
                            value={sector.originQuery}
                            onValueChange={(value) => updateMultiCitySector(sector.id, 'originQuery', value)}
                            className="h-9"
                          />
                          <CommandEmpty>No airports found.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-auto">
                            {sector.originAirports.map((airport) => (
                              <CommandItem
                                key={airport.code}
                                onSelect={() => handleMultiCityOriginSelect(sector.id, airport)}
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
                  </div>

                  {/* Destination Field for Multi-city */}
                  <div>
                    <Label className="text-sm font-medium text-sw-gray-700 mb-1">
                      Destination <span className="text-red-500">*</span>
                    </Label>
                    <Popover 
                      open={sector.openDestination} 
                      onOpenChange={(open) => updateMultiCitySector(sector.id, 'openDestination', open)}
                    >
                      <PopoverTrigger asChild>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                            <PlaneLanding className="h-4 w-4 text-sw-gray-400" />
                          </div>
                          <Input
                            type="text"
                            placeholder="Enter Destination City or Airport"
                            className="pl-10 pr-3 py-2.5 w-full border border-sw-gray-300 rounded-md"
                            value={sector.destination || sector.destinationQuery}
                            onChange={(e) => {
                              if (sector.destination) updateMultiCitySector(sector.id, 'destination', '');
                              updateMultiCitySector(sector.id, 'destinationQuery', e.target.value);
                            }}
                            onClick={() => {
                              if (sector.destination) {
                                updateMultiCitySector(sector.id, 'destinationQuery', '');
                                updateMultiCitySector(sector.id, 'destination', '');
                              }
                              updateMultiCitySector(sector.id, 'openDestination', true);
                            }}
                            onFocus={() => {
                              updateMultiCitySector(sector.id, 'openDestination', true);
                              if (!sector.destinationAirports.length) {
                                const filtered = filterAirports("");
                                updateMultiCitySector(sector.id, 'destinationAirports', filtered);
                              }
                            }}
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-full" align="start">
                        <Command>
                          <CommandInput
                            placeholder="Search airports..."
                            value={sector.destinationQuery}
                            onValueChange={(value) => updateMultiCitySector(sector.id, 'destinationQuery', value)}
                            className="h-9"
                          />
                          <CommandEmpty>No airports found.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-auto">
                            {sector.destinationAirports.map((airport) => (
                              <CommandItem
                                key={airport.code}
                                onSelect={() => handleMultiCityDestinationSelect(sector.id, airport)}
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
                  </div>

                  {/* Departure Date for Multi-city */}
                  <div>
                    <Label className="text-sm font-medium text-sw-gray-700 mb-1">
                      Departure Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !sector.departureDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {sector.departureDate ? (
                            format(sector.departureDate, "PPP")
                          ) : (
                            <span>Pick departure date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={sector.departureDate}
                          onSelect={(date) => updateMultiCitySector(sector.id, 'departureDate', date)}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add Sector Button */}
            {multiCitySectors.length < 6 && (
              <Button
                type="button"
                variant="outline"
                onClick={addMultiCitySector}
                className="w-full border-dashed border-2 border-gray-300 text-gray-600 hover:border-sw-blue hover:text-sw-blue"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Sector
              </Button>
            )}
            
            {/* Multi-city validation error */}
            {errors.multiCity && (
              <p className="text-red-500 text-sm">{errors.multiCity}</p>
            )}

            {/* Passenger Count for Multi-city */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Passengers */}
              <div>
                <Label className="text-sm font-medium text-sw-gray-700 mb-3">
                  Passengers <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label
                      htmlFor="adultCount"
                      className="text-xs text-sw-gray-600 flex items-center"
                    >
                      <User className="h-4 w-4 text-sw-gray-400 mr-1" />
                      Adult
                    </Label>
                    <div className="flex items-center border border-sw-gray-300 rounded-md">
                      <button
                        type="button"
                        className="px-2 py-1 text-sw-gray-500 hover:text-sw-gray-700"
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
                        className="border-0 text-center w-10 p-0"
                      />
                      <button
                        type="button"
                        className="px-2 py-1 text-sw-gray-500 hover:text-sw-gray-700"
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
                      <User className="h-4 w-4 text-sw-gray-400 mr-1" />
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
          </div>
        ) : (
          // Single trip form layout (one-way and round-trip)
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
                        if (errors.origin) {
                          setErrors((prev) => ({ ...prev, origin: undefined }));
                        }
                      }}
                      onClick={() => {
                        if (origin) {
                          setOriginQuery("");
                          setOrigin("");
                        }
                        setOpenOrigin(true);
                      }}
                      onFocus={() => {
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
                        if (errors.destination) {
                          setErrors((prev) => ({ ...prev, destination: undefined }));
                        }
                      }}
                      onClick={() => {
                        if (destination) {
                          setDestinationQuery("");
                          setDestination("");
                        }
                        setOpenDestination(true);
                      }}
                      onFocus={() => {
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
                Departure Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !departureDate && "text-muted-foreground",
                      errors.departureDate && "border-red-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departureDate ? (
                      format(departureDate, "PPP")
                    ) : (
                      <span>Pick departure date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={(date) => {
                      setDepartureDate(date);
                      if (errors.departureDate) {
                        setErrors((prev) => ({ ...prev, departureDate: undefined }));
                      }
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.departureDate && (
                <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>
              )}
            </div>

            {/* Return Date - Only for round-trip */}
            {tripType === "round-trip" && (
              <div>
                <Label className="text-sm font-medium text-sw-gray-700 mb-1">
                  Return Date <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !returnDate && "text-muted-foreground",
                        errors.returnDate && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? (
                        format(returnDate, "PPP")
                      ) : (
                        <span>Pick return date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={(date) => {
                        setReturnDate(date);
                        if (errors.returnDate) {
                          setErrors((prev) => ({ ...prev, returnDate: undefined }));
                        }
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.returnDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>
                )}
              </div>
            )}

            {/* Passengers */}
            <div>
              <Label className="text-sm font-medium text-sw-gray-700 mb-3">
                Passengers <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label
                    htmlFor="adultCount"
                    className="text-xs text-sw-gray-600 flex items-center"
                  >
                    <User className="h-4 w-4 text-sw-gray-400 mr-1" />
                    Adult
                  </Label>
                  <div className="flex items-center border border-sw-gray-300 rounded-md">
                    <button
                      type="button"
                      className="px-2 py-1 text-sw-gray-500 hover:text-sw-gray-700"
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
                      className="border-0 text-center w-10 p-0"
                    />
                    <button
                      type="button"
                      className="px-2 py-1 text-sw-gray-500 hover:text-sw-gray-700"
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
                    <User className="h-4 w-4 text-sw-gray-400 mr-1" />
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
              {errors.passengers && (
                <p className="text-red-500 text-sm mt-1">{errors.passengers}</p>
              )}
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
        )}

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