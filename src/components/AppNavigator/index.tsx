"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { App } from "@capacitor/app"; 
import type { PluginListenerHandle } from "@capacitor/core"; // ✅ Correct import

const AppNavigator = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let backListener: PluginListenerHandle | null = null; // ✅ Ensure it's nullable

    const setupBackListener = async () => {
      backListener = await App.addListener("backButton", () => {
        if (pathname === "/map") {
          router.push("/dashboard");
        } else if (pathname === "/lost-and-found") {
          router.push("/map");
        }
      });
    };

    setupBackListener();

    return () => {
      if (backListener) backListener.remove();
    };
  }, [pathname, router]);

  return null;
};

export default AppNavigator;
