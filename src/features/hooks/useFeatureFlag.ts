import { useState, useEffect } from 'react';

/**
 * useFeatureFlag
 * -----------------------------
 * Returns whether a named feature flag is enabled.
 *
 * 🔧 When to use:
 * - Toggle features on/off for A/B tests or gradual rollouts
 * - Hide unfinished or restricted components
 * - Combine with remote config or localStorage
 *
 * @param key Feature flag key (e.g. 'new-dashboard', 'betaMode')
 * @param source Optional source to read flags from (default: localStorage['featureFlags'])
 * @returns boolean
 *
 * ✅ Example:
 * ```tsx
 * const showBeta = useFeatureFlag('betaMode');
 * if (!showBeta) return null;
 * ```
 */
export function useFeatureFlag(key: string, source?: Record<string, boolean>): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let flags: Record<string, boolean> = {};

    if (source) {
      flags = source;
    } else if (typeof window !== 'undefined') {
      try {
        const local = localStorage.getItem('featureFlags');
        if (local) flags = JSON.parse(local);
      } catch (err) {
        console.warn('Invalid featureFlags in localStorage');
      }
    }

    setEnabled(flags[key] === true);
  }, [key, source]);

  return enabled;
}