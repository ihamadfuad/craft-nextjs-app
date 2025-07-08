import { useEffect, useState } from 'react';

/**
 * useResponsive
 * -----------------------------
 * Returns booleans indicating which breakpoint the viewport matches.
 *
 * 🔧 When to use:
 * - Conditionally render components for mobile/desktop
 * - Trigger layout changes in JS based on screen size
 * - Avoid using window.matchMedia manually
 *
 * ✅ Default breakpoints:
 * - Mobile: < 640px
 * - Tablet: 640px–1023px
 * - Desktop: ≥ 1024px
 *
 * ✅ Example:
 * ```tsx
 * const { isMobile, isTablet, isDesktop } = useResponsive();
 * ```
 */
export function useResponsive() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize(); // initial call

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isMobile: width !== null && width < 640,
    isTablet: width !== null && width >= 640 && width < 1024,
    isDesktop: width !== null && width >= 1024,
  };
}