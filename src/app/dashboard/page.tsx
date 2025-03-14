"use client"

import { useState } from "react";
import Categories from "@/components/Categories";
import EventsList from "@/components/EventsList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { FaSearch } from "react-icons/fa";
import {HiOutlineCalendarDays} from "react-icons/hi2";
import {BsCalendarDay} from "react-icons/bs";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";

// Define the type for an event
type Event = {
    id: string;
    title: string;
    time: string;
    day:string,
    location: string;
    category: string;
    image: string;
};
  
const events: Event[] = [
    { id: "1", title: "Tech Innovation Summit 2025", time: "09:00 - 11:30",day:"day1", location: "Anderson Hall", category: "Tech", image: "/tech-innovation.jpg" },
    { id: "2", title: "Cultural Dance Performance", time: "13:00 - 15:00",day:"day2", location: "Main Auditorium", category: "Concerts", image: "/tech-innovation.jpg" },
    { id: "3", title: "Startup Pitch Competition", time: "15:30 - 17:30",day:"day1", location: "Business Center", category: "Tech", image: "/tech-innovation.jpg" },
    { id: "4", title: "AI & Machine Learning Workshop", time: "10:00 - 12:30",day:"day2", location: "Tech Lab 2", category: "Tech", image: "/tech-innovation.jpg" },
    { id: "5", title: "Music Fest: Indie Night", time: "19:00 - 22:00",day:"day1", location: "Open Air Theater", category: "Concerts", image: "/tech-innovation.jpg" },
    { id: "6", title: "Cybersecurity Awareness Panel", time: "14:00 - 16:00",day:"day2", location: "Room B102", category: "Tech", image: "/cultural-event.jpg" },
    { id: "7", title: "Hackathon: Build the Future", time: "08:00 - 20:00",day:"day1", location: "Innovation Hub", category: "Tech", image: "/cultural-event.jpg" },
    { id: "8", title: "Film Screening: Sci-Fi Classics", time: "18:00 - 21:00",day:"day2", location: "Cinema Hall", category: "Arts", image: "/cultural-event.jpg" },
    { id: "9", title: "Yoga & Meditation Session", time: "07:00 - 08:30",day:"day1", location: "Wellness Center", category: "Arts", image: "/cultural-event.jpg" },
    { id: "10", title: "E-Sports Tournament: Valorant", time: "16:00 - 22:00",day:"day2", location: "Gaming Arena", category: "Esports", image: "/cultural-event.jpg" },
];

export default function Home() {
    const [currentCategory, setCurrentCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isDayOneDown, setIsDayOneDown]=useState(true);
    const [isDayTwoDown, setIsDayTwoDown]=useState(true)

    // Function to filter events based on search query and category
    const filterEvents = (events: Event[]) => {
        const query = searchQuery.toLowerCase();
        return events.filter(event => {
            const matchesQuery = event.title.toLowerCase().includes(query) || event.location.toLowerCase().includes(query);
            const matchesCategory = currentCategory ? event.category === currentCategory : true;
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

    const handleDayOneDown=()=>{
        setIsDayOneDown((prev)=>!prev);
        //setIsDayTwoDown(false)
    }
    const handleDayTwoDown=()=>{
        setIsDayTwoDown((prev)=>!prev);
        //setIsDayOneDown(false)
    }

    // Get filtered events directly in render
    let filteredList:Event[]=[];
    const dayoneList=events.filter(item=>item.day=="day1");
    const daytwoList=events.filter(item=>item.day=="day2");

    if (isDayOneDown){
        filteredList=filterEvents(dayoneList);
    }

    if(isDayTwoDown){
        filteredList=filterEvents(daytwoList);
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
                <div className="pt-2 pl-4 pr-4">
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
                </div>
            </main>
            <Footer />
        </div>
    );
}
