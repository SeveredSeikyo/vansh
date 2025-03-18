import { openDB } from "idb";

const DB_NAME = "VanshAppDB";
const USER_STORE_NAME = "userProfile";
const EVENT_STORE_NAME = "events";
const STALL_STORE_NAME = "stalls";

interface Event {
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

interface Stall{
  auctionName: string
}

// Ensure IndexedDB is only accessed in the browser
const dbPromise = typeof window !== "undefined"
  ? openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(USER_STORE_NAME)) {
          db.createObjectStore(USER_STORE_NAME, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(EVENT_STORE_NAME)) {
          db.createObjectStore(EVENT_STORE_NAME, { keyPath: "id", autoIncrement:true }); // Using eventName as key
        }
        if (!db.objectStoreNames.contains(STALL_STORE_NAME)) {
          db.createObjectStore(STALL_STORE_NAME, { keyPath: "id", autoIncrement:true }); // Using eventName as key
        }
      },
    })
  : null;


  
// Function to save events individually with auto-incrementing IDs
export const saveEventsToIndexedDB = async (events: any[]) => {
  if (!dbPromise) return;
  const db = await dbPromise;
  const tx = db.transaction(EVENT_STORE_NAME, "readwrite");
  const store = tx.objectStore(EVENT_STORE_NAME);

  for (const event of events) {
    await store.add(event); // `add` ensures auto-increment works
  }

  await tx.done;
  console.log("Events saved successfully with auto-incrementing IDs!");
};

//save stalls
export const saveStallsToIndexedDB = async (stalls: any[]) => {
  if (!dbPromise) return;
  const db = await dbPromise;
  const tx = db.transaction(STALL_STORE_NAME, "readwrite");
  const store = tx.objectStore(STALL_STORE_NAME);

  for (const stall of stalls) {
    await store.add(stall); // `add` ensures auto-increment works
  }

  await tx.done;
  console.log("Stalls saved successfully with auto-incrementing IDs!");
};

// Function to fetch all events
export const getEventsFromIndexedDB = async () => {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return await db.getAll(EVENT_STORE_NAME);
};
  

// User profile interface
interface UserProfile {
  id?: number;
  name: string;
  rollNumber: string;
  branch: string;
  year: string;
}


// Save user details
export const saveUserDetails = async (userData: UserProfile) => {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.put(USER_STORE_NAME, { id: 1, ...userData });
};

// Get user details
export const getUserDetails = async (): Promise<UserProfile | null> => {
  if (!dbPromise) return null;
  const db = await dbPromise;
  return (await db.get(USER_STORE_NAME, 1)) || null;
};

//Get Event Details
export const getEventDetails = async (): Promise<Event[]> => {
  if (!dbPromise) return [];

  const db = await dbPromise;
  const tx = db.transaction(EVENT_STORE_NAME, "readonly");
  const store = tx.objectStore(EVENT_STORE_NAME);

  const events = await store.getAll(); // ✅ Fetch all events
  return events || [];
};
