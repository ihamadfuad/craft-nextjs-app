'use client';

import { useEffect, useState } from 'react';

/**
 * useIsClient
 * -----------------------------
 * A React hook to detect whether the component has mounted on the client side.
 *
 * 🔧 When to use:
 * - To avoid hydration mismatches in SSR environments like Next.js
 * - When accessing client-only APIs like `window`, `document`, `localStorage`, or `matchMedia`
 * - When delaying rendering of client-only content until after hydration
 *
 * @returns {boolean} `true` if running on the client, `false` during SSR or before hydration
 *
 * ✅ Example:
 * ```tsx
 * const isClient = useIsClient();
 *
 * return (
 *   <div>
 *     {isClient ? <ClientOnlyComponent /> : <p>Loading...</p>}
 *   </div>
 * );
 * ```
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will only run on the client, after hydration
    setIsClient(true);
  }, []);

  return isClient;
}