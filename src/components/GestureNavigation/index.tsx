"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const GestureNavigation = () => {
  const pathname = usePathname(); // ✅ Use `usePathname()`
  const router = useRouter();
  const gestureRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure it only runs on the client

    import("hammerjs").then((Hammer) => {
      const element = gestureRef.current;
      if (!element) return;

      const hammer = new Hammer.default(element); // ✅ Use `.default`

      hammer.on("swipeleft", () => {
        if (pathname === "/dashboard") {
          router.push("/map");
        } else if (pathname === "/map") {
          router.push("/lost-and-found");
        }
      });

      hammer.on("swiperight", () => {
        if (pathname === "/lost-and-found") {
          router.push("/map");
        } else if (pathname === "/map") {
          router.push("/dashboard");
        }
      });

      hammer.on("swipeup", () => {
        alert("Opening Notifications!");
      });

      hammer.on("swipedown", () => {
        window.location.reload();
      });

      return () => {
        hammer.destroy();
      };
    });
  }, [pathname, router]); // ✅ Use `pathname` instead of `router.pathname`

  return <div ref={gestureRef} style={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0 }} />;
};

export default GestureNavigation;
