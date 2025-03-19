"use client";
// pages/_app.tsx
import { useEffect, useState } from "react";
import { VersionChecker, VersionInfo } from "@/lib/versionChecker";
import UpdatePopup from "../components/UpdatePopup";
import { registerPlugin, PluginListenerHandle } from "@capacitor/core";
import { Item, saveItem, getAllItems } from "@/utils/db";

// Define the plugin interface
interface NearbyConnectionsPlugin {
  addListener: (
    eventName: "onDataReceived",
    callback: (data: Item) => void
  ) => Promise<PluginListenerHandle>;
}

const NearbyConnections = registerPlugin<NearbyConnectionsPlugin>("NearbyConnections");

const Update = () => {
  const [receivedData, setReceivedData] = useState<Item[]>([]);
  console.log(receivedData);
  const [updateInfo, setUpdateInfo] = useState<VersionInfo | null>(null);

  useEffect(() => {
    let listener: PluginListenerHandle | undefined;

    async function initializeNearby() {
      try {
        listener = await NearbyConnections.addListener(
          "onDataReceived",
          async (data: Item) => {
            console.log("Received Data:", data);

            const existingItems = await getAllItems();
            const itemExists = existingItems.some((item) => item.itemId === data.itemId);

            if (!itemExists) {
              await saveItem(data);
              console.log("New item saved:", data);
              setReceivedData((prev) => [...prev, data]);
            } else {
              console.log(`Item with itemId '${data.itemId}' already exists in IndexedDB, skipping save.`);
            }
          }
        );
      } catch (error) {
        console.error("Error initializing Nearby Connections:", error);
      }
    }

    initializeNearby();

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, []);

  useEffect(() => {
    const checkVersion = async () => {
      const newVersion = await VersionChecker.checkForUpdates();
      if (newVersion) {
        setUpdateInfo(newVersion);
      }
    };

    checkVersion();
    const interval = setInterval(checkVersion, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Now using receivedData in the render
  return (
    <>
      {/* {receivedData.length > 0 && (
        <div>
          <h2>Received Items: {receivedData.length}</h2>
          <ul>
            {receivedData.map((item) => (
              <li key={item.itemId}>{item.itemId}</li>
            ))}
          </ul>
        </div>
      )} */}
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