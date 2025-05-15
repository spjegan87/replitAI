
import { Destination, FlightDeal } from "@/lib/utils";

export const specialOffers: Destination[] = [
  {
    id: 1,
    name: "Cancun",
    dates: "10 Oct 2022 - 18 Oct 2022",
    price: 1200.00,
    image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 2,
    name: "Miami",
    dates: "10 Oct 2022 - 18 Oct 2022",
    price: 580.00,
    image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 3,
    name: "Palm Springs",
    dates: "10 Oct 2022 - 18 Oct 2022",
    price: 680.00,
    image: "https://images.unsplash.com/photo-1540321975033-2fff3a5a3945?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 4,
    name: "Colorado Springs",
    dates: "10 Oct 2022 - 18 Oct 2022",
    price: 787.00,
    image: "https://images.unsplash.com/photo-1596237563267-84ffd99c80e1?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 5,
    name: "San Diego",
    dates: "15 Oct 2022 - 22 Oct 2022",
    price: 649.00,
    image: "https://images.unsplash.com/photo-1538430224529-7eceed6ab252?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 6,
    name: "New Orleans",
    dates: "20 Oct 2022 - 27 Oct 2022",
    price: 562.00,
    image: "https://images.unsplash.com/photo-1571893544028-06b07af6dade?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 7,
    name: "Nashville",
    dates: "18 Oct 2022 - 25 Oct 2022",
    price: 519.00,
    image: "https://images.unsplash.com/photo-1545973392-f1e7b956b827?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 8,
    name: "Las Vegas",
    dates: "22 Oct 2022 - 29 Oct 2022",
    price: 493.00,
    image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=500&h=300&q=80"
  }
];

export const bestFlightDeals: FlightDeal[] = [
  // Domestic Indian Flights
  {
    id: 1,
    destination: "Mumbai",
    price: 149.00,
    origin: "DEL",
    destCode: "BOM",
    date: "15 Dec 2023",
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 2,
    destination: "Bangalore",
    price: 129.00,
    origin: "DEL",
    destCode: "BLR",
    date: "16 Dec 2023",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 3,
    destination: "Chennai",
    price: 159.00,
    origin: "BOM",
    destCode: "MAA",
    date: "17 Dec 2023",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 4,
    destination: "Kolkata",
    price: 179.00,
    origin: "DEL",
    destCode: "CCU",
    date: "18 Dec 2023",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=500&h=300&q=80"
  },
  // International Flights
  {
    id: 5,
    destination: "Dubai",
    price: 850.00,
    origin: "DEL",
    destCode: "DXB",
    date: "20 Dec 2023",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 6,
    destination: "Singapore",
    price: 799.00,
    origin: "BOM",
    destCode: "SIN",
    date: "21 Dec 2023",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 7,
    destination: "London",
    price: 1299.00,
    origin: "DEL",
    destCode: "LHR",
    date: "22 Dec 2023",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 8,
    destination: "Bangkok",
    price: 599.00,
    origin: "BLR",
    destCode: "BKK",
    date: "23 Dec 2023",
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 2,
    destination: "Nassau",
    price: 527.00,
    origin: "MIA",
    destCode: "NAS",
    date: "12 Nov 2022",
    image: "https://images.unsplash.com/photo-1578959668670-c0cd15467370?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 3,
    destination: "Cozumel",
    price: 498.00,
    origin: "HOU",
    destCode: "CZM",
    date: "15 Nov 2022",
    image: "https://images.unsplash.com/photo-1518983835933-5ab1df61bd28?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 4,
    destination: "Oakland",
    price: 129.00,
    origin: "LAS",
    destCode: "OAK",
    date: "10 Nov 2022",
    image: "https://images.unsplash.com/photo-1564428436837-881965f7c12d?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 5,
    destination: "London",
    price: 875.00,
    origin: "JFK",
    destCode: "LHR",
    date: "14 Nov 2022",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 6,
    destination: "Tokyo",
    price: 1250.00,
    origin: "SFO",
    destCode: "HND",
    date: "20 Nov 2022",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 7,
    destination: "Paris",
    price: 899.00,
    origin: "ATL",
    destCode: "CDG",
    date: "16 Nov 2022",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 8,
    destination: "Rome",
    price: 920.00,
    origin: "BOS",
    destCode: "FCO",
    date: "22 Nov 2022",
    image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 9,
    destination: "Sydney",
    price: 1599.00,
    origin: "LAX",
    destCode: "SYD",
    date: "25 Nov 2022",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 10,
    destination: "Dubai",
    price: 1150.00,
    origin: "JFK",
    destCode: "DXB",
    date: "18 Nov 2022",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 11,
    destination: "Bangkok",
    price: 1075.00,
    origin: "SEA",
    destCode: "BKK",
    date: "21 Nov 2022",
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 12,
    destination: "Amsterdam",
    price: 850.00,
    origin: "ORD",
    destCode: "AMS",
    date: "19 Nov 2022",
    image: "https://images.unsplash.com/photo-1584003564911-a5ddfe2dfc2e?auto=format&fit=crop&w=500&h=300&q=80"
  }
];
