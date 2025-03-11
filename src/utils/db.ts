import { openDB } from "idb";

const DB_NAME = "VanshAppDB";
const STORE_NAME = "userProfile";

// Ensure IndexedDB is only accessed in the browser
const dbPromise = typeof window !== "undefined"
  ? openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      },
    })
  : null;

interface UserProfile {
  id?: number;
  name: string;
  rollNumber: string;
  branch: string;
  year: string;
}

// Save user details
export const saveUserDetails = async (userData: UserProfile) => {
  if (!dbPromise) return; // Skip on server
  const db = await dbPromise;
  await db.put(STORE_NAME, { id: 1, ...userData });
};

// Get user details
export const getUserDetails = async (): Promise<UserProfile | null> => {
  if (!dbPromise) return null; // Skip on server
  const db = await dbPromise;
  return (await db.get(STORE_NAME, 1)) || null;
};
