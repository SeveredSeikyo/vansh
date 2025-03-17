"use client"

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LostDetails from "@/components/LostDetails";
import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { getUserDetails } from "@/utils/db";

export default function Lost() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lostItems, setLostItems] = useState([
        { id: "1", name: "MacBook Pro", location: "Library", time: "2 hours ago", status: "Lost", user: "John Doe" },
        { id: "2", name: "Student ID Card", location: "Cafeteria", time: "1 hour ago", status: "Found", user: "Jane Smith" },
    ]);

    const [user, setUser] = useState<{ name: string; rollNumber: string; branch: string; year: string } | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
        getUserDetails().then((data) => {
            setUser(data);
        });
        }
    }, []);

    const [filterLostItems, setFilterLostItems]=useState(lostItems)
    let filteredLostList=[]


    const [newItem, setNewItem] = useState({
        name: "",
        location: "",
        status: "Lost",
        time: "",
        user: "Anonymous", // Assuming a default user
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value,
        });
    };

    const onFilterLostItems=()=>{
        filteredLostList=lostItems.filter(item=>item.status==="Lost");
        setFilterLostItems(filteredLostList)
    }

    const onFilterFoundItems=()=>{
        filteredLostList=lostItems.filter(item=>item.status==="Found");
        setFilterLostItems(filteredLostList);
    }

    const handleAddItem = () => {
        const newItemId = String(lostItems.length + 1);
        const updatedItems = [
            ...lostItems,
            { ...newItem, id: newItemId, time: new Date().toLocaleString(), user: user?.name || "Anonymous" },
        ];
        setLostItems(updatedItems);
        setFilterLostItems(updatedItems); 
        setIsModalOpen(false); 
        setNewItem({ name: "", location: "", status: "Lost", time: "", user: "Anonymous" });
    };
    

    const handleDeleteItem = (id: string) => {
        const updatedItems = lostItems.filter(item => item.id !== id);
        setLostItems(updatedItems);
        setFilterLostItems(updatedItems);
    };
    

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-16 pb-16 px-4 max-w-3xl mx-auto">
                {/* Toggle Buttons for Lost & Found */}
                <div className="flex justify-center gap-4 mb-6">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition" onClick={onFilterLostItems}>
                        Lost Items
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition" onClick={onFilterFoundItems}>
                        Found Items
                    </button>
                </div>

                {/* Lost & Found Items List */}
                <LostDetails lostItems={filterLostItems} onDelete={(id)=>handleDeleteItem(id)} />

                {/* Floating Action Button (FAB) */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="fixed bottom-20 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 transition"
                >
                    <IoMdAdd />
                </button>

                {/* Modal Form */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-md">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                            <h3 className="text-lg font-semibold mb-4">Report Lost Item</h3>
                            <form>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        className="w-full border p-2 rounded-lg"
                                        placeholder="Item name"
                                        name="name"
                                        value={newItem.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        className="w-full border p-2 rounded-lg"
                                        placeholder="Lost at..."
                                        name="location"
                                        value={newItem.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        className="w-full border p-2 rounded-lg"
                                        name="status"
                                        value={newItem.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Lost">Lost</option>
                                        <option value="Found">Found</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700">Last Seen</label>
                                    <input
                                        className="w-full border p-2 rounded-lg"
                                        name="time"
                                        value={newItem.time}
                                        onChange={handleChange}
                                        placeholder="1 hour ago"
                                    />
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button 
                                        type="button" 
                                        className="px-4 py-2 bg-gray-300 rounded-lg"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="button" 
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        onClick={handleAddItem}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
