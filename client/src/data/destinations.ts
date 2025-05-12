import { Destination, FlightDeal } from "@/lib/utils";

export const specialOffers: Destination[] = [
  {
    id: 1,
    name: "Cancun",
    dates: "10 Oct 2022 - 18 Oct 2022",
    price: 1200.00,
    image: "https://images.unsplash.com/photo-1552074284-5e85c037285f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
  },
  {
    id: 2,
    name: "Miami",
    dates: "10 Oct 2022 - 18 Oct 2022",
    price: 580.00,
    image: "https://images.unsplash.com/photo-1503891617560-5b8c2e28cbf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
  },
  {
    id: 3,
    name: "Palm Springs",
    dates: "10 Oct 2022 - 18 Oct 2022",
    price: 680.00,
    image: "https://images.unsplash.com/photo-1517130038641-a774d04afb3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
  },
  {
    id: 4,
    name: "Colorado Springs",
    dates: "10 Oct 2022 - 18 Oct 2022",
    price: 787.00,
    image: "https://images.unsplash.com/photo-1600200202031-4cc203a2567d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
  }
];

export const bestFlightDeals: FlightDeal[] = [
  {
    id: 1,
    destination: "Austria",
    price: 760.00,
    origin: "LAX",
    destCode: "AUX",
    date: "09 Nov 2022",
    image: "https://images.unsplash.com/photo-1516550893885-9857d8feb1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
  },
  {
    id: 2,
    destination: "Bahamas",
    price: 760.00,
    origin: "LAX",
    destCode: "AUX",
    date: "09 Nov 2022",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
  },
  {
    id: 3,
    destination: "Cozumel",
    price: 760.00,
    origin: "LAX",
    destCode: "AUX",
    date: "09 Nov 2022",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
  },
  {
    id: 4,
    destination: "Oakland",
    price: 760.00,
    origin: "LAX",
    destCode: "AUX",
    date: "09 Nov 2022",
    image: "https://images.unsplash.com/photo-1559969143-b2defc6419fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
  }
];
