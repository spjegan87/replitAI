// More comprehensive flight data for search results
export interface FlightResult {
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
  type: 'domestic' | 'international';
  aircraft: string;
  amenities: string[];
}

export const flightResults: FlightResult[] = [
  // Domestic Flights
  {
    id: 1,
    airline: "Infiniti",
    departureTime: "06:45 AM",
    arrivalTime: "09:20 AM",
    duration: "2h 35m",
    origin: "LAX",
    destination: "SFO",
    price: 149.99,
    stops: 0,
    flightNumber: "IN 1422",
    type: 'domestic',
    aircraft: "Boeing 737-800",
    amenities: ["Wi-Fi", "Power outlets", "Snacks"]
  },
  {
    id: 2,
    airline: "Infiniti",
    departureTime: "08:30 AM",
    arrivalTime: "11:15 AM",
    duration: "2h 45m",
    origin: "LAX",
    destination: "SFO",
    price: 129.99,
    stops: 0,
    flightNumber: "IN 2156",
    type: 'domestic',
    aircraft: "Boeing 737-700",
    amenities: ["Wi-Fi", "Power outlets"]
  },
  {
    id: 3,
    airline: "Infiniti",
    departureTime: "10:15 AM",
    arrivalTime: "01:45 PM",
    duration: "3h 30m",
    origin: "LAX",
    destination: "SFO",
    price: 109.99,
    stops: 1,
    flightNumber: "IN 994",
    type: 'domestic',
    aircraft: "Boeing 737-800",
    amenities: ["Wi-Fi", "Power outlets", "Snacks", "Entertainment"]
  },
  {
    id: 4,
    airline: "Infiniti",
    departureTime: "02:30 PM",
    arrivalTime: "05:10 PM",
    duration: "2h 40m",
    origin: "LAX",
    destination: "SFO",
    price: 189.99,
    stops: 0,
    flightNumber: "IN 3316",
    type: 'domestic',
    aircraft: "Boeing 737-800",
    amenities: ["Wi-Fi", "Power outlets", "Snacks"]
  },
  {
    id: 5,
    airline: "Infiniti",
    departureTime: "06:20 PM",
    arrivalTime: "09:05 PM",
    duration: "2h 45m",
    origin: "LAX",
    destination: "SFO",
    price: 159.99,
    stops: 0,
    flightNumber: "IN 5827",
    type: 'domestic',
    aircraft: "Boeing 737-700",
    amenities: ["Wi-Fi", "Power outlets", "Snacks"]
  },
  {
    id: 6,
    airline: "Infiniti",
    departureTime: "07:15 AM",
    arrivalTime: "10:45 AM",
    duration: "3h 30m",
    origin: "JFK",
    destination: "MIA",
    price: 219.99,
    stops: 0,
    flightNumber: "IN 652",
    type: 'domestic',
    aircraft: "Boeing 737-800",
    amenities: ["Wi-Fi", "Power outlets", "Meal service", "Entertainment"]
  },
  {
    id: 7,
    airline: "Infiniti",
    departureTime: "09:30 AM",
    arrivalTime: "01:15 PM",
    duration: "3h 45m",
    origin: "JFK",
    destination: "MIA",
    price: 199.99,
    stops: 1,
    flightNumber: "IN 873",
    type: 'domestic',
    aircraft: "Boeing 737-700",
    amenities: ["Wi-Fi", "Power outlets", "Snacks"]
  },
  {
    id: 8,
    airline: "Infiniti",
    departureTime: "11:20 AM",
    arrivalTime: "02:50 PM",
    duration: "3h 30m",
    origin: "JFK",
    destination: "MIA",
    price: 229.99,
    stops: 0,
    flightNumber: "IN 1065",
    type: 'domestic',
    aircraft: "Boeing 737-800",
    amenities: ["Wi-Fi", "Power outlets", "Meal service"]
  },
  {
    id: 9,
    airline: "Infiniti",
    departureTime: "05:45 AM",
    arrivalTime: "08:15 AM",
    duration: "2h 30m",
    origin: "ORD",
    destination: "DEN",
    price: 174.99,
    stops: 0,
    flightNumber: "IN 492",
    type: 'domestic',
    aircraft: "Boeing 737-700",
    amenities: ["Wi-Fi", "Power outlets", "Snacks"]
  },
  {
    id: 10,
    airline: "Infiniti",
    departureTime: "08:30 AM",
    arrivalTime: "11:10 AM",
    duration: "2h 40m",
    origin: "ORD",
    destination: "DEN",
    price: 159.99,
    stops: 0,
    flightNumber: "IN 775",
    type: 'domestic',
    aircraft: "Boeing 737-800",
    amenities: ["Wi-Fi", "Power outlets", "Snacks"]
  },
  
  // International Flights
  {
    id: 11,
    airline: "Infiniti",
    departureTime: "09:15 AM",
    arrivalTime: "03:45 PM",
    duration: "6h 30m",
    origin: "LAX",
    destination: "CUN",
    price: 459.99,
    stops: 0,
    flightNumber: "IN 634",
    type: 'international',
    aircraft: "Boeing 737-800",
    amenities: ["Wi-Fi", "Power outlets", "Meal service", "Entertainment"]
  },
  {
    id: 12,
    airline: "Infiniti",
    departureTime: "12:30 PM",
    arrivalTime: "07:15 PM",
    duration: "6h 45m",
    origin: "LAX",
    destination: "CUN",
    price: 429.99,
    stops: 1,
    flightNumber: "IN 876",
    type: 'international',
    aircraft: "Boeing 737-800",
    amenities: ["Wi-Fi", "Power outlets", "Meal service", "Entertainment"]
  },
  {
    id: 13,
    airline: "Infiniti",
    departureTime: "08:20 AM",
    arrivalTime: "02:50 PM",
    duration: "6h 30m",
    origin: "LAX",
    destination: "CUN",
    price: 489.99,
    stops: 0,
    flightNumber: "IN 456",
    type: 'international',
    aircraft: "Boeing 737-800",
    amenities: ["Wi-Fi", "Power outlets", "Meal service", "Entertainment"]
  },
  {
    id: 14,
    airline: "Infiniti",
    departureTime: "11:45 AM",
    arrivalTime: "06:30 PM",
    duration: "6h 45m",
    origin: "LAX",
    destination: "CUN",
    price: 449.99,
    stops: 1,
    flightNumber: "IN 892",
    type: 'international',
    aircraft: "Boeing 737-800",
    amenities: ["Wi-Fi", "Power outlets", "Meal service", "Entertainment"]
  },
  {
    id: 15,
    airline: "Infiniti",
    departureTime: "07:30 AM",
    arrivalTime: "01:20 PM",
    duration: "5h 50m",
    origin: "MIA",
    destination: "CUN",
    price: 379.99,
    stops: 0,
    flightNumber: "IN 567",
    type: 'international',
    aircraft: "Boeing 737-700",
    amenities: ["Wi-Fi", "Power outlets", "Meal service"]
  },
  {
    id: 16,
    airline: "Infiniti",
    departureTime: "10:45 AM",
    arrivalTime: "04:30 PM",
    duration: "5h 45m",
    origin: "MIA",
    destination: "CUN",
    price: 349.99,
    stops: 0,
    flightNumber: "IN 698",
    type: 'international',
    aircraft: "Boeing 737-700",
    amenities: ["Wi-Fi", "Power outlets", "Meal service"]
  },
  {
    id: 17,
    airline: "Infiniti",
    departureTime: "06:15 AM",
    arrivalTime: "07:45 PM",
    duration: "13h 30m",
    origin: "JFK",
    destination: "LHR",
    price: 899.99,
    stops: 1,
    flightNumber: "IN 235",
    type: 'international',
    aircraft: "Boeing 777-200",
    amenities: ["Wi-Fi", "Power outlets", "Meal service", "Entertainment", "USB ports"]
  },
  {
    id: 18,
    airline: "Infiniti",
    departureTime: "09:30 AM",
    arrivalTime: "11:15 PM",
    duration: "13h 45m",
    origin: "JFK",
    destination: "LHR",
    price: 949.99,
    stops: 1,
    flightNumber: "IN 456",
    type: 'international',
    aircraft: "Boeing 777-200",
    amenities: ["Wi-Fi", "Power outlets", "Meal service", "Entertainment", "USB ports"]
  },
  {
    id: 19,
    airline: "Infiniti",
    departureTime: "07:45 AM",
    arrivalTime: "11:30 PM",
    duration: "15h 45m",
    origin: "LAX",
    destination: "NRT",
    price: 1249.99,
    stops: 1,
    flightNumber: "IN 789",
    type: 'international',
    aircraft: "Boeing 787-9",
    amenities: ["Wi-Fi", "Power outlets", "Meal service", "Entertainment", "USB ports"]
  },
  {
    id: 20,
    airline: "Infiniti",
    departureTime: "11:20 AM",
    arrivalTime: "03:50 PM",
    duration: "16h 30m",
    origin: "LAX",
    destination: "NRT",
    price: 1299.99,
    stops: 1,
    flightNumber: "IN 912",
    type: 'international',
    aircraft: "Boeing 787-9",
    amenities: ["Wi-Fi", "Power outlets", "Meal service", "Entertainment", "USB ports"]
  },
  {
    id: 21,
    airline: "Infiniti",
    departureTime: "08:15 AM",
    arrivalTime: "01:45 PM",
    duration: "5h 30m",
    origin: "DFW",
    destination: "LAS",
    price: 179.99,
    stops: 0,
    flightNumber: "IN 517",
    type: 'domestic',
    aircraft: "Boeing 737-700",
    amenities: ["Wi-Fi", "Power outlets", "Snacks"]
  },
  {
    id: 22,
    airline: "Infiniti",
    departureTime: "10:30 AM",
    arrivalTime: "04:15 PM",
    duration: "5h 45m",
    origin: "DFW",
    destination: "LAS",
    price: 159.99,
    stops: 1,
    flightNumber: "IN 628",
    type: 'domestic',
    aircraft: "Boeing 737-700",
    amenities: ["Wi-Fi", "Power outlets", "Snacks"]
  },
  {
    id: 23,
    airline: "Infiniti",
    departureTime: "05:45 AM",
    arrivalTime: "02:30 PM",
    duration: "8h 45m",
    origin: "ATL",
    destination: "SAN",
    price: 289.99,
    stops: 1,
    flightNumber: "IN 739",
    type: 'domestic',
    aircraft: "Boeing 737-800",
    amenities: ["Wi-Fi", "Power outlets", "Meal service"]
  },
  {
    id: 24,
    airline: "Infiniti",
    departureTime: "09:20 AM",
    arrivalTime: "06:15 PM",
    duration: "8h 55m",
    origin: "ATL",
    destination: "SAN",
    price: 309.99,
    stops: 1,
    flightNumber: "IN 821",
    type: 'domestic',
    aircraft: "Boeing 737-800",
    amenities: ["Wi-Fi", "Power outlets", "Meal service"]
  },
  {
    id: 25,
    airline: "Infiniti",
    departureTime: "06:30 AM",
    arrivalTime: "12:45 PM",
    duration: "6h 15m",
    origin: "JFK",
    destination: "SFO",
    price: 329.99,
    stops: 0,
    flightNumber: "IN 932",
    type: 'domestic',
    aircraft: "Boeing 737-800",
    amenities: ["Wi-Fi", "Power outlets", "Meal service", "Entertainment"]
  },
];

export function filterFlights(criteria: {
  origin?: string;
  destination?: string;
  date?: string;
  maxPrice?: number;
  maxStops?: number;
  type?: 'domestic' | 'international' | 'all';
}) {
  const { origin, destination, date, maxPrice, maxStops, type } = criteria;
  
  return flightResults.filter(flight => {
    // Filter by origin and destination if provided
    if (origin && !flight.origin.includes(origin)) return false;
    if (destination && !flight.destination.includes(destination)) return false;
    
    // Filter by max price if provided
    if (maxPrice && flight.price > maxPrice) return false;
    
    // Filter by max stops if provided
    if (maxStops !== undefined && flight.stops > maxStops) return false;
    
    // Filter by flight type if provided
    if (type && type !== 'all' && flight.type !== type) return false;
    
    return true;
  });
}