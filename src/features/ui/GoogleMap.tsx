"use client";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";

interface Cafe {
  id: string;
  name: string;
  address: string;
  position: {
    lat: number;
    lng: number;
  };
  availableSeats: number;
  totalSeats: number;
}

interface GoogleMapProps {
  cafes: Cafe[];
}

const GoogleMapComponent = ({ cafes }: GoogleMapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

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
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const containerStyle = useMemo(
    () => ({
      width: "100%",
      height: "100%",
    }),
    []
  );

  if (locationError) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-800">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-sm mx-auto">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="mt-4 text-xl font-semibold">
            위치 권한을 허용해주세요
          </h2>
          <p className="mt-2 text-gray-600">
            주변 카페 정보를 표시하려면 위치 정보 접근 권한이 필요합니다.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            브라우저 주소창의 자물쇠(🔒) 아이콘을 클릭하여
            <br />
            <strong>위치</strong> 권한을 <strong>'허용'</strong>으로 변경한 후
            페이지를 새로고침 해주세요.
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        지도 로딩 중...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        currentLocation || {
          lat: 37.5665,
          lng: 126.978,
        }
      }
      zoom={15}
    >
      {cafes.map((cafe) => (
        <Marker
          key={cafe.id}
          position={cafe.position}
          onClick={() => setSelectedCafe(cafe)}
        />
      ))}

      {selectedCafe && (
        <InfoWindow
          position={selectedCafe.position}
          onCloseClick={() => setSelectedCafe(null)}
        >
          <div>
            <h3>{selectedCafe.name}</h3>
            <p>{selectedCafe.address}</p>
            <p>
              {selectedCafe.availableSeats} / {selectedCafe.totalSeats}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
