import { Card, CardContent } from "@/components/ui/card";
import { specialOffers } from "@/data/destinations";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function SpecialOffers() {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-sw-gray-900">Special Offers</h2>
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
        {specialOffers.map((offer) => (
          <Card key={offer.id} className="overflow-hidden rounded-lg shadow-md">
            <img 
              src={offer.image} 
              alt={`${offer.name} destination`} 
              className="w-full h-36 object-cover" 
            />
            <CardContent className="p-4">
              <h3 className="font-bold text-sw-gray-800">{offer.name}</h3>
              <div className="text-sm text-sw-gray-600 mb-2">{offer.dates}</div>
              <div className="text-sm text-sw-gray-600 mb-1">Economy From</div>
              <div className="text-lg font-bold text-sw-gray-900">{formatPrice(offer.price)}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
