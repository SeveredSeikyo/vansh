// "use client"

// import { useEffect, useState, useRef } from "react";

// type MapItemProps = {
//     isSatView: boolean;
//     isHelpDes: boolean;
//     setIsHelpDes: React.Dispatch<React.SetStateAction<boolean>>; // Function to reset help desk state
// };

// // Original dimensions for both images
// const customeOriginalSize = { width: 1712, height: 941 };
// const satOriginalSize = { width: 1184, height: 671 };

// // Help desk data
// const helpDeskList = [
//     { id: 0, index: 0, type: "satview", description: "Help Desk 1" },
//     { id: 1, index: 1, type: "satview", description: "Help Desk 2" },
//     { id: 2, index: 2, type: "satview", description: "Help Desk 3" },
//     { id: 3, index: 0, type: "customview", description: "Help Desk 1" },
//     { id: 4, index: 1, type: "customview", description: "Help Desk 2" },
//     { id: 5, index: 2, type: "customview", description: "Help Desk 3" },
//     { id: 6, index: 3, type: "customview", description: "Help Desk 4" },
// ];

// const MapItem = ({ isSatView, isHelpDes, setIsHelpDes }: MapItemProps) => {
//     const [customScaledCoords, setCustomScaledCoords] = useState<string[]>([]);
//     const [satScaledCoords, setSatScaledCoords] = useState<string[]>([]);
//     const [selectedHelpDesk, setSelectedHelpDesk] = useState<string>(""); // State to store the selected help desk description
//     const imgRef = useRef<HTMLImageElement | null>(null);

//     // Coordinates for each view
//     const customeOriginalCoords = [
//         [488, 443, 445, 379], // Area 1
//         [701, 588, 743, 649], // Area 2
//         [1003, 657, 1048, 716], // Area 3
//         [1192, 493, 1248, 567], // Area 4
//     ];

//     const satOriginalCoords = [
//         [607, 488, 575, 445], // Area 1
//         [871, 397, 911, 447], // Area 2
//         [998, 322, 1031, 380], // Area 3
//     ];

//     // Function to scale coordinates based on image dimensions
//     useEffect(() => {
//         const updateCoords = () => {
//             if (imgRef.current) {
//                 const imgWidth = imgRef.current.width;
//                 const imgHeight = imgRef.current.height;

//                 if (isSatView) {
//                     const newCoords = satOriginalCoords.map((coord) =>
//                         coord.map((value, index) =>
//                             index % 2 === 0
//                                 ? Math.round((value * imgWidth) / satOriginalSize.width)
//                                 : Math.round((value * imgHeight) / satOriginalSize.height)
//                         ).join(",")
//                     );
//                     setSatScaledCoords(newCoords);
//                 } else {
//                     const newCoords = customeOriginalCoords.map((coord) =>
//                         coord.map((value, index) =>
//                             index % 2 === 0
//                                 ? Math.round((value * imgWidth) / customeOriginalSize.width)
//                                 : Math.round((value * imgHeight) / customeOriginalSize.height)
//                         ).join(",")
//                     );
//                     setCustomScaledCoords(newCoords);
//                 }
//             }
//         };

//         window.addEventListener("resize", updateCoords);
//         updateCoords(); // Call on mount

//         return () => window.removeEventListener("resize", updateCoords);
//     }, [isSatView]); // Recalculate when the view changes

//     // Function to handle click on the map area
//     const targetFunction = (event: React.MouseEvent, index: number, viewType: string) => {
//         // Find the corresponding help desk entry based on index and viewType
//         setIsHelpDes(true); // Ensure help desk details are visible
//         const helpDesk = helpDeskList.find(
//             (desk) => desk.index === index && desk.type === viewType
//         );

//         // If a corresponding help desk is found, update the state to display its description
//         if (helpDesk) {
//             setSelectedHelpDesk(helpDesk.description);
//         }
//     };

//     return (
//         <div>
//             <img
//                 ref={imgRef}
//                 src={isSatView ? "/vansh-map-satview.png" : "/vansh-map-customview.png"}
//                 alt={isSatView ? "Satellite View" : "Custom View"}
//                 className="w-full"
//                 useMap={isSatView ? "#vansh-satview" : "#vansh-customview"}
//             />
//             <map name={isSatView ? "vansh-satview" : "vansh-customview"}>
//                 {(isSatView ? satScaledCoords : customScaledCoords).map((coord, index) => (
//                     <area
//                         key={index}
//                         alt={`Area ${index + 1}`}
//                         title={`Area ${index + 1}`}
//                         href="#"
//                         coords={coord}
//                         shape="rect"
//                         onClick={(event) => targetFunction(event, index, isSatView ? "satview" : "customview")}
//                     />
//                 ))}
//             </map>

//             {/* Conditionally render the selected help desk details */}
//             {isHelpDes && selectedHelpDesk && (
//                 <div className="help-desk-details mt-4 p-4 bg-gray-100 border rounded-lg shadow-md">
//                     <h3 className="text-xl font-semibold">Help Desk Details</h3>
//                     <p>{selectedHelpDesk}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MapItem;

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

