import { useEffect, useState, useCallback } from 'react';

/**
 * useFetch
 * -----------------------------
 * A custom hook to fetch data from any API endpoint with loading and error state handling.
 *
 * 🔧 When to use:
 * - Fetch data from a REST or serverless endpoint on component mount or manually
 * - Simplify async operations inside components
 * - Replace useEffect + fetch boilerplate
 *
 * @param url API endpoint or fetch request input
 * @param options Fetch options like method, headers, body, etc.
 * @param immediate If true (default), fetches immediately on mount
 *
 * @returns {
 *   data: T | null,
 *   error: string | null,
 *   loading: boolean,
 *   refetch: () => void
 * }
 *
 * ✅ Example:
 * ```tsx
 * const { data, loading, error, refetch } = useFetch('/api/user');
 * ```
 */
export function useFetch<T = any>(
  url: string,
  options?: RequestInit,
  immediate: boolean = true
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const json = await response.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]); // re-fetch if url or options change

  useEffect(() => {
    if (immediate) fetchData();
  }, [fetchData, immediate]);

  return { data, loading, error, refetch: fetchData };
}