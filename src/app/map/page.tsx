"use client"

import dynamic from "next/dynamic";

const DynamicCollegeMap = dynamic(() => import("@/components/MapItem"), {
  ssr: false,
});

export default function MapPage() {
  return <DynamicCollegeMap />;
}
