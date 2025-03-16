"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import L from "leaflet";
import { useEffect, useState } from "react";
import GeoRaster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";

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

const MapItem = ({ isSatView }: Props) => {
  const mapRef = useRef<L.Map | null>(null);
  const [rasterLayer, setRasterLayer] = useState<L.Layer | null>(null);

  const center: LatLngExpression = [17.344167, 78.721544];
  const locations: LatLngExpression[] = [
    [17.343911, 78.721544],
    [17.344505, 78.718736],
    [17.344167, 78.722445],
  ];

  useEffect(() => {
    if (isSatView) {
      const loadGeoTIFF = async () => {
        if (rasterLayer && mapRef.current) {
          mapRef.current.removeLayer(rasterLayer);
        }

        const response = await fetch("/vansh-satview.tiff");
        const arrayBuffer = await response.arrayBuffer();

        const georaster = await GeoRaster(arrayBuffer);

        const layer = new GeoRasterLayer({
          georaster,
          opacity: 0.7,
          resolution: 256,
        });

        if (mapRef.current) {
          layer.addTo(mapRef.current);
          setRasterLayer(layer); // Store the layer for future removal
        }
      };

      loadGeoTIFF();
    } else {
      // Remove raster layer when switching to normal view
      if (rasterLayer && mapRef.current) {
        mapRef.current.removeLayer(rasterLayer);
        setRasterLayer(null);
      }
    }
  }, [isSatView]);

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

      {/* Markers (Persist across views) */}
      {locations.map((position, idx) => {
        const [lat, lng] = position as [number, number];
        return (
          <Marker key={idx} position={position} icon={customIcon}>
            <Popup>
              Location {idx + 1} <br /> {lat}, {lng}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapItem;
