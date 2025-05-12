import { Destination, FlightDeal } from "@/lib/utils";

export const specialOffers: Destination[] = [
  {
    id: 1,
    name: "Cancun",
    dates: "10 Oct 2022 - 18 Oct 2022",
    price: 1200.00,
    image: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
  },
  {
    id: 2,
    name: "Miami",
    dates: "10 Oct 2022 - 18 Oct 2022",
    price: 580.00,
    image: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
  },
  {
    id: 3,
    name: "Palm Springs",
    dates: "10 Oct 2022 - 18 Oct 2022",
    price: 680.00,
    image: "https://images.unsplash.com/photo-1540321975033-2fff3a5a3945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
  },
  {
    id: 4,
    name: "Colorado Springs",
    dates: "10 Oct 2022 - 18 Oct 2022",
    price: 787.00,
    image: "https://images.unsplash.com/photo-1613238630880-302ab7a166a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
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
    image: "https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
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
    image: "https://images.unsplash.com/photo-1532229497005-065a037fce77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
  },
  {
    id: 4,
    destination: "Oakland",
    price: 760.00,
    origin: "LAX",
    destCode: "AUX",
    date: "09 Nov 2022",
    image: "https://images.unsplash.com/photo-1464750337353-12e37b0bf0fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
  }
];
