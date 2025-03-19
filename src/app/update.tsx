"use client";
import { useEffect, useState } from "react";
import { VersionChecker, VersionInfo } from "@/lib/versionChecker";
import UpdatePopup from "../components/UpdatePopup";

const Update = () => {
  const [updateInfo, setUpdateInfo] = useState<VersionInfo | null>(null);

  useEffect(() => {
    const checkVersion = async () => {
      const newVersion = await VersionChecker.checkForUpdates();
      if (newVersion) {
        setUpdateInfo(newVersion);
      }
    };

    checkVersion();
    const interval = setInterval(checkVersion, 24 * 60 * 60 * 1000); // Check every 24 hours

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {updateInfo && (
        <UpdatePopup
          versionInfo={updateInfo}
          onDismiss={() => setUpdateInfo(null)}
        />
      )}
    </>
  );
};

export default Update;