"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useMemo, useState, useCallback } from "react";
import CafeMarker from "./CafeMarker";

export interface Cafe {
  id: string;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  availableSeats: number;
  totalSeats: number;
  isManualMonitoring?: boolean;
}

export interface Bounds {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
}

interface GoogleMapProps {
  cafes: Cafe[];
  initialCenter: {
    lat: number;
    lng: number;
  };
  onBoundsChange: (bounds: Bounds) => void;
}

const GoogleMapComponent = ({
  cafes,
  initialCenter,
  onBoundsChange,
}: GoogleMapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const containerStyle = useMemo(
    () => ({
      width: "100%",
      height: "100%",
    }),
    []
  );

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const onIdle = () => {
    if (map) {
      const bounds = map.getBounds();
      if (bounds) {
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        onBoundsChange({
          neLat: ne.lat(),
          neLng: ne.lng(),
          swLat: sw.lat(),
          swLng: sw.lng(),
        });
      }
    }
  };

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
      onLoad={onLoad}
      onUnmount={onUnmount}
      onIdle={onIdle}
    >
      {cafes.map((cafe) => (
        <CafeMarker key={cafe.id} position={cafe.position} cafeInfo={cafe} />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
