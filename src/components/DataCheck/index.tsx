"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // or "next/router" for Pages Router
import {
  getUserDetails,
  getEventDetails,
  getStallDetails,
} from "@/utils/db";

export default function DataCheck() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkDataAndRedirect = async () => {
      try {
        const [userDetails, events, stalls] = await Promise.all([
          getUserDetails(),
          getEventDetails(),
          getStallDetails(),
        ]);

        const isUserMissing = !userDetails;
        const areEventsMissing = !events || events.length === 0;
        const areStallsMissing = !stalls || stalls.length === 0;

        if (isUserMissing || areEventsMissing || areStallsMissing) {
          console.log("Missing data, redirecting to /:", {
            userDetails,
            events,
            stalls,
          });
          router.push("/");
        } else {
          console.log("All required data loaded:", {
            userDetails,
            events,
            stalls,
          });
          // No callback; pages handle their own data loading
        }
      } catch (error) {
        console.error("Error checking IndexedDB data:", error);
        router.push("/");
      }
    };

    checkDataAndRedirect();
  }, [router]);

  return null;
}