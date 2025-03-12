"use client"; // Ensures it runs only on the client

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { App } from "@capacitor/app";
import { PluginListenerHandle } from "@capacitor/core";

export default function BackButtonHandler() {
  const pathname = usePathname(); // Get the current route
  const router = useRouter();

  useEffect(() => {
    let backButtonListener: PluginListenerHandle | null = null;

    const setupListener = async () => {
      backButtonListener = await App.addListener("backButton", () => {
        if (pathname === "/" || pathname==="/dashboard/" || pathname==="/map/" || pathname==="/lost/" || pathname==="/profile/") {
          App.exitApp(); // Exit app if on the home page
        } else {
          router.back(); // Navigate back
        }
      });
    };

    setupListener();

    return () => {
      if (backButtonListener) {
        backButtonListener.remove();
      }
    };
  }, [pathname, router]);

  return null; // No UI needed
}
