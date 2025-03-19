"use client"
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const StickyComponent = () => {
    const [classname, setClassname]=useState("flex");

    const handleClose=()=>{
        setClassname("hidden")
    }
    return (
        <div id="bottom-banner" className={`fixed bottom-16 start-0 z-50 ${classname} justify-between w-full p-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600`}>
            <div>
                <p>Developed By 3rd Year, AI&DS</p>
            </div>
            <div onClick={handleClose}>
                <RxCross1/>
            </div>
        </div>
    );
};

export default StickyComponent;