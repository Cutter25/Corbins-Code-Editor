import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

export const putDb = async (content) => {

  // edited to console.log what method I am using lol

  console.log('PUT to the database');

  // Connect to the database created above

  const contactDb = await openDB('jate', 1);

  // Create a transaction and specify the permissions. In this case with a put, I want to wread and write

  const tx = contactDb.transaction('jate', 'readwrite');

  // Open the store up

  const store = tx.objectStore('jate');

  // Putting content into the database

  const request = store.put({ id: 1, value: content });

  // Confirming what I want to happen, happened

  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database

export const getDb = async () => {
  console.log('getAllDb trying to work!');
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
