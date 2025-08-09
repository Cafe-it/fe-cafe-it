"use client";

import { useState, useEffect, useMemo } from "react";
import MobileBar from "@/features/ui/MobileBar";
import GoogleMapComponent from "@/features/ui/GoogleMap";
import { useGetCafesQuery } from "../apis/map/useGetCafesQuery";
import CafeList from "./(components)/CafeList";

export default function MapPage() {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // 1. 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError(
            "위치 정보 접근이 거부되었습니다. 브라우저 설정을 확인해주세요."
          );
          console.error("Error getting current location: ", error);
        }
      );
    } else {
      setLocationError("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
  }, []);

  // 2. 현재 위치를 기반으로 카페 데이터 API 호출
  const {
    data: cafesData,
    isLoading,
    isError,
    error,
  } = useGetCafesQuery(
    {
      lat: currentLocation?.lat ?? 0,
      lng: currentLocation?.lng ?? 0,
      radius: 20,
    },
    { enabled: !!currentLocation } // 현재 위치가 있을 때만 쿼리 실행
  );

  // 3. 지도 컴포넌트에 전달할 데이터 형태로 가공
  const mapCafes = useMemo(() => {
    if (!cafesData?.data) return [];
    return cafesData.data.map((cafe) => ({
      ...cafe,
      position: { lat: cafe.lat, lng: cafe.lng },
    }));
  }, [cafesData]);

  // 로딩 및 에러 상태 처리
  if (locationError) {
    return <div>{locationError}</div>; // 위치 정보 에러 UI는 GoogleMapComponent에서 처리해도 됨
  }

  if (!currentLocation) {
    return <div>현재 위치를 가져오는 중입니다...</div>;
  }

  if (isLoading) {
    return <div>주변 카페 정보를 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <main className="relative flex flex-col h-screen pb-16">
      <div className="flex-1 relative">
        <GoogleMapComponent cafes={mapCafes} initialCenter={currentLocation} />
      </div>

      <CafeList cafes={mapCafes} />

      <MobileBar />
    </main>
  );
}
