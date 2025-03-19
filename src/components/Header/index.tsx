"use client";
import Link from "next/link";
import { IoIosNotifications } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { getUserDetails, sendUser } from "@/utils/db"; // Removed getAllItems, sendItems, syncServerItemsToLocal
import { Network } from "@capacitor/network";
import { PluginListenerHandle } from "@capacitor/core";
import { MdOutlineWifi, MdOutlineWifiOff } from "react-icons/md";

const Header = () => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const listenerHandleRef = useRef<PluginListenerHandle | null>(null);

  // Check server connectivity with a ping
  const pingServer = async (): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "GET",
        mode: "cors",
        cache: "no-store",
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Monitor network status
  useEffect(() => {
    if (typeof window === "undefined") return;

    const setupNetworkListener = async () => {
      const status = await Network.getStatus();
      const serverReachable = await pingServer();
      const online = status.connected && serverReachable;
      console.log("Network status:", status, "Server reachable:", serverReachable);
      setIsOnline(online);

      listenerHandleRef.current = await Network.addListener("networkStatusChange", async (status) => {
        const serverReachable = await pingServer();
        const online = status.connected && serverReachable;
        console.log("Network status changed:", status, "Server reachable:", serverReachable);
        setIsOnline(online);
      });
    };

    setupNetworkListener().catch((error) => console.error("Error setting up network listener:", error));

    return () => {
      if (listenerHandleRef.current) {
        listenerHandleRef.current.remove();
      }
    };
  }, []);

  // Sync user data with server
  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncData = async () => {
      console.log("Syncing data... Online status:", isOnline);
      if (!isOnline) {
        console.log("Device is offline or server unreachable, skipping sync");
        return;
      }

      try {
        // Sync local unsynced user data to server
        const userData = await getUserDetails();
        if (userData && !userData.synced) {
          console.log("Syncing user:", userData);
          await sendUser(userData);
          console.log("User profile synced with server");
        } else {
          console.log("User already synced or no user data");
        }
      } catch (error) {
        console.error("Error syncing data:", error);
      }
    };

    syncData();
    const interval = setInterval(syncData, 30 * 1000); // 30 seconds for testing
    return () => clearInterval(interval);
  }, [isOnline]);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md py-3 flex justify-between items-center px-4 pt-5 z-1100">
      <Link href="/">
        <h1 className="text-lg font-bold">Vansh</h1>
      </Link>
      <div className="flex gap-3 items-center">
        {isOnline ? <MdOutlineWifi fontSize={25} /> : <MdOutlineWifiOff fontSize={25} />}
        <IoIosNotifications fontSize={25} />
      </div>
    </div>
  );
};

export default Header;