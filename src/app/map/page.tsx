"use client";

import { useState, useEffect } from "react";
import MobileBar from "@/features/ui/MobileBar";
import GoogleMapComponent from "@/features/ui/GoogleMap";
import { CafeInfoSheet } from "@/features/ui/CafeInfoSheet";

// 초기 샘플 카페 데이터
const initialCafes = [
  {
    id: "1",
    name: "스타벅스 강남점",
    address: "서울 강남구 강남대로 123",
    position: { lat: 37.5665, lng: 126.978 },
    availableSeats: 5,
    totalSeats: 20,
  },
  // ... (다른 카페 데이터는 생략)
];

export default function MapPage() {
  const [cafes, setCafes] = useState(initialCafes);

  useEffect(() => {
    const interval = setInterval(() => {
      setCafes((currentCafes) =>
        currentCafes.map((cafe) => ({
          ...cafe,
          availableSeats: Math.floor(Math.random() * (cafe.totalSeats + 1)),
        }))
      );
    }, 10000); // 10초마다 데이터 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  return (
    <main className="relative flex flex-col h-screen pb-16">
      {/* 지도 섹션 */}
      <div className="flex-1 relative">
        <GoogleMapComponent cafes={cafes} />
      </div>

      {/* 하단 카페 리스트 */}
      <div className="bg-white border-t border-gray-200 p-4 max-h-64 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          주변 카페 현황
        </h3>
        <div className="space-y-3">
          {cafes.map((cafe) => (
            <div
              key={cafe.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{cafe.name}</p>
                <p className="text-xs text-gray-500">{cafe.address}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-medium ${
                    cafe.availableSeats > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {cafe.availableSeats > 0 ? "자리 있음" : "자리 없음"}
                </p>
                <p className="text-xs text-gray-500">
                  {cafe.availableSeats}/{cafe.totalSeats}석
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MobileBar />
    </main>
  );
}
