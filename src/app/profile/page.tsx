"use client";
import { useState, useEffect } from "react";
import { getUserDetails } from "@/utils/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 pb-16 px-4 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        {user ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Roll Number:</strong> {user.rollNumber}</p>
            <p><strong>Branch:</strong> {user.branch}</p>
            <p><strong>Year:</strong> {user.year}</p>
          </div>
        ) : (
          <p>No profile data found. Fill out the form on the home page.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
