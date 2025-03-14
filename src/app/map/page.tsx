"use client"

import {ScreenOrientation} from "@capacitor/screen-orientation";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import MapItem from "@/components/MapItem"
import { useState } from "react"
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
// import MapAreaItem from "@/components/MapAreaItem"

export default function Map() {
    const [isSatView, setIsSatView] = useState(false);
    const [isHelpDes, setIsHelpDes] = useState(false);
    const [isPortrait, setIsPortrait]=useState(true)

    // Function to toggle view
    const toggleView = () => {
        setIsSatView(prev => !prev);
        setIsHelpDes(false); // Reset help desk info when toggling the view
    };

    //Function to check Screen Orientation
    const checkOrientation=async()=>{
        const orientation=await ScreenOrientation.orientation();
        if (orientation.type.includes('landscape')){
            setIsPortrait(false)
        }else{
            setIsPortrait(true)
        }
    }

    //Listen for Screen Orientation
    ScreenOrientation.addListener("screenOrientationChange",(event)=>{
        console.log(event.type)
        checkOrientation();
    })

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
                    <MapItem isSatView={isSatView} isHelpDes={isHelpDes} setIsHelpDes={setIsHelpDes} isPortrait={isPortrait}/>
                </div>
            </main>
            <Footer />
        </div>
    );
}
