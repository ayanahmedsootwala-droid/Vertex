import React, { useState } from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useCars } from '@/hooks/useCars';
import { CarCard } from '@/components/cars/CarCard';

const HomePage: React.FC = () => {
  const { cars, loading, error } = useCars({}, 1);
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());

  const handleWishlistToggle = (carId: string, added: boolean) => {
    const newSet = new Set(wishlistedIds);
    if (added) newSet.add(carId);
    else newSet.delete(carId);
    setWishlistedIds(newSet);
  };

  return (
    <PublicLayout>
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-4">Find Your Perfect Car</h1>
              <p className="text-xl text-slate-300 mb-8">Browse our extensive inventory of vehicles from trusted sellers</p>
            </div>
          </div>
        </section>

        {/* Featured Cars Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Featured Vehicles</h2>
            
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                <p className="font-semibold">Unable to load vehicles</p>
                <p className="text-sm mt-1">{error}</p>
                <p className="text-sm mt-2">Make sure your Supabase credentials are correctly set in the .env file and the cars table has data with status='active'.</p>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <p className="text-lg">No vehicles available yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.slice(0, 12).map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    wishlistedIds={wishlistedIds}
                    onWishlistToggle={handleWishlistToggle}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default HomePage;
