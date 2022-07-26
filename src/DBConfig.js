import { openDB } from "idb";

const PRESENTATION_STORE = "Presentations";

export function initDB() {
  return openDB("Open-slide", 1, {
    upgrade(db) {
      const store = db.createObjectStore(PRESENTATION_STORE, {
        keyPath: "id",
      });

      store.createIndex("id", "id");
    },
  });
}  

export async function setRessources(data = []) {
  const db = await initDB();
  const tx = db.transaction(PRESENTATION_STORE, "readwrite");
  data.forEach((item) => {
    tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex(PRESENTATION_STORE, "id");
}

export async function setRessource(data = {}) {
  const db = await initDB();
  const tx = db.transaction(PRESENTATION_STORE, "readwrite");
  console.log(data);
  tx.store.put(data);
  await tx.done;
  return db.getFromIndex(PRESENTATION_STORE, "id", data.id);
}

export async function getRessources() {
  const db = await initDB();
  return db.getAllFromIndex(PRESENTATION_STORE, "id");
}

export async function getRessource(id) {
  const db = await initDB();
  return db.getFromIndex(PRESENTATION_STORE, "id", id);
}

export async function unsetRessource(id) {
  const db = await initDB();
  await db.delete(PRESENTATION_STORE, id);
}
