import { Card, CardContent } from "@/components/ui/card";
import { bestFlightDeals } from "@/data/destinations";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function BestFlightDeals() {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-sw-gray-900">Best Flight Deals Of The Day</h2>
        <div className="flex space-x-2">
          <button className="w-8 h-8 rounded-full bg-white border border-sw-gray-300 flex items-center justify-center">
            <ChevronLeft className="h-4 w-4 text-sw-gray-400" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white border border-sw-gray-300 flex items-center justify-center">
            <ChevronRight className="h-4 w-4 text-sw-blue" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bestFlightDeals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden rounded-lg shadow-md">
            <img 
              src={deal.image} 
              alt={`${deal.destination} view`} 
              className="w-full h-36 object-cover" 
            />
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-sw-gray-800">{deal.destination}</h3>
                <div className="text-sm font-bold text-sw-blue">From {formatPrice(deal.price)}</div>
              </div>
              <div className="flex items-center text-sm text-sw-gray-600 mb-2">
                <div>{deal.origin}</div>
                <ArrowRight className="h-3 w-3 mx-2" />
                <div>{deal.destCode}</div>
              </div>
              <div className="text-sm text-sw-gray-600">{deal.date}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
