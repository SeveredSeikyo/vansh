"use client"

import { ScreenOrientation } from "@capacitor/screen-orientation";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import MapItem from "@/components/MapItem"
import { useState, useEffect } from "react"
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { PluginListenerHandle } from "@capacitor/core";

export default function Map() {
    const [isSatView, setIsSatView] = useState(false);
    const [isHelpDes, setIsHelpDes] = useState(false);
    const [isPortrait, setIsPortrait] = useState(true);

    // Function to toggle view
    const toggleView = () => {
        setIsSatView(prev => !prev);
        setIsHelpDes(false); // Reset help desk info when toggling the view
    };

    // Function to check screen orientation
    const checkOrientation = async () => {
        const orientation = await ScreenOrientation.orientation();
        setIsPortrait(!orientation.type.includes("landscape"));
    };

    // Listen for screen orientation changes
    useEffect(() => {
        let listener: PluginListenerHandle | null = null;
    
        const setupListener = async () => {
            listener = await ScreenOrientation.addListener("screenOrientationChange", checkOrientation);
            checkOrientation(); // Initial check
        };
    
        setupListener();
    
        return () => {
            listener?.remove?.(); // Use optional chaining in case `remove` isn't available
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-16 pb-16">
                <div 
                    className={`relative w-full h-full flex items-center justify-center transition-transform duration-300 ${
                        isPortrait ? "rotate-90 origin-center w-screen h-screen" : ""
                    }`}
                >
                    <button 
                        onClick={toggleView} 
                        className="absolute top-4 right-4 p-2 text-white transition-all duration-200">
                        {isSatView ? <FaToggleOn fontSize={30}/> : <FaToggleOff fontSize={30}/>}
                    </button>
                    <MapItem 
                        isSatView={isSatView} 
                        isHelpDes={isHelpDes} 
                        setIsHelpDes={setIsHelpDes} 
                        isPortrait={isPortrait}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
