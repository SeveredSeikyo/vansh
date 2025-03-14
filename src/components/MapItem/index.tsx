"use client"

import { useEffect, useState,useCallback, useRef } from "react";

type MapItemProps = {
    isSatView: boolean;
    isHelpDes: boolean;
    isPortrait: boolean;
    setIsHelpDes: React.Dispatch<React.SetStateAction<boolean>>; // Function to reset help desk state
};

// Original dimensions for both images
const customeOriginalSize = { width: 1712, height: 941 };
const satOriginalSize = { width: 1184, height: 671 };

// Help desk data
const helpDeskList = [
    { id: 0, index: 0, type: "satview", description: "Help Desk 1" },
    { id: 1, index: 1, type: "satview", description: "Help Desk 2" },
    { id: 2, index: 2, type: "satview", description: "Help Desk 3" },
    { id: 3, index: 0, type: "customview", description: "Help Desk 1" },
    { id: 4, index: 1, type: "customview", description: "Help Desk 2" },
    { id: 5, index: 2, type: "customview", description: "Help Desk 3" },
    { id: 6, index: 3, type: "customview", description: "Help Desk 4" },
];

const MapItem = ({ isSatView, isHelpDes, setIsHelpDes, isPortrait }: MapItemProps) => {
    const [customScaledCoords, setCustomScaledCoords] = useState<string[]>([]);
    const [satScaledCoords, setSatScaledCoords] = useState<string[]>([]);
    const [selectedHelpDesk, setSelectedHelpDesk] = useState<string>(""); // State to store the selected help desk description
    const imgRef = useRef<HTMLImageElement | null>(null);
    console.log(isPortrait);
    // Coordinates for each view
    const customeOriginalCoords = [
        [488, 443, 445, 379], // Area 1
        [701, 588, 743, 649], // Area 2
        [1003, 657, 1048, 716], // Area 3
        [1192, 493, 1248, 567], // Area 4
    ];

    const satOriginalCoords = [
        [607, 488, 575, 445], // Area 1
        [871, 397, 911, 447], // Area 2
        [998, 322, 1031, 380], // Area 3
    ];

    // Function to scale coordinates based on image dimensions
    const updateCoords = useCallback(() => {
        if (imgRef.current) {
            const imgWidth = imgRef.current.width;
            const imgHeight = imgRef.current.height;
    
            const scaleCoords = (originalCoords: number[][], originalSize: { width: number; height: number }) =>
                originalCoords.map((coord) =>
                    coord
                        .map((value, index) =>
                            index % 2 === 0
                                ? Math.round((value * imgWidth) / originalSize.width)
                                : Math.round((value * imgHeight) / originalSize.height)
                        )
                        .join(",")
                );
    
            if (isSatView) {
                setSatScaledCoords(scaleCoords(satOriginalCoords, satOriginalSize));
            } else {
                setCustomScaledCoords(scaleCoords(customeOriginalCoords, customeOriginalSize));
            }
        }
    }, [isSatView]);    

    useEffect(() => {
        window.addEventListener("resize", updateCoords);
        updateCoords(); // Call on mount
    
        return () => window.removeEventListener("resize", updateCoords);
    }, [updateCoords]);

    // Function to handle click on the map area
    const targetFunction = (event: React.MouseEvent, index: number, viewType: string) => {
        event.preventDefault();
        setIsHelpDes(true);
        const helpDesk = helpDeskList.find((desk) => desk.index === index && desk.type === viewType);
        if (helpDesk) setSelectedHelpDesk(helpDesk.description);
    };    

    return (
        <div className="max-h-screen">
            <img
                ref={imgRef}
                src={isSatView? "/vansh-map-satview.png" : "/vansh-map-customview.png"}
                alt={isSatView ? "Satellite View" : "Custom View"}
                className="w-full"
                useMap={isSatView ? "#vansh-satview" : "#vansh-customview"}
            />

            <map name={isSatView ? "vansh-satview" : "vansh-customview"}>
                {(isSatView ? satScaledCoords : customScaledCoords).map((coord, index) => (
                    <area
                        key={index}
                        alt={`Area ${index + 1}`}
                        title={`Area ${index + 1}`}
                        href="#"
                        coords={coord}
                        shape="rect"
                        onClick={(event) => targetFunction(event, index, isSatView ? "satview" : "customview")}
                    />
                ))}
            </map>

            {/* Conditionally render the selected help desk details */}
            {isHelpDes && selectedHelpDesk && (
                <div className="help-desk-details mt-4 p-4 bg-gray-100 border rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Help Desk Details</h3>
                    <p>{selectedHelpDesk}</p>
                </div>
            )}
        </div>
    );
};

export default MapItem;
