import { useState, useEffect } from 'react';

/**
 * useLocalStorage
 * -----------------------------
 * Syncs React state with localStorage. Automatically updates localStorage when state changes.
 *
 * 🔧 When to use:
 * - Persist user preferences, theme, auth tokens, or form data
 * - Restore state between sessions
 * - Avoid server-rendering issues (only runs on client)
 *
 * @param key LocalStorage key to read/write
 * @param initial Initial value if key not found
 *
 * ✅ Example:
 * ```tsx
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * ```
 */
export function useLocalStorage<T>(key: string, initial: T): [T, (val: T) => void] {
  const isClient = typeof window !== 'undefined';

  const readValue = (): T => {
    if (!isClient) return initial;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch (err) {
      console.warn(`Error reading localStorage key "${key}":`, err);
      return initial;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  useEffect(() => {
    if (!isClient) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.warn(`Error setting localStorage key "${key}":`, err);
    }
  }, [key, storedValue, isClient]);

  return [storedValue, setStoredValue];
}