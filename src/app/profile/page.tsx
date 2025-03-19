"use client";
import { useState, useEffect } from "react";
import { getUserDetails } from "@/utils/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CgProfile } from "react-icons/cg"; // Import User Icon
import StickyComponent from "@/components/StickyComponent";

interface UserProfile {
  name: string;
  rollNumber: string;
  branch: string;
  year: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUserDetails().then((data) => {
        setUser(data);
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-600">Loading Profile...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full text-center">
          {/* User Avatar */}
          <div className="flex justify-center">
            <CgProfile className="w-20 h-20 text-gray-400 bg-gray-200 rounded-full p-4" />
          </div>

          {/* Profile Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mt-4">User Profile</h2>

          {/* Profile Details */}
          {user ? (
            <div className="mt-6 text-gray-700">
              <p className="text-lg"><strong className="text-gray-800">Name:</strong> {user.name}</p>
              <p className="text-lg"><strong className="text-gray-800">Roll Number:</strong> {user.rollNumber}</p>
              <p className="text-lg"><strong className="text-gray-800">Branch:</strong> {user.branch}</p>
              <p className="text-lg"><strong className="text-gray-800">Year:</strong> {user.year}</p>
            </div>
          ) : (
            <p className="text-red-500 mt-4">No profile data found. Fill out the form on the home page.</p>
          )}

          {/* Edit Profile Button */}
          {/* <div className="mt-6">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div> */}
        </div>
      </main>
      <StickyComponent/>
      <Footer />
    </div>
  );
}
