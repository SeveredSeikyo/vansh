"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Marker locations
const markerPositions: LatLngExpression[] = [
  [17.343911, 78.721544], // Location 1
  [17.344505, 78.718736], // Location 2
  [17.344167, 78.722445], // Location 3
];

const CollegeMap = () => {
  const center: LatLngExpression = [17.344167, 78.721544]; // Center map around middle location

  // Custom Marker Icon
  const customIcon = new Icon({
    iconUrl: "/location-info.png", // Path to your icon
    iconSize: [40, 40], // Size of the icon
    iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -40], // Position of popup relative to the icon
  });

  return (
    <MapContainer
      center={center}
      zoom={18}
      style={{ height: "85vh", width: "100%" }}
      minZoom={18}
      maxZoom={18}
    >
      {/* Tile Layer */}
      <TileLayer
        url="/vansh/{z}/{x}/{y}.png"
        tileSize={256}
        attribution='&copy; <a href="https://vignanits.ac.in">Vignan Institute of Technology and Science</a>'
        noWrap={true}
      />

      {/* Render Custom Markers */}
      {markerPositions.map((position, index) => (
        <Marker key={index} position={position} icon={customIcon}>
          <Popup>
            📍 Marker {index + 1}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CollegeMap;
