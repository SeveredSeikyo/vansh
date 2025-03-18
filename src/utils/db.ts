// import { openDB } from "idb";

// const DB_NAME = "VanshAppDB";
// const USER_STORE_NAME = "userProfile";
// const EVENT_STORE_NAME = "events";
// const STALL_STORE_NAME = "stalls";

// interface Event {
//   id: number;
//   eventName: string;
//   category: string;
//   image: string;
//   date: string;
//   timings: string;
//   venue: string;
//   teamSize: string;
//   registrationFee: string;
//   prize: string;
//   facultyCoordinator: string;
//   facultyCoordinatorNo: string;
//   studentCoordinator: string;
//   studentCoordinatorNo: string;
//   day: number[];
// }

// interface Stall{
//   auctionName: string;
// }

// // Ensure IndexedDB is only accessed in the browser
// const dbPromise = typeof window !== "undefined"
//   ? openDB(DB_NAME, 1, {
//       upgrade(db) {
//         if (!db.objectStoreNames.contains(USER_STORE_NAME)) {
//           db.createObjectStore(USER_STORE_NAME, { keyPath: "id" });
//         }
//         if (!db.objectStoreNames.contains(EVENT_STORE_NAME)) {
//           db.createObjectStore(EVENT_STORE_NAME, { keyPath: "id", autoIncrement:true }); // Using eventName as key
//         }
//         if (!db.objectStoreNames.contains(STALL_STORE_NAME)) {
//           db.createObjectStore(STALL_STORE_NAME, { keyPath: "id", autoIncrement:true }); // Using eventName as key
//         }
//       },
//     })
//   : null;


  
// // Function to save events individually with auto-incrementing IDs
// export const saveEventsToIndexedDB = async (events: Event[]) => {
//   if (!dbPromise) return;

//   const db = await dbPromise;
//   const tx = db.transaction(EVENT_STORE_NAME, "readwrite");
//   const store = tx.objectStore(EVENT_STORE_NAME);

//   for (const event of events) {
//     if (!event.eventName) {
//       console.warn("Event missing ID, skipping:", event);
//       continue; 
//     }
//     // Check if the event already exists
//     const existingEvent = await store.get(event.eventName);
//     if (existingEvent) {
//       continue; 
//     } else {
//       await store.add(event);
//     }
//   }

//   await tx.done;
//   console.log("Events saved successfully without duplicates!");
// };

// //save stalls
// export const saveStallsToIndexedDB = async (stalls: Stall[]) => {
//   if (!dbPromise) return;
//   const db = await dbPromise;
//   const tx = db.transaction(STALL_STORE_NAME, "readwrite");
//   const store = tx.objectStore(STALL_STORE_NAME);

//   for (const stall of stalls) {
//     if (!stall.auctionName) {
//       console.warn("Event missing ID, skipping:", stall);
//       continue; 
//     }
//     // Check if the event already exists
//     const existingStall = await store.get(stall.auctionName);
//     if (existingStall) {
//       continue; 
//     } else {
//       await store.add(stall);
//     }
//   }

//   await tx.done;
//   console.log("Stalls saved successfully with auto-incrementing IDs!");
// };

// // Function to fetch all events
// export const getEventsFromIndexedDB = async () => {
//   if (!dbPromise) return [];
//   const db = await dbPromise;
//   return await db.getAll(EVENT_STORE_NAME);
// };
  

// // User profile interface
// interface UserProfile {
//   id?: number;
//   name: string;
//   rollNumber: string;
//   branch: string;
//   year: string;
// }


// // Save user details
// export const saveUserDetails = async (userData: UserProfile) => {
//   if (!dbPromise) return;
//   const db = await dbPromise;
//   await db.put(USER_STORE_NAME, { id: 1, ...userData });
// };

// // Get user details
// export const getUserDetails = async (): Promise<UserProfile | null> => {
//   if (!dbPromise) return null;
//   const db = await dbPromise;
//   return (await db.get(USER_STORE_NAME, 1)) || null;
// };

// //Get Event Details
// export const getEventDetails = async (): Promise<Event[]> => {
//   if (!dbPromise) return [];

//   const db = await dbPromise;
//   const tx = db.transaction(EVENT_STORE_NAME, "readonly");
//   const store = tx.objectStore(EVENT_STORE_NAME);

//   const events = await store.getAll(); // ✅ Fetch all events
//   return events || [];
// };

// //Get Stalls Details
// export const getStallDetails = async (): Promise<Stall[]> => {
//   if (!dbPromise) return [];

//   const db = await dbPromise;
//   const tx = db.transaction(STALL_STORE_NAME, "readonly");
//   const store = tx.objectStore(STALL_STORE_NAME);

//   const stalls = await store.getAll(); // ✅ Fetch all events
//   return stalls || [];
// };


import { openDB } from "idb";

const DB_NAME = "VanshAppDB";
const USER_STORE_NAME = "userProfile";
const EVENT_STORE_NAME = "events";
const STALL_STORE_NAME = "stalls";

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

const dbPromise =
  typeof window !== "undefined"
    ? openDB(DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(USER_STORE_NAME)) {
            db.createObjectStore(USER_STORE_NAME, { keyPath: "id" });
          }
          if (!db.objectStoreNames.contains(EVENT_STORE_NAME)) {
            db.createObjectStore(EVENT_STORE_NAME, {
              keyPath: "id",
              autoIncrement: true,
            });
          }
          if (!db.objectStoreNames.contains(STALL_STORE_NAME)) {
            db.createObjectStore(STALL_STORE_NAME, {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      })
    : null;

export const saveEventsToIndexedDB = async (events: Event[]) => {
  if (!dbPromise) return;

  try {
    const db = await dbPromise;
    const tx = db.transaction(EVENT_STORE_NAME, "readwrite");
    const store = tx.objectStore(EVENT_STORE_NAME);

    // Clear the store to start fresh
    await store.clear();

    // Use a Set to track unique eventNames
    const seenEventNames = new Set<string>();

    for (const event of events) {
      if (!event.eventId) {
        console.warn("Event missing eventName, skipping:", event);
        continue;
      }
      if (seenEventNames.has(event.eventId)) {
        console.log(`Duplicate event '${event.eventId}' skipped`);
        continue;
      }
      seenEventNames.add(event.eventId);
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

    // Clear the store to start fresh
    await store.clear();

    // Use a Set to track unique auctionNames
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

// Rest of your functions remain unchanged...
export const getEventsFromIndexedDB = async () => {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return await db.getAll(EVENT_STORE_NAME);
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

interface UserProfile {
  id?: number;
  name: string;
  rollNumber: string;
  branch: string;
  year: string;
}

export const saveUserDetails = async (userData: UserProfile) => {
  if (!dbPromise) return;

  try {
    const db = await dbPromise;
    const tx = db.transaction(USER_STORE_NAME, "readwrite");
    const store = tx.objectStore(USER_STORE_NAME);

    // Clear the store before saving new user data
    await store.clear();

    // Save the new user data with id: 1
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

// Add these to your existing file after the other functions

export const deleteDuplicateEvents = async () => {
  if (!dbPromise) return;

  try {
    const db = await dbPromise;
    const tx = db.transaction(EVENT_STORE_NAME, "readwrite");
    const store = tx.objectStore(EVENT_STORE_NAME);

    const allEvents = await store.getAll();
    const seenEventNames = new Map<string, Event>(); // Map to keep the first occurrence

    // Identify duplicates
    for (const event of allEvents) {
      if (!event.eventName) continue;
      if (seenEventNames.has(event.eventId)) {
        // Delete duplicate by id
        await store.delete(event.id!);
      } else {
        seenEventNames.set(event.eventName, event);
      }
    }

    await tx.done;
    console.log("Duplicate events removed successfully!");
  } catch (error) {
    console.error("Error deleting duplicate events:", error);
  }
};

export const deleteDuplicateStalls = async () => {
  if (!dbPromise) return;

  try {
    const db = await dbPromise;
    const tx = db.transaction(STALL_STORE_NAME, "readwrite");
    const store = tx.objectStore(STALL_STORE_NAME);

    const allStalls = await store.getAll();
    const seenAuctionNames = new Map<string, Stall>(); // Map to keep the first occurrence

    // Identify duplicates
    for (const stall of allStalls) {
      if (!stall.auctionName) continue;
      if (seenAuctionNames.has(stall.auctionName)) {
        // Delete duplicate by id
        await store.delete(stall.id!);
      } else {
        seenAuctionNames.set(stall.auctionName, stall);
      }
    }

    await tx.done;
    console.log("Duplicate stalls removed successfully!");
  } catch (error) {
    console.error("Error deleting duplicate stalls:", error);
  }
};

// New function: Get single event by ID
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
