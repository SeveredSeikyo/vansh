"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import L from "leaflet";

// Custom icon setup
const customIcon = icon({
  iconUrl: "/location-info.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface Props {
  isSatView: boolean;
}

const locationNames=[
  "University location",
  "Vansh Stalls",
  "Cricket Ground",
  "Open Air Auditorium and Seminar Hall",
  "VITS cafeteria",
  "Vignan Tree",
  "Vignan Canteen",
  "Volley Ball Court",
  "Main Stage Entrance point",
  "Library Front area"
]

const MapItem = ({ isSatView }: Props) => {
  const mapRef = useRef<L.Map | null>(null);

  const center: LatLngExpression = [17.344167, 78.721544];
  const locations: LatLngExpression[] = [
    [17.342542, 78.716793],
    [17.343191, 78.717272],
    [17.343396, 78.718243],
    [17.344725,78.721860],
    [17.343896,78.721549],
    [17.344351,78.722721],
    [17.343549,78.723839],
    [17.343354,78.719422],
    [17.343736,78.716840],
    [17.344260,78.722180]
  ];

  return (
    <MapContainer
      center={center}
      zoom={18}
      style={{ height: "100%", width: "100%" }}
      minZoom={18}
      maxZoom={19}
      zoomControl={false}
      ref={(map) => {
        if (map) {
          mapRef.current = map;
          (window as unknown as { map: L.Map }).map = map;
        }
      }}
    >
      {/* Normal View */}
      {!isSatView && (
        <TileLayer
          url="/vansh/{z}/{x}/{y}.png"
          tileSize={256}
          attribution='&copy; <a href="https://vignanits.ac.in">Vignan Institute of Technology and Science</a>'
          noWrap={true}
        />
      )}

      {/* Satellite View */}
      {isSatView && (
        <TileLayer
          url="/vansh-satview/{z}/{x}/{y}.png"
          tileSize={256}
          attribution='&copy; <a href="https://vignanits.ac.in">Vignan Institute of Technology and Science</a>'
          noWrap={true}
        />
      )}

      {/* Markers (Persist across views) */}
      {locations.map((position, idx) => (
        <Marker key={idx} position={position} icon={customIcon}>
          <Popup>
            {locationNames[idx]} {/* Display corresponding location name */}
            <br />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapItem;
