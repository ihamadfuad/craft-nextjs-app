import { useEffect, useRef } from 'react';

/**
 * useEventListener
 * -----------------------------
 * Adds an event listener to a target and removes it on cleanup.
 *
 * 🔧 When to use:
 * - Listen for events on window, document, or any DOM element
 * - Avoid manual add/remove logic
 * - Keep handler references stable
 *
 * @param eventName Event name like 'scroll', 'click', etc.
 * @param handler Function to handle the event
 * @param element Target to attach to (defaults to `window`)
 *
 * ✅ Example:
 * ```tsx
 * useEventListener('keydown', handleKeyPress);
 * ```
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | Document | HTMLElement | null = window
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const target = element ?? window;
    if (!(target && target.addEventListener)) return;

    const eventListener = (event: Event) => savedHandler.current(event as WindowEventMap[K]);
    target.addEventListener(eventName, eventListener);

    return () => target.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
}