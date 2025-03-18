"use client";

import { useState, useEffect } from "react";
import { getEventById } from "@/utils/db";
import { HashLoader } from "react-spinners";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface Event {
  id?: number;
  eventId: string;
  eventName: string;
  category: string;
  image: string;
  date: string;
  timings: string;
  venue: string;
  teamSize: string;
  registrationFee: string;
  prize: string;
  facultyCoordinator: string;
  facultyCoordinatorNo: string;
  studentCoordinator: string;
  studentCoordinatorNo: string;
  day: number[];
};

type EventDetailsProps={
    eventId: string;
}


const EventDetails=({eventId}:EventDetailsProps) =>{
    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadEvent = async () => {
        if (!eventId) {
            console.error("eventId is undefined");
            setIsLoading(false);
            return;
        }
    
        try {
            const eventData = await getEventById(eventId); // Fetch event
            setEvent(eventData);
        } catch (error) {
            console.error("Error fetching event:", error);
        }
    
        setIsLoading(false);
        };
    
        loadEvent();
    }, [eventId]);
    

    if (isLoading) {
        return (
        <div className="flex justify-center items-center text-center py-10">
            <HashLoader/>
        </div>
        );
    }
    
    if (!event) {
        return (
        <div className="flex justify-center items-center text-center py-10">
            <HashLoader/>
        </div>
        );
    }
  

    return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Back Button */}
        <div className="mb-4">
        <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800">
            <FaArrowLeft className="w-6 h-6 mr-2" /> {/* Back Icon */}
            <span className="text-lg font-medium">Back to Dashboard</span>
        </Link>
        </div>

        {/* Event Image (Only if Available) */}
        {event.image && (
        <div className="flex justify-center">
            <img 
            src={event.image} 
            alt={event.eventName || "Event Image"} 
            className="w-full max-h-80 object-cover rounded-xl shadow-md"
            />
        </div>
        )}

        {/* Event Name & Category */}
        {(event.eventName || event.category) && (
        <div className="text-center my-5">
            {event.eventName && <h1 className="text-3xl font-bold text-gray-900">{event.eventName}</h1>}
            {event.category && <p className="text-lg text-gray-600 mt-2">Category: {event.category}</p>}
        </div>
        )}

        {/* Event Details Table (Only if at least one detail exists) */}
        {(event.date || event.venue || event.timings || event.teamSize || event.registrationFee || event.prize) && (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Event Details:</h2>
            <table className="w-full border-collapse border border-gray-300">
            <tbody>
                {event.date && (
                <tr className="border-b">
                    <td className="px-4 py-3 font-medium text-gray-700">Date</td>
                    <td className="px-4 py-3">{event.date}</td>
                </tr>
                )}
                {event.venue && (
                <tr className="border-b">
                    <td className="px-4 py-3 font-medium text-gray-700">Venue</td>
                    <td className="px-4 py-3">{event.venue}</td>
                </tr>
                )}
                {event.timings && (
                <tr className="border-b">
                    <td className="px-4 py-3 font-medium text-gray-700">Timings</td>
                    <td className="px-4 py-3">{event.timings}</td>
                </tr>
                )}
                {event.teamSize && (
                <tr className="border-b">
                    <td className="px-4 py-3 font-medium text-gray-700">Team Size</td>
                    <td className="px-4 py-3">{event.teamSize}</td>
                </tr>
                )}
                {event.registrationFee && (
                <tr className="border-b">
                    <td className="px-4 py-3 font-medium text-gray-700">Registration Fee</td>
                    <td className="px-4 py-3">{event.registrationFee}</td>
                </tr>
                )}
                {event.prize && (
                <tr className="border-b">
                    <td className="px-4 py-3 font-medium text-gray-700">Prize</td>
                    <td className="px-4 py-3">{event.prize}</td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        )}

        {/* Coordinators Section (Only if Available) */}
        {(event.facultyCoordinator || event.studentCoordinator) && (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Coordinators:</h2>
            {event.facultyCoordinator && (
            <p className="text-gray-700">
                <span className="font-medium">Faculty:</span> {event.facultyCoordinator} 
                {event.facultyCoordinatorNo && ` (${event.facultyCoordinatorNo})`}
            </p>
            )}
            {event.studentCoordinator && (
            <p className="text-gray-700 mt-2">
                <span className="font-medium">Student:</span> {event.studentCoordinator} 
                {event.studentCoordinatorNo && ` (${event.studentCoordinatorNo})`}
            </p>
            )}
        </div>
        )}
    </div>
    );
}

export default EventDetails;