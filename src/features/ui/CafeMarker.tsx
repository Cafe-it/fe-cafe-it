"use client";

import { OverlayView } from "@react-google-maps/api";
import Image from "next/image";

interface CafeInfo {
  id: string;
  name: string;
  availableSeats: number;
  totalSeats: number;
  distance?: string;
}

interface CafeMarkerProps {
  position: { lat: number; lng: number };
  cafeInfo: CafeInfo;
  onMarkerClick: (cafeInfo: CafeInfo) => void;
}

const CafeMarker = ({ position, cafeInfo, onMarkerClick }: CafeMarkerProps) => {
  const handleMarkerClick = () => {
    onMarkerClick(cafeInfo);
  };

  const getPixelPositionOffset = (width: number, height: number) => ({
    x: -(width / 2),
    y: -height, // Adjust y-offset so that the bottom end of the icon matches the coordinates
  });

  return (
    <>
      <OverlayView
        position={position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <div className="cafe-marker cursor-pointer" onClick={handleMarkerClick}>
          <Image
            src="/icon/pin.svg"
            alt="Cafe Marker"
            className="w-8 h-8"
            width={40}
            height={40}
          />
        </div>
      </OverlayView>
    </>
  );
};

export default CafeMarker;
