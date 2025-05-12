import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Destination = {
  id: number;
  name: string;
  dates: string;
  price: number;
  image: string;
};

export type FlightDeal = {
  id: number;
  destination: string;
  price: number;
  origin: string;
  destCode: string;
  date: string;
  image: string;
};

// Format price as currency (USD)
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price);
}
