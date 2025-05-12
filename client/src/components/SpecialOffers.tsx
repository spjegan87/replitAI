import { Card, CardContent } from "@/components/ui/card";
import { specialOffers } from "@/data/destinations";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

import { useState } from "react";

export default function SpecialOffers() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;
  const maxPage = Math.ceil(specialOffers.length / itemsPerPage) - 1;
  
  const visibleOffers = specialOffers.slice(
    page * itemsPerPage, 
    page * itemsPerPage + itemsPerPage
  );
  
  const nextPage = () => {
    setPage(prev => Math.min(prev + 1, maxPage));
  };
  
  const prevPage = () => {
    setPage(prev => Math.max(prev - 1, 0));
  };
  
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-sw-gray-900">Special Offers</h2>
        <div className="flex space-x-2">
          <button 
            className={`w-8 h-8 rounded-full bg-white border border-sw-gray-300 flex items-center justify-center ${page === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-sw-blue'}`}
            onClick={prevPage}
            disabled={page === 0}
          >
            <ChevronLeft className={`h-4 w-4 ${page === 0 ? 'text-sw-gray-400' : 'text-sw-blue'}`} />
          </button>
          <button 
            className={`w-8 h-8 rounded-full bg-white border border-sw-gray-300 flex items-center justify-center ${page >= maxPage ? 'opacity-50 cursor-not-allowed' : 'hover:border-sw-blue'}`}
            onClick={nextPage}
            disabled={page >= maxPage}
          >
            <ChevronRight className={`h-4 w-4 ${page >= maxPage ? 'text-sw-gray-400' : 'text-sw-blue'}`} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleOffers.map((offer) => (
          <Card key={offer.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-36 overflow-hidden">
              <img 
                src={offer.image} 
                alt={`${offer.name} destination`} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-sw-gray-800">{offer.name}</h3>
              <div className="text-sm text-sw-gray-600 mb-2">{offer.dates}</div>
              <div className="text-sm text-sw-gray-600 mb-1">Economy From</div>
              <div className="text-lg font-bold text-sw-gray-900">{formatPrice(offer.price)}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <div className="flex space-x-1">
          {Array.from({ length: maxPage + 1 }).map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full ${idx === page ? 'bg-sw-blue' : 'bg-sw-gray-300'}`}
              onClick={() => setPage(idx)}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
