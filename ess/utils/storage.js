import { MMKV } from 'react-native-mmkv';

let storage = null;

// Lazy init (VERY IMPORTANT)
const getStorage = () => {
  if (!storage) {
    if (!global.nativeCallSyncHook) {
      console.log('MMKV not ready yet (JSI not available)');
      return null;
    }
    storage = new MMKV({
      id: 'mentrixos-session',
      encryptionKey: 'mentrixos-mobile-session-key',
    });
  }
  return storage;
};

// SET
export const setItem = (key, value) => {
  const s = getStorage();
  if (!s) return;
  s.set(key, JSON.stringify(value));
};

// GET
export const getItem = (key) => {
  const s = getStorage();
  if (!s) return null;

  const value = s.getString(key);
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

// REMOVE
export const removeItem = (key) => {
  const s = getStorage();
  if (!s) return;
  s.delete(key);
};

// CLEAR
export const clearAll = () => {
  const s = getStorage();
  if (!s) return;
  s.clearAll();
};
