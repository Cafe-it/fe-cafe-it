"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import MobileBar from "@/features/ui/MobileBar";
import GoogleMapComponent, { Bounds } from "@/features/ui/GoogleMap";
import { useGetCafesQuery } from "../apis/map/useGetCafesQuery";
import CafeList from "./(components)/CafeList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import Image from "next/image";
import { throttle } from "lodash";
import { motion } from "framer-motion";
import LoadingDots from "./(components)/LoadingDot";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/shared/ui/button";

// Haversine formula to calculate distance between two points
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// Normalize functions for caching
const normalizeCoord = (coord: number) => Math.round(coord * 1000) / 1000; // ~111m precision
const normalizeRadius = (radius: number) => Math.round(radius / 0.1) * 0.1; // 100m steps

export default function MapPage() {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<{
    lat: number;
    lng: number;
    radius: number;
  } | null>(null);

  // 1. 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const initialLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(initialLocation);
          // 초기 검색 파라미터 설정 (기본 반경 1km)
          setSearchParams({ ...initialLocation, radius: 1 });
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

  // 2. 검색 파라미터를 기반으로 카페 데이터 API 호출
  const {
    data: cafesData,
    isLoading,
    isError,
  } = useGetCafesQuery(
    {
      lat: searchParams?.lat ?? 0,
      lng: searchParams?.lng ?? 0,
      radius: searchParams?.radius ?? 0,
    },
    {
      enabled: !!searchParams,
    }
  );

  // 3. 지도 컴포넌트에 전달할 데이터 형태로 가공
  const mapCafes = useMemo(() => {
    if (!cafesData?.data) return [];
    return cafesData.data.map((cafe) => ({
      ...cafe,
      position: { lat: cafe.lat, lng: cafe.lng },
    }));
  }, [cafesData]);

  const handleBoundsChange = useCallback((bounds: Bounds) => {
    const centerLat = (bounds.neLat + bounds.swLat) / 2;
    const centerLng = (bounds.neLng + bounds.swLng) / 2;
    const radius = getDistance(
      centerLat,
      centerLng,
      bounds.neLat,
      bounds.neLng
    );

    const normalizedLat = normalizeCoord(centerLat);
    const normalizedLng = normalizeCoord(centerLng);
    const normalizedRadius = normalizeRadius(Math.max(radius, 0.1)); // 최소 반경 100m

    setSearchParams({
      lat: normalizedLat,
      lng: normalizedLng,
      radius: normalizedRadius,
    });
  }, []);

  // Throttled 함수 생성
  const throttledBoundsChange = useMemo(
    () => throttle(handleBoundsChange, 1000),
    [handleBoundsChange]
  );

  if (locationError) {
    return <div>{locationError}</div>;
  }

  if (!currentLocation) {
    return <div>현재 위치를 가져오는 중입니다...</div>;
  }

  return (
    <main className="relative flex flex-col h-screen pb-16">
      <div className="flex-1 relative">
        <GoogleMapComponent
          cafes={mapCafes}
          initialCenter={currentLocation}
          onBoundsChange={throttledBoundsChange}
        />
      </div>

      <div className="min-h-[30vh] overflow-y-auto p-4">
        {isLoading ? (
          <LoadingDots />
        ) : isError ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4 p-8">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                데이터를 불러올 수 없습니다
              </h3>
              <p className="text-sm text-gray-500 max-w-xs">
                잠시 후 다시 시도해주세요
              </p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>다시 시도</span>
            </Button>
          </div>
        ) : (
          <CafeList cafes={mapCafes} />
        )}
      </div>

      <MobileBar />
    </main>
  );
}
