"use client"

import { useState, useEffect } from "react";
import Categories from "@/components/Categories";
import EventsList from "@/components/EventsList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { FaSearch } from "react-icons/fa";
import { TbFilterOff, TbFilterFilled } from "react-icons/tb";
import { getEventDetails } from "@/utils/db";
import {HashLoader} from 'react-spinners';

interface Event {
    id: number;
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
    const [isDayOneDown, setIsDayOneDown]=useState(true);
    const [isDayTwoDown, setIsDayTwoDown]=useState(true);
    const [showFilters,setShowFilters]=useState(false);
    const [isDayOneChecked, setIsDayOneChecked]=useState(true);
    const [isDayTwoChecked, setIsDayTwoChecked]=useState(true);

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
        return events.filter(event => {
            const matchesQuery = event.eventName.toLowerCase().includes(query) || event.venue.toLowerCase().includes(query);
            const matchesCategory = currentCategory ? event.category === currentCategory?.toLowerCase() : true;
            return matchesQuery && matchesCategory;
        });
    };

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // Handle category selection
    const handleCategorySelect = (category: string) => {
        setCurrentCategory(category);
    };

    // Clear category selection and reset the filter
    const clearSelection = () => {
        setCurrentCategory("");
        setSearchQuery("");  // Clear search query as well
    };

    //Set show filters to false
    const handleShowFilters=()=>{
        setShowFilters(prev=>!prev)
    }

    const handleDayOneDown=()=>{
        setIsDayOneDown((prev)=>!prev);
        setIsDayOneChecked(prev=>!prev);
        //setIsDayTwoDown(false)
    }
    const handleDayTwoDown=()=>{
        setIsDayTwoDown((prev)=>!prev);
        setIsDayTwoChecked(prev=>!prev);
        //setIsDayOneDown(false)
    }

    // Get filtered events directly in render
    let filteredList:Event[]=[];
    const dayoneList=events?.filter(item=>item.day.includes(1))??[];
    const daytwoList=events?.filter(item=>item.day.includes(2))??[];

    if (isDayOneDown){
        filteredList=filterEvents(dayoneList);
    }

    if(isDayTwoDown){
        filteredList=filterEvents(daytwoList);
    }

    if (isDayOneDown&&isDayTwoDown){
        filteredList=filterEvents(events??[]);
    }

    if (isLoading) {
        return (
            <div>
                <Header/>
                <main className="flex justify-center items-center h-[70vh]">
                    <HashLoader/>
                </main>
                <Footer/>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-16 pb-16">
                {/* Search Bar */}
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

                {/* Categories component with category filter functionality */}
                {isDayOneDown||isDayTwoDown?<Categories onCategorySelect={handleCategorySelect} currentCategory={currentCategory} clearSelection={clearSelection}/>:null}
                
                {/* Display filtered events */}
                {/* <div className="pt-2 pl-4 pr-4">
                    <div>
                        <button onClick={handleDayOneDown} className="bg-gray-400 mt-1 hover:bg-gray-200 flex justify-between p-3 items-center w-full rounded-lg">
                            <div className="flex items-center gap-1">
                                <HiOutlineCalendarDays fontSize={30}/>
                                <h1>Day 1</h1>
                            </div>
                            {isDayOneDown?<FaAngleUp fontSize={30}/>:<FaAngleDown fontSize={30}/>}
                        </button>
                        {isDayOneDown?<EventsList eventslist={filteredList} />:null}
                    </div>
                    <div>
                        <button className="bg-gray-400 mt-1 hover:bg-gray-200 flex justify-between p-3 items-center w-full rounded-lg" onClick={handleDayTwoDown}>
                            <div className="flex items-center gap-1">
                                <BsCalendarDay fontSize={30}/>
                                <h1>Day 2</h1>
                            </div>
                            {isDayTwoDown?<FaAngleUp fontSize={30}/>:<FaAngleDown fontSize={30}/>}
                        </button>
                        {isDayTwoDown?<EventsList eventslist={filteredList} />:null}
                    </div>
                </div> */}

                {/* display filter icon */}
                <div className="relative flex justify-end px-10 py-3" onMouseLeave={handleShowFilters}>
                    <div onMouseEnter={handleShowFilters}>
                        {isDayOneDown||isDayTwoDown ? <TbFilterFilled fontSize={24}/> : <TbFilterOff fontSize={24}/>}
                    </div>
                    {showFilters && (
                        <div className="absolute mt-8 bg-gray-200 pr-5 pl-2 py-4 rounded-lg text-xs">
                            <div className="flex items-center gap-1 mb-1">
                                <input type="checkbox" id="dayone" className="w-3" checked={isDayOneChecked} onChange={handleDayOneDown}/>
                                <label htmlFor="dayone">Thu, 20 Mar</label>
                            </div>
                            <div className="flex items-center gap-1">
                                <input type="checkbox" id="daytwo" className="w-3" checked={isDayTwoChecked} onChange={handleDayTwoDown}/>
                                <label htmlFor="daytwo">Fri, 21 Mar</label>
                            </div>
                        </div>
                    )}
                </div>
                {isDayOneDown||isDayTwoDown?
                <div>
                    {isDayOneDown&&isDayTwoDown?
                    <EventsList eventslist={filteredList} />:
                    <>
                        {isDayOneDown?<EventsList eventslist={filteredList} />:null}
                        {isDayTwoDown?<EventsList eventslist={filteredList} />:null}
                    </>
                    }
                </div>:
                <div className="flex flex-col justify-center items-center text-center px-10 flex-grow">
                    <img src="/undraw_void.svg" alt="events_not_found" className="w-75 mx-auto mb-10" />
                    <p>No events are available for this period. Adjust your filters or check another date range.</p>
                </div>            
                }
            </main>
            <Footer />
        </div>
    );
}
