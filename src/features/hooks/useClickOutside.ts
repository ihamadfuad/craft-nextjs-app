import { useEffect } from 'react';

/**
 * useClickOutside
 * -----------------------------
 * Detects clicks or touches outside a given element and triggers a callback.
 *
 * 🔧 When to use:
 * - Close dropdowns, modals, popovers when the user clicks outside
 * - Dismiss tooltips or menus
 *
 * @param ref React ref of the element to detect outside clicks
 * @param handler Callback function when outside click occurs
 *
 * ✅ Example:
 * ```tsx
 * const ref = useRef(null);
 * useClickOutside(ref, () => setOpen(false));
 * ```
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}