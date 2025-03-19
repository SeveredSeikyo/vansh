"use client"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import StickyComponent from "@/components/StickyComponent";
import { getStallDetails } from "@/utils/db";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

interface Stall {
    auctionName: string;
}

export default function Stalls() {
    const [stalls, setStalls] = useState<Stall[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            getStallDetails().then((data) => {
                setStalls(data);
                setIsLoading(false);
            });
        }
    }, []);

    if (isLoading) {
        return (
            <div>
                <Header />
                <main className="flex justify-center items-center h-[70vh]">
                    <HashLoader />
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <main className="flex-1 pt-16 pb-16">
                <div className="max-w-5xl mx-auto p-6">
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Available Stalls</h1>
                    
                    {/* Stall Grid */}
                    {stalls && stalls.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {stalls.map((stall, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h2 className="text-xl font-semibold text-gray-800">{stall.auctionName}</h2>
                                    <p className="text-gray-600 mt-2">Stall #{index + 1}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No stalls available.</p>
                    )}
                </div>
            </main>
            <StickyComponent/>
            <Footer />
        </div>
    );
}
