"use client";

import { useState } from "react";
import NaverMap from "../components/NaverMap";
import CafeMarker from "../components/CafeMarker";

// 샘플 카페 데이터
const sampleCafes = [
  {
    id: 1,
    name: "스타벅스 강남점",
    address: "서울 강남구 강남대로 123",
    position: { lat: 37.5665, lng: 126.978 },
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 2,
    name: "투썸플레이스 홍대점",
    address: "서울 마포구 홍대로 456",
    position: { lat: 37.5575, lng: 126.925 },
    availableSeats: 0,
    totalSeats: 15,
  },
  {
    id: 3,
    name: "할리스 커피 신촌점",
    address: "서울 서대문구 신촌로 789",
    position: { lat: 37.5595, lng: 126.943 },
    availableSeats: 8,
    totalSeats: 25,
  },
];

export default function Home() {
  const [mapInstance, setMapInstance] = useState<any>(null);

  const handleMapLoad = (map: any) => {
    setMapInstance(map);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <h1 className="text-lg font-semibold text-gray-900">Cafe-it</h1>
      </header>

      <main className="flex flex-col h-screen">
        {/* 지도 섹션 */}
        <div className="flex-1 relative">
          <NaverMap
            center={{ lat: 37.5665, lng: 126.978 }}
            zoom={12}
            className="w-full h-full"
            onMapLoad={handleMapLoad}
          />

          {/* 카페 마커들 */}
          {mapInstance &&
            sampleCafes.map((cafe) => (
              <CafeMarker
                key={cafe.id}
                map={mapInstance}
                position={cafe.position}
                cafeInfo={{
                  name: cafe.name,
                  address: cafe.address,
                  availableSeats: cafe.availableSeats,
                  totalSeats: cafe.totalSeats,
                }}
              />
            ))}
        </div>

        {/* 하단 카페 리스트 */}
        <div className="bg-white border-t border-gray-200 p-4 max-h-64 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            주변 카페 현황
          </h3>
          <div className="space-y-3">
            {sampleCafes.map((cafe) => (
              <div
                key={cafe.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {cafe.name}
                  </p>
                  <p className="text-xs text-gray-500">{cafe.address}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${
                      cafe.availableSeats > 0
                        ? "text-green-600"
                        : "text-red-600"
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
      </main>
    </>
  );
}
