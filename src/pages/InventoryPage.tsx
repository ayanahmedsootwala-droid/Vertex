import React, { useState } from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useCars } from '@/hooks/useCars';
import { CarCard } from '@/components/cars/CarCard';
import { Button } from '@/components/ui/button';

const InventoryPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { cars, total, loading } = useCars({}, page);
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());
  
  const pageSize = 12;
  const totalPages = Math.ceil(total / pageSize);

  const handleWishlistToggle = (carId: string, added: boolean) => {
    const newSet = new Set(wishlistedIds);
    if (added) newSet.add(carId);
    else newSet.delete(carId);
    setWishlistedIds(newSet);
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2">Our Inventory</h1>
        <p className="text-slate-600 mb-8">Browse all {total} vehicles in our collection</p>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p className="text-lg">No vehicles found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  wishlistedIds={wishlistedIds}
                  onWishlistToggle={handleWishlistToggle}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  variant="outline"
                >
                  Previous
                </Button>
                <span className="flex items-center gap-2">
                  Page {page} of {totalPages}
                </span>
                <Button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </PublicLayout>
  );
};

export default InventoryPage;
