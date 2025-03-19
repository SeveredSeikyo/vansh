"use client";

import { IoMapOutline, IoMap } from "react-icons/io5";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { useState } from "react";
import StickyComponent from "@/components/StickyComponent";

const DynamicCollegeMap = dynamic(() => import("@/components/MapItem"), {
  ssr: false,
});

export default function Map() {
  const [isSatView, setIsSatView] = useState(false);

  return (
    <div className="h-[100vh] overflow-hidden">
      <Header />
      <main className="flex-1 pt-16 pb-16 flex justify-center items-center overflow-hidden">
        <div className="h-[100vh] w-[100vw] px-2 py-5 relative">
          <DynamicCollegeMap isSatView={isSatView} />

          {/* Toggle Button */}
          <div className="absolute top-8 right-6 z-900">
            <button
              onClick={() => setIsSatView(!isSatView)}
              className="px-4 py-2 rounded-lg shadow-md bg-white"
            >
              {isSatView ? <IoMapOutline/> : <IoMap/>}
            </button>
          </div>
        </div>
      </main>
      <StickyComponent/>
      <Footer />
    </div>
  );
}
