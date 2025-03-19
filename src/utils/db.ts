import { openDB } from "idb";

const DB_NAME = "VanshAppDB";
const USER_STORE_NAME = "userProfile";
const EVENT_STORE_NAME = "events";
const STALL_STORE_NAME = "stalls";
const ITEM_STORE_NAME = "items";

interface Event {
  id?: number;
  eventId: string;
  eventName: string;
  category: string;
  image: string;
  date: string;
  timings: string;
  venue: string;
  teamSize: string;
  registrationFee: string;
  prize: string;
  facultyCoordinator: string;
  facultyCoordinatorNo: string;
  studentCoordinator: string;
  studentCoordinatorNo: string;
  day: number[];
}

interface Stall {
  auctionName: string;
}

export interface Item {
  id: string;
  itemId: string;
  name: string;
  location: string;
  time: string;
  status: string;
  user: string;
  action: "CREATE" | "DELETE";
  synced?: boolean; // New field, optional initially
}

interface UserProfile {
  id?: number;
  name: string;
  rollNumber: string;
  branch: string;
  year: string;
  synced?: boolean; // New field, optional initially
}

const ALL_STORES = [
  USER_STORE_NAME,
  EVENT_STORE_NAME,
  STALL_STORE_NAME,
  ITEM_STORE_NAME,
];

const EXPECTED_VERSION = ALL_STORES.length + 1; // Bump to 5 to trigger upgrade

const dbPromise =
  typeof window !== "undefined"
    ? openDB(DB_NAME, EXPECTED_VERSION, {
        upgrade(db, oldVersion, newVersion) {
          console.log(`Upgrading from version ${oldVersion} to ${newVersion}`);
          if (!db.objectStoreNames.contains(USER_STORE_NAME)) {
            db.createObjectStore(USER_STORE_NAME, { keyPath: "id" });
          } else {
            // Add synced field to existing store (not directly possible, but ensure new entries have it)
          }
          if (!db.objectStoreNames.contains(EVENT_STORE_NAME)) {
            db.createObjectStore(EVENT_STORE_NAME, { keyPath: "id", autoIncrement: true });
          }
          if (!db.objectStoreNames.contains(STALL_STORE_NAME)) {
            db.createObjectStore(STALL_STORE_NAME, { keyPath: "id", autoIncrement: true });
          }
          if (!db.objectStoreNames.contains(ITEM_STORE_NAME)) {
            db.createObjectStore(ITEM_STORE_NAME, { keyPath: "id" });
          }
          console.log("Stores after upgrade:", Array.from(db.objectStoreNames));
        },
      })
    : null;

// Existing functions (unchanged for brevity)
export const saveUserDetails = async (userData: UserProfile) => {
  if (!dbPromise) return;
  try {
    const db = await dbPromise;
    const tx = db.transaction(USER_STORE_NAME, "readwrite");
    const store = tx.objectStore(USER_STORE_NAME);
    await store.clear();
    await store.put({ id: 1, ...userData });
    await tx.done;
    console.log("User details saved successfully after clearing store!");
  } catch (error) {
    console.error("Error saving user details:", error);
  }
};

export const getUserDetails = async (): Promise<UserProfile | null> => {
  if (!dbPromise) return null;
  const db = await dbPromise;
  return (await db.get(USER_STORE_NAME, 1)) || null;
};

export const saveEventsToIndexedDB = async (events: Event[]) => {
  if (!dbPromise) return;
  try {
    const db = await dbPromise;
    const tx = db.transaction(EVENT_STORE_NAME, "readwrite");
    const store = tx.objectStore(EVENT_STORE_NAME);
    await store.clear();
    const seenEventNames = new Set<string>();
    for (const event of events) {
      if (!event.eventName) {
        console.warn("Event missing eventName, skipping:", event);
        continue;
      }
      if (seenEventNames.has(event.eventName)) {
        console.log(`Duplicate event '${event.eventName}' skipped`);
        continue;
      }
      seenEventNames.add(event.eventName);
      await store.add(event);
    }
    await tx.done;
    console.log("Events saved successfully without duplicates!");
  } catch (error) {
    console.error("Error saving events:", error);
  }
};

export const saveStallsToIndexedDB = async (stalls: Stall[]) => {
  if (!dbPromise) return;
  try {
    const db = await dbPromise;
    const tx = db.transaction(STALL_STORE_NAME, "readwrite");
    const store = tx.objectStore(STALL_STORE_NAME);
    await store.clear();
    const seenAuctionNames = new Set<string>();
    for (const stall of stalls) {
      if (!stall.auctionName) {
        console.warn("Stall missing auctionName, skipping:", stall);
        continue;
      }
      if (seenAuctionNames.has(stall.auctionName)) {
        console.log(`Duplicate stall '${stall.auctionName}' skipped`);
        continue;
      }
      seenAuctionNames.add(stall.auctionName);
      await store.add(stall);
    }
    await tx.done;
    console.log("Stalls saved successfully without duplicates!");
  } catch (error) {
    console.error("Error saving stalls:", error);
  }
};

export const getEventDetails = async (): Promise<Event[]> => {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return (await db.getAll(EVENT_STORE_NAME)) || [];
};

export const getStallDetails = async (): Promise<Stall[]> => {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return (await db.getAll(STALL_STORE_NAME)) || [];
};

export const getEventById = async (eventId: string): Promise<Event | null> => {
  if (!dbPromise) {
    console.error("Database is not initialized");
    return null;
  }

  try {
    const db = await dbPromise;
    const tx = db.transaction(EVENT_STORE_NAME, "readonly");
    const store = tx.objectStore(EVENT_STORE_NAME);

    // Get all events and filter
    const allEvents: Event[] = await store.getAll();
    const event = allEvents.find(event => event.eventId === eventId);

    console.log("Fetched event:", event); // Debugging log

    return event || null;
  } catch (error) {
    console.error(`Error fetching event with eventId ${eventId}:`, error);
    return null;
  }
};

export const saveItem = async (item: Item): Promise<void> => {
  if (!dbPromise) return;
  try {
    const db = await dbPromise;
    const tx = db.transaction(ITEM_STORE_NAME, "readwrite");
    const store = tx.objectStore(ITEM_STORE_NAME);
    await store.put({ ...item, action: item.action || "CREATE" });
    await tx.done;
    console.log(`Item '${item.name}' saved with id '${item.id}' and action '${item.action}'`);
  } catch (error) {
    console.error("Error saving item:", error);
    throw error;
  }
};

export const deleteItem = async (id: string): Promise<void> => {
  if (!dbPromise) return;
  try {
    const db = await dbPromise;
    const tx = db.transaction(ITEM_STORE_NAME, "readwrite");
    const store = tx.objectStore(ITEM_STORE_NAME);
    await store.delete(id);
    await tx.done;
    console.log(`Item with id '${id}' deleted successfully`);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export const getAllItems = async (): Promise<Item[]> => {
  if (!dbPromise) return [];
  try {
    const db = await dbPromise;
    const tx = db.transaction(ITEM_STORE_NAME, "readonly");
    const store = tx.objectStore(ITEM_STORE_NAME);
    const items = await store.getAll();
    await tx.done;
    return items || [];
  } catch (error) {
    console.error("Error fetching all items:", error);
    return [];
  }
};

export const sendItems = async (newItem: Item): Promise<void> => {
  try {
    const url = newItem.action === "DELETE" ? "http://localhost:5000/deleteItem" : "http://localhost:5000/insertItem";
    const method = newItem.action === "DELETE" ? "DELETE" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Item sent to server successfully:", result);

    // Mark as synced
    await saveItem({ ...newItem, synced: true });
  } catch (error) {
    console.error("Error sending item to server:", error);
    throw error;
  }
};

export const sendUser = async (userData: UserProfile): Promise<void> => {
  try {
    const response = await fetch("http://localhost:5000/insertUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const result = await response.json();
    console.log("User sent to server successfully:", result);

    // Mark as synced
    await saveUserDetails({ ...userData, synced: true });
  } catch (error) {
    console.error("Error sending user to server:", error);
    throw error;
  }
};

export const fetchServerItems = async (): Promise<Item[]> => {
  try {
    const response = await fetch("http://localhost:5000/lflist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const serverItems: Item[] = await response.json();
    return serverItems.map((item) => ({
      ...item,
      id: item.itemId, // Use itemId as local id if no separate id exists
      synced: true,    // Server items are already synced
    }));
  } catch (error) {
    console.error("Error fetching server items:", error);
    return [];
  }
};

// Sync server items with local IndexedDB
export const syncServerItemsToLocal = async (): Promise<void> => {
  if (!dbPromise) return;

  const serverItems = await fetchServerItems();
  const db = await dbPromise;
  const tx = db.transaction(ITEM_STORE_NAME, "readwrite");
  const store = tx.objectStore(ITEM_STORE_NAME);

  // Get all local items
  const localItems = await store.getAll();
  const localItemMap = new Map(localItems.map((item) => [item.itemId, item]));

  // Update or insert server items
  for (const serverItem of serverItems) {
    const localItem = localItemMap.get(serverItem.itemId);
    if (!localItem) {
      // New item from server, insert locally
      await store.put(serverItem);
      console.log(`Inserted new server item: ${serverItem.itemId}`);
    } else if (localItem.action !== serverItem.action) {
      // Action changed (e.g., CREATE -> DELETE), update locally
      await store.put({ ...localItem, action: serverItem.action, synced: true });
      console.log(`Updated item action: ${serverItem.itemId} from ${localItem.action} to ${serverItem.action}`);
    }
    localItemMap.delete(serverItem.itemId); // Remove from map to track unprocessed local items
  }

  // Optionally: Handle local items not on server (e.g., delete if not synced)
  for (const [itemId, localItem] of localItemMap) {
    if (!localItem.synced) {
      // Local item wasn’t on server and isn’t synced, keep it for now
      console.log(`Local unsynced item retained: ${itemId}`);
    }
  }

  await tx.done;
};