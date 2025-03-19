"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LostDetails from "@/components/LostDetails";
import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { getAllItems, getUserDetails, saveItem, deleteItem, Item } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";

export default function Lost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lostItems, setLostItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({
    id: "",
    itemId: "",
    name: "",
    location: "",
    status: "0",
    time: "",
    user: "Anonymous",
    action: "CREATE" as const,
    synced: false,
  });
  const [lfItem, setLfItem] = useState<Item | null>(null);
  console.log(lfItem);
  const [user, setUser] = useState<{ name: string; rollNumber: string; branch: string; year: string } | null>(null);
  const [filterLostItems, setFilterLostItems] = useState<Item[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUserDetails().then((data) => setUser(data));
    }
  }, []);

  const fetchItems = async () => {
    if (typeof window !== "undefined") {
      const items = await getAllItems();
      setLostItems(items);
      setFilterLostItems(items.filter((item) => item.action === "CREATE"));
    }
  };

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, 10 * 1000); // Check every 10 seconds for updates
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanupDeletedItems = async () => {
      const itemsToDelete = lostItems.filter((item) => item.action === "DELETE");
      for (const item of itemsToDelete) {
        await deleteItem(item.id);
      }
      fetchItems(); // Refresh after cleanup
    };

    const interval = setInterval(cleanupDeletedItems, 30 * 60 * 1000); // 30 minutes
    return () => clearInterval(interval);
  }, [lostItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const onFilterLostItems = () => {
    const filteredLostList = lostItems.filter((item) => item.status === "0" && item.action === "CREATE");
    setFilterLostItems(filteredLostList);
  };

  const onFilterFoundItems = () => {
    const filteredLostList = lostItems.filter((item) => item.status === "1" && item.action === "CREATE");
    setFilterLostItems(filteredLostList);
  };

  const handleAddItem = async () => {
    const uniqueId = uuidv4();
    const newItemWithId: Item = {
      id: uniqueId,
      itemId: `${user?.name || "Anonymous"}_${uuidv4()}`,
      name: newItem.name,
      location: newItem.location,
      status: newItem.status,
      time: new Date().toLocaleString(),
      user: user?.name || "Anonymous",
      action: "CREATE",
      synced: false,
    };

    await saveItem(newItemWithId);
    fetchItems(); // Refresh list
    setLfItem(newItemWithId);
    setIsModalOpen(false);
    setNewItem({
      id: "",
      itemId: "",
      name: "",
      location: "",
      status: "0",
      time: "",
      user: "Anonymous",
      action: "CREATE",
      synced: false,
    });
  };

  const handleDeleteItem = async (id: string) => {
    const itemToDelete = lostItems.find((item) => item.id === id);
    if (itemToDelete) {
      const updatedItem: Item = { ...itemToDelete, action: "DELETE", synced: false };
      await saveItem(updatedItem);
      fetchItems(); // Refresh list
      setLfItem(updatedItem);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 pb-16 px-4 max-w-3xl mx-auto">
        <div className="flex justify-center gap-4 mb-6 mt-6">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={onFilterLostItems}
          >
            Lost Items
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            onClick={onFilterFoundItems}
          >
            Found Items
          </button>
        </div>

        <LostDetails lostItems={filterLostItems} onDelete={(id) => handleDeleteItem(id)} />

        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-20 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 transition"
        >
          <IoMdAdd />
        </button>

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
                    <option value="0">Lost</option>
                    <option value="1">Found</option>
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