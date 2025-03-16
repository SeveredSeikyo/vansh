"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const MapItem = () => {
  const center: LatLngExpression = [17.344601, 78.721873];

  return (
    <MapContainer
      center={center}
      zoom={18}
      style={{ height: "100vh", width: "100%" }}
      minZoom={18}
      maxZoom={19}
    >
      <TileLayer
        url="/vansh/{z}/{x}/{y}.png"
        tileSize={256}
        attribution='&copy; <a href="https://yourcollege.edu">Your College</a>'
        noWrap={true} // Prevents infinite scrolling beyond tile boundaries
      />
    </MapContainer>
  );
};

export default MapItem;

