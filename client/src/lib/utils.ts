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

// Format price as currency (INR)
export function formatPrice(price: number): string {
  // Convert USD to INR (approximate exchange rate)
  const inrPrice = price * 83; // 1 USD ≈ 83 INR
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0 // No decimal places for INR
  }).format(inrPrice);
}
