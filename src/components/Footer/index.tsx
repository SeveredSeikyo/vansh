//import { MdOutlineEventNote , MdEventNote} from "react-icons/md";
import {BsCalendar2Event, BsCalendar2EventFill} from "react-icons/bs";
import { FaRegMap,FaMapMarkedAlt } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {IoPersonCircleSharp} from "react-icons/io5"
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
    const [onDashboardPage,setOnDashboardPage]=useState(false)
    const [onMapPage,setOnMapPage]=useState(false)
    const [onLostPage,setOnLostPage]=useState(false)
    const [onProfilePage,setOnProfilePage]=useState(false)

    const handleDashView=()=>{
        setOnDashboardPage(true);
        setOnLostPage(false)
        setOnMapPage(false)
        setOnProfilePage(false)
    }

    const handleMapView=()=>{
        setOnDashboardPage(false);
        setOnLostPage(false)
        setOnMapPage(true)
        setOnProfilePage(false)
    }

    const handleLostView=()=>{
        setOnDashboardPage(false);
        setOnLostPage(true)
        setOnMapPage(false)
        setOnProfilePage(false)
    }

    const handleProfileView=()=>{
        setOnDashboardPage(false);
        setOnLostPage(false)
        setOnMapPage(false)
        setOnProfilePage(true)
    }
    console.log(onDashboardPage,onLostPage,onMapPage,onProfilePage)
    return (
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-gray-100 to-white shadow-lg py-3">
            <div className="flex justify-around items-center text-gray-700">
                <Link href="/dashboard" className="flex flex-col items-center hover:text-black transition">
                    {onDashboardPage?<BsCalendar2EventFill fontSize={24} className="text-gray-500"/>:<BsCalendar2Event fontSize={24} className="text-gray-500" />}
                    <p className="text-xs font-medium">Events</p>
                </Link>
                <Link href="/map" className="flex flex-col items-center hover:text-black transition">
                    {onMapPage?<FaMapMarkedAlt fontSize={24} className="text-gray-500"/>:<FaRegMap fontSize={24} className="text-gray-500" />}
                    <p className="text-xs font-medium">Map</p>
                </Link>
                <Link href="/lost" className="flex flex-col items-center hover:text-black transition">
                    <MdPersonSearch fontSize={24} className="text-gray-500" />
                    <p className="text-xs font-medium">Lost & Found</p>
                </Link>
                <Link href="/profile" className="flex flex-col items-center hover:text-black transition">
                    <CgProfile fontSize={24} className="text-gray-500" />
                    <p className="text-xs font-medium">Profile</p>
                </Link>
            </div>
        </div>
    );
};

export default Footer;
