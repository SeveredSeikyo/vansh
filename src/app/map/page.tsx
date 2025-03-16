"use client"

// import Header from "@/components/Header"
// import Footer from "@/components/Footer"
// import MapItem from "@/components/MapItem"
// import { useState } from "react"
// import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
// // import MapAreaItem from "@/components/MapAreaItem"

// export default function Map() {
//     const [isSatView, setIsSatView] = useState(false);
//     const [isHelpDes, setIsHelpDes] = useState(false);

//     // Function to toggle view
//     const toggleView = () => {
//         setIsSatView(prev => !prev);
//         setIsHelpDes(false); // Reset help desk info when toggling the view
//     };

//     return (
//         <div className="flex flex-col min-h-screen w-screen">
//             <Header />
//             <main className="flex-1 pt-16 pb-16">
//                 <div className="flex justify-center items-center">
//                     <div className="w-screen p-3 relative h-[85vh] bg-gray-300">
//                         <div className="absolute m-auto inset-0">
//                             <button 
//                                 onClick={toggleView} 
//                                 className="absolute top-0 right-4 p-2 text-white transition-all duration-200">
//                                 {isSatView ? <FaToggleOn fontSize={30}/> : <FaToggleOff fontSize={30}/>}
//                             </button>
//                             <MapItem isSatView={isSatView} isHelpDes={isHelpDes} setIsHelpDes={setIsHelpDes}/>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// }

import dynamic from "next/dynamic";

const DynamicCollegeMap = dynamic(() => import("@/components/MapItem"), {
  ssr: false,
});

export default function MapPage() {
  return <DynamicCollegeMap />;
}
