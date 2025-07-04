"use client";

import { useEffect, useRef } from "react";

interface CafeMarkerProps {
  map: any;
  position: { lat: number; lng: number };
  cafeInfo: {
    name: string;
    address: string;
    availableSeats: number;
    totalSeats: number;
  };
}

export default function CafeMarker({
  map,
  position,
  cafeInfo,
}: CafeMarkerProps) {
  const markerRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);

  useEffect(() => {
    if (!map || !window.naver) return;

    // 마커 생성
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(position.lat, position.lng),
      map: map,
      icon: {
        content: `
          <div class="cafe-marker" style="
            background: ${cafeInfo.availableSeats > 0 ? "#10B981" : "#EF4444"};
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            white-space: nowrap;
          ">
            ${cafeInfo.availableSeats > 0 ? "자리있음" : "자리없음"}
          </div>
        `,
        size: new window.naver.maps.Size(80, 30),
        anchor: new window.naver.maps.Point(40, 15),
      },
    });

    // 정보창 생성
    const infoWindow = new window.naver.maps.InfoWindow({
      content: `
        <div style="padding: 10px; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1F2937;">
            ${cafeInfo.name}
          </h3>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #6B7280;">
            ${cafeInfo.address}
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; font-weight: bold; color: ${
              cafeInfo.availableSeats > 0 ? "#10B981" : "#EF4444"
            };">
              ${cafeInfo.availableSeats > 0 ? "자리 있음" : "자리 없음"}
            </span>
            <span style="font-size: 12px; color: #6B7280;">
              ${cafeInfo.availableSeats}/${cafeInfo.totalSeats}석
            </span>
          </div>
        </div>
      `,
      borderWidth: 0,
      backgroundColor: "white",
      borderRadius: 8,
      anchorSize: new window.naver.maps.Size(10, 10),
      anchorColor: "white",
    });

    // 마커 클릭 이벤트
    window.naver.maps.Event.addListener(marker, "click", () => {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    });

    markerRef.current = marker;
    infoWindowRef.current = infoWindow;

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
    };
  }, [map, position, cafeInfo]);

  return null;
}
