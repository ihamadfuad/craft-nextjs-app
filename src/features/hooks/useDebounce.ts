import { useEffect, useState } from 'react';

/**
 * useDebounce
 * -----------------------------
 * Debounces a changing value by a given delay.
 * Only updates the returned value after the delay has passed without further changes.
 *
 * 🔧 When to use:
 * - Delay input-driven operations like API calls, validation, or filtering
 * - Improve performance in autocomplete, search, live typing scenarios
 * - Prevent excessive re-renders or network requests
 *
 * @param value The value to debounce
 * @param delay Time in milliseconds to wait before updating the debounced value
 * @returns The debounced value
 *
 * ✅ Example:
 * ```tsx
 * const [query, setQuery] = useState('');
 * const debouncedQuery = useDebounce(query, 300);
 *
 * useEffect(() => {
 *   if (debouncedQuery) {
 *     fetchResults(debouncedQuery);
 *   }
 * }, [debouncedQuery]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}