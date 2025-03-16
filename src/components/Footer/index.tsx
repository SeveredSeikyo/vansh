"use client"

import {BsCalendar2Event, BsCalendar2EventFill} from "react-icons/bs";
import { FaRegMap,FaMapMarkedAlt } from "react-icons/fa";
import { MdPersonSearch, MdOutlinePersonSearch } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {IoPersonCircleSharp, IoStorefront, IoStorefrontOutline} from "react-icons/io5"
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathName=usePathname();
    console.log(pathName)
    return (
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-gray-100 to-white shadow-xl py-3 pb-5 z-60">
            <div className="flex justify-around items-center text-gray-700">
                <Link href="/dashboard" className="flex flex-col items-center hover:text-black transition">
                    {pathName==="/dashboard/"?<BsCalendar2EventFill fontSize={24} className="text-gray-500"/>:<BsCalendar2Event fontSize={24} className="text-gray-500" />}
                    <p className="text-xs font-medium">Events</p>
                </Link>
                <Link href="/stalls" className="flex flex-col items-center hover:text-black transition">
                    {pathName==="/stalls/"?<IoStorefront fontSize={24} className="text-gray-500"/>:<IoStorefrontOutline fontSize={24} className="text-gray-500" />}
                    <p className="text-xs font-medium">Stalls</p>
                </Link>
                <Link href="/map" className="flex flex-col items-center hover:text-black transition">
                    {pathName==="/map/"?<FaMapMarkedAlt fontSize={24} className="text-gray-500"/>:<FaRegMap fontSize={24} className="text-gray-500" />}
                    <p className="text-xs font-medium">Map</p>
                </Link>
                <Link href="/lost" className="flex flex-col items-center hover:text-black transition">
                    {pathName==="/lost/"?<MdPersonSearch fontSize={24} className="text-gray-500" />:<MdOutlinePersonSearch fontSize={24} className="text-gray-500"/>}
                    <p className="text-xs font-medium">Lost & Found</p>
                </Link>
                <Link href="/profile" className="flex flex-col items-center hover:text-black transition">
                    {pathName==="/profile/"?<IoPersonCircleSharp fontSize={24} className="text-gray-500"/>:<CgProfile fontSize={24} className="text-gray-500" />}
                    <p className="text-xs font-medium">Profile</p>
                </Link>
            </div>
        </div>
    );
};

export default Footer;
