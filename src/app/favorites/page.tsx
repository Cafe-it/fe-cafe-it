"use client";

import { useState, useEffect } from "react";
import MobileBar from "../../features/ui/MobileBar";
import { getFavorites } from "@/lib/favorites";
import { CafeListItem } from "@/features/ui/CafeListItem";
import { CafeInfoSheet } from "@/features/ui/CafeInfoSheet";
import { CafeResponse } from "../apis/map/useGetCafesQuery";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<CafeResponse[]>([]);
  const [selectedCafe, setSelectedCafe] = useState<CafeResponse | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleCafeClick = (cafe: CafeResponse) => {
    setSelectedCafe(cafe);
    setIsSheetOpen(true);
  };

  return (
    <main className="relative flex flex-col h-screen pb-16">
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-900">Favorites</h1>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {favorites.length > 0 ? (
          <div className="p-4 space-y-3">
            {favorites.map((cafe) => (
              <CafeListItem
                key={cafe.id}
                cafe={cafe}
                onClick={handleCafeClick}
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="mb-6">
              <div className="relative">
                <svg
                  className="w-24 h-24 text-red-400 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                <div
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No favorites yet
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Add your favorite cafes to see them here.
              </p>
            </div>
          </div>
        )}
      </div>
      {selectedCafe && (
        <CafeInfoSheet
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          cafeInfo={selectedCafe}
        />
      )}
      <MobileBar />
    </main>
  );
}
