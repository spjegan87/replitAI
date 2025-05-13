export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export const airports: Airport[] = [
  {
    code: "ATL",
    name: "Hartsfield-Jackson Atlanta International Airport",
    city: "Atlanta",
    country: "United States"
  },
  {
    code: "LAX",
    name: "Los Angeles International Airport",
    city: "Los Angeles",
    country: "United States"
  },
  {
    code: "ORD",
    name: "O'Hare International Airport",
    city: "Chicago",
    country: "United States"
  },
  {
    code: "DFW",
    name: "Dallas/Fort Worth International Airport",
    city: "Dallas",
    country: "United States"
  },
  {
    code: "DEN",
    name: "Denver International Airport",
    city: "Denver",
    country: "United States"
  },
  {
    code: "JFK",
    name: "John F. Kennedy International Airport",
    city: "New York",
    country: "United States"
  },
  {
    code: "SFO",
    name: "San Francisco International Airport",
    city: "San Francisco",
    country: "United States"
  },
  {
    code: "SEA",
    name: "Seattle-Tacoma International Airport",
    city: "Seattle",
    country: "United States"
  },
  {
    code: "LAS",
    name: "Harry Reid International Airport",
    city: "Las Vegas",
    country: "United States"
  },
  {
    code: "MCO",
    name: "Orlando International Airport",
    city: "Orlando",
    country: "United States"
  },
  {
    code: "MIA",
    name: "Miami International Airport",
    city: "Miami",
    country: "United States"
  },
  {
    code: "PHX",
    name: "Phoenix Sky Harbor International Airport",
    city: "Phoenix",
    country: "United States"
  },
  {
    code: "EWR",
    name: "Newark Liberty International Airport",
    city: "Newark",
    country: "United States"
  },
  {
    code: "IAH",
    name: "George Bush Intercontinental Airport",
    city: "Houston",
    country: "United States"
  },
  {
    code: "BOS",
    name: "Boston Logan International Airport",
    city: "Boston",
    country: "United States"
  },
  {
    code: "DTW",
    name: "Detroit Metropolitan Wayne County Airport",
    city: "Detroit",
    country: "United States"
  },
  {
    code: "MSP",
    name: "Minneapolis-Saint Paul International Airport",
    city: "Minneapolis",
    country: "United States"
  },
  {
    code: "FLL",
    name: "Fort Lauderdale-Hollywood International Airport",
    city: "Fort Lauderdale",
    country: "United States"
  },
  {
    code: "PHL",
    name: "Philadelphia International Airport",
    city: "Philadelphia",
    country: "United States"
  },
  {
    code: "CLT",
    name: "Charlotte Douglas International Airport",
    city: "Charlotte",
    country: "United States"
  },
  {
    code: "LGA",
    name: "LaGuardia Airport",
    city: "New York",
    country: "United States"
  },
  {
    code: "BWI",
    name: "Baltimore/Washington International Thurgood Marshall Airport",
    city: "Baltimore",
    country: "United States"
  },
  {
    code: "SLC",
    name: "Salt Lake City International Airport",
    city: "Salt Lake City",
    country: "United States"
  },
  {
    code: "SAN",
    name: "San Diego International Airport",
    city: "San Diego",
    country: "United States"
  },
  {
    code: "MDW",
    name: "Chicago Midway International Airport",
    city: "Chicago",
    country: "United States"
  },
  {
    code: "TPA",
    name: "Tampa International Airport",
    city: "Tampa",
    country: "United States"
  },
  {
    code: "PDX",
    name: "Portland International Airport",
    city: "Portland",
    country: "United States"
  },
  {
    code: "HNL",
    name: "Daniel K. Inouye International Airport",
    city: "Honolulu",
    country: "United States"
  },
  {
    code: "DAL",
    name: "Dallas Love Field",
    city: "Dallas",
    country: "United States"
  },
  {
    code: "STL",
    name: "St. Louis Lambert International Airport",
    city: "St. Louis",
    country: "United States"
  },
  // International Airports
  {
    code: "LHR",
    name: "London Heathrow Airport",
    city: "London",
    country: "United Kingdom"
  },
  {
    code: "CDG",
    name: "Paris Charles de Gaulle Airport",
    city: "Paris",
    country: "France"
  },
  {
    code: "FRA",
    name: "Frankfurt Airport",
    city: "Frankfurt",
    country: "Germany"
  },
  {
    code: "AMS",
    name: "Amsterdam Airport Schiphol",
    city: "Amsterdam",
    country: "Netherlands"
  },
  {
    code: "MAD",
    name: "Adolfo Suárez Madrid–Barajas Airport",
    city: "Madrid",
    country: "Spain"
  },
  {
    code: "FCO",
    name: "Leonardo da Vinci–Fiumicino Airport",
    city: "Rome",
    country: "Italy"
  },
  {
    code: "IST",
    name: "Istanbul Airport",
    city: "Istanbul",
    country: "Turkey"
  },
  {
    code: "DXB",
    name: "Dubai International Airport",
    city: "Dubai",
    country: "United Arab Emirates"
  },
  {
    code: "HND",
    name: "Tokyo Haneda Airport",
    city: "Tokyo",
    country: "Japan"
  },
  {
    code: "SYD",
    name: "Sydney Airport",
    city: "Sydney",
    country: "Australia"
  },
  {
    code: "MEX",
    name: "Mexico City International Airport",
    city: "Mexico City",
    country: "Mexico"
  },
  {
    code: "YYZ",
    name: "Toronto Pearson International Airport",
    city: "Toronto",
    country: "Canada"
  },
  {
    code: "GRU",
    name: "São Paulo/Guarulhos International Airport",
    city: "São Paulo",
    country: "Brazil"
  },
  {
    code: "DEL",
    name: "Indira Gandhi International Airport",
    city: "Delhi",
    country: "India"
  },
  {
    code: "CAN",
    name: "Guangzhou Baiyun International Airport",
    city: "Guangzhou",
    country: "China"
  },
  {
    code: "SIN",
    name: "Singapore Changi Airport",
    city: "Singapore",
    country: "Singapore"
  },
  {
    code: "ICN",
    name: "Incheon International Airport",
    city: "Seoul",
    country: "South Korea"
  },
  {
    code: "BKK",
    name: "Suvarnabhumi Airport",
    city: "Bangkok",
    country: "Thailand"
  },
  {
    code: "JNB",
    name: "O. R. Tambo International Airport",
    city: "Johannesburg",
    country: "South Africa"
  },
  {
    code: "CAI",
    name: "Cairo International Airport",
    city: "Cairo",
    country: "Egypt"
  },
  // Indian Airports
  {
    code: "BOM",
    name: "Chhatrapati Shivaji Maharaj International Airport",
    city: "Mumbai",
    country: "India"
  },
  {
    code: "MAA",
    name: "Chennai International Airport",
    city: "Chennai",
    country: "India"
  },
  {
    code: "BLR",
    name: "Kempegowda International Airport",
    city: "Bangalore",
    country: "India"
  },
  {
    code: "HYD",
    name: "Rajiv Gandhi International Airport",
    city: "Hyderabad",
    country: "India"
  },
  {
    code: "CCU",
    name: "Netaji Subhas Chandra Bose International Airport",
    city: "Kolkata",
    country: "India"
  },
  {
    code: "COK",
    name: "Cochin International Airport",
    city: "Kochi",
    country: "India"
  },
  {
    code: "PNQ",
    name: "Pune International Airport",
    city: "Pune",
    country: "India"
  },
  {
    code: "AMD",
    name: "Sardar Vallabhbhai Patel International Airport",
    city: "Ahmedabad",
    country: "India"
  },
  {
    code: "GOI",
    name: "Goa International Airport",
    city: "Goa",
    country: "India"
  },
  {
    code: "JAI",
    name: "Jaipur International Airport",
    city: "Jaipur",
    country: "India"
  },
  {
    code: "LKO",
    name: "Chaudhary Charan Singh International Airport",
    city: "Lucknow",
    country: "India"
  },
  {
    code: "IXC",
    name: "Chandigarh International Airport",
    city: "Chandigarh",
    country: "India"
  },
  {
    code: "IXR",
    name: "Birsa Munda Airport",
    city: "Ranchi",
    country: "India"
  },
  {
    code: "ATQ",
    name: "Sri Guru Ram Dass Jee International Airport",
    city: "Amritsar",
    country: "India"
  },
  {
    code: "PAT",
    name: "Jay Prakash Narayan International Airport",
    city: "Patna",
    country: "India"
  },
  {
    code: "VTZ",
    name: "Visakhapatnam International Airport",
    city: "Visakhapatnam",
    country: "India"
  },
  {
    code: "IDR",
    name: "Devi Ahilya Bai Holkar Airport",
    city: "Indore",
    country: "India"
  },
  {
    code: "TRV",
    name: "Trivandrum International Airport",
    city: "Thiruvananthapuram",
    country: "India"
  },
  {
    code: "IXB",
    name: "Bagdogra International Airport", 
    city: "Siliguri",
    country: "India"
  },
  {
    code: "IXZ",
    name: "Veer Savarkar International Airport",
    city: "Port Blair",
    country: "India"
  }
];

// Function to filter airports based on search text
export function filterAirports(searchText: string): Airport[] {
  // If no search text, show all Indian airports first, then a few popular international airports
  if (!searchText) {
    const indianAirports = airports.filter(airport => airport.country === "India");
    const popularAirports = airports.filter(airport => 
      ["United States", "United Kingdom", "United Arab Emirates", "Singapore"].includes(airport.country)
    ).slice(0, 5);
    
    return [...indianAirports, ...popularAirports].slice(0, 15);
  }
  
  const lowerCaseSearch = searchText.toLowerCase();
  
  // Get matching airports
  const matchingAirports = airports.filter(airport => 
    airport.code.toLowerCase().includes(lowerCaseSearch) ||
    airport.name.toLowerCase().includes(lowerCaseSearch) ||
    airport.city.toLowerCase().includes(lowerCaseSearch) ||
    airport.country.toLowerCase().includes(lowerCaseSearch)
  );
  
  // First, prioritize Indian airports
  const indianAirports = matchingAirports.filter(airport => airport.country === "India");
  const otherAirports = matchingAirports.filter(airport => airport.country !== "India");
  
  // Combine with Indian airports first, then other airports
  return [...indianAirports, ...otherAirports].slice(0, 15); // Increased to 15 results with Indian airports prioritized
}