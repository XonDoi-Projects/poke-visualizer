import { PokeDetails } from "@/utils";

const dbName = "PokemonDB";
const storeName = "pokemonStore";

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to open IndexedDB");
  });
};

const withStore = async (
  mode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => void
): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(storeName, mode);
  const store = transaction.objectStore(storeName);
  callback(store);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject("Transaction failed");
  });
};

export const setPokemonData = async (pokeData: PokeDetails[]) => {
  try {
    await withStore("readwrite", (store) => {
      pokeData.forEach((pokemon) => {
        store.put(pokemon);
      });
    });
    console.log("Pokémon data stored successfully in IndexedDB.");
  } catch (error) {
    console.error("Failed to store Pokémon data in IndexedDB", error);
  }
};

export const checkPokemonData = async () => {
  try {
    let result = false;
    await withStore("readonly", (store) => {
      const request = store.count();
      request.onsuccess = () => {
        result = request.result > 0;
      };
    });
    return result;
  } catch (error) {
    console.error("Failed to check Pokémon data in IndexedDB", error);
    return false;
  }
};

export const getPokemonData = async () => {
  try {
    let result: PokeDetails[] = [];
    await withStore("readonly", (store) => {
      const request = store.getAll();
      request.onsuccess = () => {
        result = request.result;
      };
    });
    return result;
  } catch (error) {
    console.error("Failed to load Pokémon data in IndexedDB", error);
    return;
  }
};
