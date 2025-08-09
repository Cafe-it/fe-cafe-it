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
          console.error("Error getting current location: ", error);
          // 기본 위치로 설정
          setCurrentLocation({
            lat: 37.5665,
            lng: 126.978,
          });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // 기본 위치로 설정
      setCurrentLocation({
        lat: 37.5665,
        lng: 126.978,
      });
    }
  }, []);

  const containerStyle = useMemo(
    () => ({
      width: "100%",
      height: "100vh",
    }),
    []
  );

  return isLoaded && currentLocation ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
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
  ) : (
    <div>Loading...</div>
  );
};

export default GoogleMapComponent;
