"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";
import CafeMarker from "./CafeMarker";

interface Cafe {
  id: string;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  availableSeats: number;
  totalSeats: number;
}

interface GoogleMapProps {
  cafes: Cafe[];
  initialCenter: {
    lat: number;
    lng: number;
  };
}

const GoogleMapComponent = ({ cafes, initialCenter }: GoogleMapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const containerStyle = useMemo(
    () => ({
      width: "100%",
      height: "100%",
    }),
    []
  );

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
      center={initialCenter}
      zoom={15}
      options={{ disableDefaultUI: true }}
    >
      {cafes.map((cafe) => (
        <CafeMarker key={cafe.id} position={cafe.position} cafeInfo={cafe} />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
