import { useEffect, useState } from 'react';

/**
 * useKeyPress
 * -----------------------------
 * Detects when a specific key or key combination is pressed.
 *
 * 🔧 When to use:
 * - Keyboard shortcuts (e.g., 'Escape', 'Enter', 'Meta+K')
 * - Toggle state with hotkeys
 * - Enhance accessibility and UX
 *
 * @param targetKey The key to listen for (e.g. 'Escape', 'Enter', 'a', 'ArrowUp')
 * @returns boolean Whether the key is currently pressed
 *
 * ✅ Example:
 * ```tsx
 * const isPressed = useKeyPress('Escape');
 * useEffect(() => {
 *   if (isPressed) closeModal();
 * }, [isPressed]);
 * ```
 */
export function useKeyPress(targetKey: string): boolean {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) setPressed(true);
    };
    const upHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) setPressed(false);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return pressed;
}