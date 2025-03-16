"use client"

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";

const DynamicCollegeMap = dynamic(() => import("@/components/MapItem"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <div>
        <Header/>
        <main className="flex-1 pt-16 pb-16">
            <DynamicCollegeMap/>
        </main>
        <Footer/>
    </div>
  )
}
