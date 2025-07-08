import { useEffect, useRef } from 'react';

/**
 * useInterval
 * -----------------------------
 * Runs a callback on a fixed interval (like `setInterval`), with proper cleanup and reference stability.
 *
 * 🔧 When to use:
 * - Polling APIs
 * - Timer-based counters, clocks, etc.
 * - Delayed or periodic updates
 *
 * @param callback Function to run every `delay` ms
 * @param delay Time in milliseconds; pass `null` to pause
 *
 * ✅ Example:
 * ```tsx
 * useInterval(() => {
 *   console.log('tick');
 * }, 1000);
 * ```
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
}