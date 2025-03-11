"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import MapItem from "@/components/MapItem"
import { useState } from "react"
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
// import MapAreaItem from "@/components/MapAreaItem"

export default function Map() {
    const [isSatView, setIsSatView] = useState(false);
    const [isHelpDes, setIsHelpDes] = useState(false);

    // Function to toggle view
    const toggleView = () => {
        setIsSatView(prev => !prev);
        setIsHelpDes(false); // Reset help desk info when toggling the view
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-16 pb-16">
                <div className="w-full p-3 relative">
                    <button 
                        onClick={toggleView} 
                        className="absolute top-4 right-4 p-2 text-white transition-all duration-200">
                        {isSatView ? <FaToggleOn fontSize={30}/> : <FaToggleOff fontSize={30}/>}
                    </button>
                    <MapItem isSatView={isSatView} isHelpDes={isHelpDes} setIsHelpDes={setIsHelpDes}/>
                </div>
            </main>
            <Footer />
        </div>
    );
}
