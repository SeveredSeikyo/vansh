"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveUserDetails, getUserDetails, saveEventsToIndexedDB, saveStallsToIndexedDB } from "@/utils/db";
import { PiStudentFill, PiChalkboardTeacherFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";


export default function Home() {
  const [showStudent, setShowStudent]=useState(false)
  const [showFaculty, setShowFaculty]=useState(false)
  const [showGuest, setShowGuest]=useState(false)
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    year: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/vansh.events.json"); // Load JSON from public folder
        const eventData = await response.json();
        await saveEventsToIndexedDB(eventData); // Save to IndexedDB with auto-incremented ID
        console.log("Events saved in IndexedDB!");
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const loadStalls = async () => {
      try {
        const response = await fetch("/stalls.json"); // Load JSON from public folder
        const stallData = await response.json();
        await saveStallsToIndexedDB(stallData); // Save to IndexedDB with auto-incremented ID
        console.log("Stalls saved in IndexedDB!");
      } catch (error) {
        console.error("Error fetching stalls:", error);
      }
    };
  
    loadEvents();
    loadStalls();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUserDetails().then((data) => {
        if (data) {
          router.replace("/dashboard"); // 🚀 Redirect immediately
        } else {
          setIsLoading(false); // Show form only if data is missing
        }
      });
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const onChangeStudent=()=>{
    setShowStudent((prev)=>!prev)
  }

  const onChangeFaculty=()=>{
    setShowFaculty((prev)=>!prev)
  }

  const onChangeGuest=()=>{
    setShowGuest((prev)=>!prev)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveUserDetails({ id: 1, ...formData });
    router.push("/dashboard"); // Redirect after saving user data
  };

  // Show loading indicator while checking user data
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col justify-center flex-1 pt-16 pb-16 px-4 max-w-lg mx-auto">
        {!showStudent&&!showFaculty&&!showGuest&&(
          <div className="flex flex-col gap-3 justify-center items-center">
            <button type="button" className="bg-gray-300 hover:bg-gray-400 hover:text-white p-2 w-30" onClick={onChangeStudent}>
              <span className="flex justify-center items-center gap-1">
                <PiStudentFill/>
                Student
              </span>
            </button>
            <button type="button" className="bg-gray-300 hover:bg-gray-400 hover:text-white p-2 w-30" onClick={onChangeFaculty}>
              <span className="flex justify-center items-center gap-1">
                <PiChalkboardTeacherFill/>
                Faculty
              </span>
            </button>
            <button type="button" className="bg-gray-300 hover:bg-gray-400 hover:text-white p-2 w-30" onClick={onChangeGuest}>
              <span className="flex justify-center items-center gap-1">
                <CgProfile/>
                Guest
              </span>
            </button>
          </div>
        )}
        {showStudent&&(
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Student Details</h2>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded-lg mb-3" required />
            <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="Roll Number" className="w-full border p-2 rounded-lg mb-3" required />
            <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" className="w-full border p-2 rounded-lg mb-3" required />
            <select name="year" value={formData.year} onChange={handleChange} className="w-full border p-2 rounded-lg mb-3">
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
            <div className="flex justify-between items-center">
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 ml-2 mr-2">Submit</button>
              <button type="submit" className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-blue-700 ml-2 mr-2" onClick={onChangeStudent}>Back</button>
            </div>
          </form>
        )}
        {showFaculty&&(
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Faculty Details</h2>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded-lg mb-3" required />
            <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" className="w-full border p-2 rounded-lg mb-3" required />
            <div className="flex justify-between items-center">
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 ml-2 mr-2">Submit</button>
              <button type="submit" className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-blue-700 ml-2 mr-2" onClick={onChangeFaculty}>Back</button>
            </div>
          </form>
        )}
        {showGuest&&(
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Guest Details</h2>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded-lg mb-3" required />
            <div className="flex justify-between items-center">
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 ml-2 mr-2">Submit</button>
              <button type="submit" className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-blue-700 ml-2 mr-2" onClick={onChangeGuest}>Back</button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
