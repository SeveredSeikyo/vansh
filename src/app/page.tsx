"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveUserDetails, getUserDetails, saveEventsToIndexedDB, saveStallsToIndexedDB } from "@/utils/db";
import { PiStudentFill, PiChalkboardTeacherFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

export default function Home() {
  const [showStudent, setShowStudent] = useState(false);
  const [showFaculty, setShowFaculty] = useState(false);
  const [showGuest, setShowGuest] = useState(false);
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
        const response = await fetch("/vansh.events.json");
        const eventData = await response.json();
        await saveEventsToIndexedDB(eventData);
        console.log("Events saved in IndexedDB!");
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const loadStalls = async () => {
      try {
        const response = await fetch("/stalls.json");
        const stallData = await response.json();
        await saveStallsToIndexedDB(stallData);
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
          router.replace("/dashboard");
        } else {
          setIsLoading(false);
        }
      });
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeStudent = () => setShowStudent((prev) => !prev);
  const onChangeFaculty = () => setShowFaculty((prev) => !prev);
  const onChangeGuest = () => setShowGuest((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveUserDetails({ id: 1, ...formData });
    router.push("/dashboard");
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex flex-col justify-center flex-1 pt-16 pb-16 px-4 max-w-lg mx-auto">
        {!showStudent && !showFaculty && !showGuest && (
          <div className="flex flex-col gap-4 justify-center items-center">
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300 w-full max-w-xs"
              onClick={onChangeStudent}
            >
              <PiStudentFill className="text-xl" />
              <span>Student</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300 w-full max-w-xs"
              onClick={onChangeFaculty}
            >
              <PiChalkboardTeacherFill className="text-xl" />
              <span>Faculty</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300 w-full max-w-xs"
              onClick={onChangeGuest}
            >
              <CgProfile className="text-xl" />
              <span>Guest</span>
            </button>
          </div>
        )}

        {showStudent && (
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 mb-6 transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Student Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Roll Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-500"
              >
                <option value="" disabled>Select Branch</option>
                <option value="AIDS">AIDS</option>
                <option value="AIML">AIML</option>
                <option value="DS">DS</option>
                <option value="IT">IT</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EIE">EIE</option>
                <option value="EEE">EEE</option>
                <option value="CIVIL">CIVIL</option>
                <option value="MECH">MECH</option>
              </select>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-500"
              >
                <option value="" disabled>Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={onChangeStudent}
                className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
              >
                Back
              </button>
            </div>
          </form>
        )}

        {showFaculty && (
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 mb-6 transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Faculty Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-500"
              >
                <option value="" disabled>Select Branch</option>
                <option value="AIDS">AIDS</option>
                <option value="AIML">AIML</option>
                <option value="DS">DS</option>
                <option value="IT">IT</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EIE">EIE</option>
                <option value="EEE">EEE</option>
                <option value="CIVIL">CIVIL</option>
                <option value="MECH">MECH</option>
              </select>
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={onChangeFaculty}
                className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
              >
                Back
              </button>
            </div>
          </form>
        )}

        {showGuest && (
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 mb-6 transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Guest Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={onChangeGuest}
                className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
              >
                Back
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}