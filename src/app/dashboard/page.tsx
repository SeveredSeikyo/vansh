"use client";

import { useState, useEffect } from "react";
import Categories from "@/components/Categories";
import EventsList from "@/components/EventsList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { FaSearch } from "react-icons/fa";
import { TbFilterOff, TbFilterFilled } from "react-icons/tb";
import { getEventDetails } from "@/utils/db";
import { HashLoader } from "react-spinners";

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
}

export default function Home() {
    const [currentCategory, setCurrentCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isDayOneDown, setIsDayOneDown] = useState(true);
    const [isDayTwoDown, setIsDayTwoDown] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [isDayOneChecked, setIsDayOneChecked] = useState(true);
    const [isDayTwoChecked, setIsDayTwoChecked] = useState(true);
    const [events, setEvents] = useState<Event[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            getEventDetails().then((data) => {
                setEvents(data);
                setIsLoading(false);
            });
        }
    }, []);

    // Function to filter events based on search query and category
    const filterEvents = (events: Event[]) => {
        const query = searchQuery.toLowerCase();
        return events.filter(
            (event) =>
                (event.eventName.toLowerCase().includes(query) ||
                    event.venue.toLowerCase().includes(query)) &&
                (currentCategory
                    ? event.category === currentCategory.toLowerCase()
                    : true)
        );
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleCategorySelect = (category: string) => {
        setCurrentCategory(category);
    };

    const clearSelection = () => {
        setCurrentCategory("");
        setSearchQuery("");
    };

    const handleShowFilters = () => {
        setShowFilters((prev) => !prev);
    };

    const handleDayOneDown = () => {
        setIsDayOneDown((prev) => !prev);
        setIsDayOneChecked((prev) => !prev);
    };

    const handleDayTwoDown = () => {
        setIsDayTwoDown((prev) => !prev);
        setIsDayTwoChecked((prev) => !prev);
    };

    // Compute filtered events once based on selected days
    const getFilteredEvents = () => {
        if (!events) return [];

        let baseEvents: Event[] = [];
        if (isDayOneDown && isDayTwoDown) {
            baseEvents = events; // Show all events
        } else if (isDayOneDown) {
            baseEvents = events.filter((item) => item.day.includes(1));
        } else if (isDayTwoDown) {
            baseEvents = events.filter((item) => item.day.includes(2));
        }

        return filterEvents(baseEvents); // Apply search and category filters
    };

    const filteredList = getFilteredEvents();

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
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-16 pb-16">
                <div className="flex justify-center mb-4 mt-1 pr-3 pl-3">
                    <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 w-full max-w-md shadow-sm focus-within:border-gray-500 transition">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="search"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
                        />
                    </div>
                </div>

                {isDayOneDown || isDayTwoDown ? (
                    <Categories
                        onCategorySelect={handleCategorySelect}
                        currentCategory={currentCategory}
                        clearSelection={clearSelection}
                    />
                ) : null}

                <div
                    className="relative flex justify-end px-10 py-3"
                    onMouseLeave={handleShowFilters}
                >
                    <div onMouseEnter={handleShowFilters}>
                        {isDayOneDown || isDayTwoDown ? (
                            <TbFilterFilled fontSize={24} />
                        ) : (
                            <TbFilterOff fontSize={24} />
                        )}
                    </div>
                    {showFilters && (
                        <div className="absolute mt-8 bg-gray-200 pr-5 pl-2 py-4 rounded-lg text-xs">
                            <div className="flex items-center gap-1 mb-1">
                                <input
                                    type="checkbox"
                                    id="dayone"
                                    className="w-3"
                                    checked={isDayOneChecked}
                                    onChange={handleDayOneDown}
                                />
                                <label htmlFor="dayone">Thu, 20 Mar</label>
                            </div>
                            <div className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    id="daytwo"
                                    className="w-3"
                                    checked={isDayTwoChecked}
                                    onChange={handleDayTwoDown}
                                />
                                <label htmlFor="daytwo">Fri, 21 Mar</label>
                            </div>
                        </div>
                    )}
                </div>

                {isDayOneDown || isDayTwoDown ? (
                    <EventsList eventslist={filteredList} />
                ) : (
                    <div className="flex flex-col justify-center items-center text-center px-10 flex-grow">
                        <img
                            src="/undraw_void.svg"
                            alt="events_not_found"
                            className="w-75 mx-auto mb-10"
                        />
                        <p>
                            No events are available for this period. Adjust your
                            filters or check another date range.
                        </p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}