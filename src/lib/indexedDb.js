import { openDB } from "idb";

const DB_NAME = "notes-db";
const STORE_NAME = "notes";

let dbPromise;

function initDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      },
    });
  }
  return dbPromise;
}

export async function getAllNotes() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function saveNote(note) {
  const db = await initDB();
  await db.put(STORE_NAME, note);
}

export async function deleteNote(id) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}

export async function getNote(id) {
  const db = await initDB();
  return db.get(STORE_NAME, id);
}
