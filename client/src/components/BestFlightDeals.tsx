import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { bestFlightDeals } from "@/data/destinations";
import { ChevronLeft, ChevronRight, ArrowRight, Plane } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function BestFlightDeals() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;
  const maxPage = Math.ceil(bestFlightDeals.length / itemsPerPage) - 1;
  
  const visibleDeals = bestFlightDeals.slice(
    page * itemsPerPage, 
    page * itemsPerPage + itemsPerPage
  );
  
  const nextPage = () => {
    setPage(prev => Math.min(prev + 1, maxPage));
  };
  
  const prevPage = () => {
    setPage(prev => Math.max(prev - 1, 0));
  };
  
  // Filter domestic and international flights
  const domesticFlights = bestFlightDeals.filter(
    deal => deal.price < 500 || (deal.origin.length === 3 && deal.destCode.length === 3)
  );
  
  const internationalFlights = bestFlightDeals.filter(
    deal => deal.price >= 500 && !(deal.origin.length === 3 && deal.destCode.length === 3)
  );
  
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-medium text-sw-gray-900">Best Flight Deals Of The Day</h2>
          <p className="text-sm text-sw-gray-600 mt-1">
            {bestFlightDeals.length} destinations with exclusive prices
          </p>
        </div>
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
        {visibleDeals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-36 overflow-hidden">
              <img 
                src={deal.image} 
                alt={`${deal.destination} view`} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" 
              />
              {deal.price < 500 ? (
                <Badge className="absolute top-2 right-2 bg-green-500 text-white">Domestic</Badge>
              ) : (
                <Badge className="absolute top-2 right-2 bg-blue-500 text-white">International</Badge>
              )}
            </div>
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
              <div className="flex items-center justify-between">
                <div className="text-sm text-sw-gray-600">{deal.date}</div>
                <div className="text-xs text-green-500 flex items-center">
                  <Plane className="h-3 w-3 mr-1" />
                  Nonstop
                </div>
              </div>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <h3 className="text-lg font-medium text-sw-gray-800 mb-3 border-b pb-2">Domestic Flight Deals</h3>
          <div className="space-y-2">
            {domesticFlights.slice(0, 5).map(deal => (
              <div key={`domestic-${deal.id}`} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <div className="font-medium">{deal.destination}</div>
                  <div className="text-xs text-sw-gray-500">From {deal.origin}</div>
                </div>
                <div className="text-sw-blue font-bold">{formatPrice(deal.price)}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-sw-gray-800 mb-3 border-b pb-2">International Flight Deals</h3>
          <div className="space-y-2">
            {internationalFlights.slice(0, 5).map(deal => (
              <div key={`international-${deal.id}`} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <div className="font-medium">{deal.destination}</div>
                  <div className="text-xs text-sw-gray-500">From {deal.origin}</div>
                </div>
                <div className="text-sw-blue font-bold">{formatPrice(deal.price)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
