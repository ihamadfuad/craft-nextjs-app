This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## How to Use This Starter

1. **Explore the File Structure**  
   Get familiar with the folders inside `/app`, `/components`, `/lib`, `/features`, and `/context`. These are structured to promote scalability and separation of concerns.

2. **Use Built-in Hooks**  
   Use any of the custom hooks under `features/hooks` or `lib/hooks`. For example:
   ```tsx
   const isMobile = useIsMobile();
   ```

3. **Work with Context**  
   Access global state via the provided contexts. Example:
   ```tsx
   const { user, logout } = useAuth();
   ```

4. **Add Pages**  
   Add routes inside the `app/` directory. Pages are colocated with their layout and styles.

5. **Add or Customize UI**  
   Use `components/ui` (ShadCN UI) for ready-made components or add your own under `components/`.

6. **Fetch Data**  
   Use `useFetch()` or extend `features/models` for API logic.

7. **Add New Features**  
   Group your new logic in `features/` with `hooks/` and `models/` to keep it modular.

This starter is designed to grow with you — whether you're prototyping quickly or building production-grade apps.

## Why This Project Exists

This starter is crafted to help developers confidently build modern web apps using [Next.js](https://nextjs.org). Whether you're just getting started or want a clean, thoughtful foundation — this is for you.

## How to Get Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

You can start editing the homepage by modifying `app/page.tsx`. The page updates live as you save your changes.

## Project Structure Overview

- `public/` — static files (images, icons, etc.)
- `app/` — your main application routes, styles and layout
- `assets/localizations` — your main application localizations
- `components/` — shared UI components
    - `components/ui` — shared UI shadcn components
    
      ShadCN UI is integrated using [shadcn/ui](https://ui.shadcn.dev), providing a set of customizable, accessible, and themeable components.

      You can:
      - Build UI fast using ready-made building blocks
      - Customize components with Tailwind and variants
    - `components/` — developer UI components
- `context/` — global state shared via React Context
- `features/` — your data modals and custom hooks
    - `features/hooks` — your custom hooks
    - `features/models` — your api & app data modals
- `lib/` — reusable logic like hooks, utilities, and API helpers
- `pages/` — your pages

## What Are Hooks?

Hooks are functions that let you use React features (like state or lifecycle) inside functional components.

Available hooks:
- `useIsMobile()` — store local component state
- `useState()` — store local component state
- `useEffect()` — run side effects on mount/update
- Custom hooks to keep your code reusable and clean:
    - `useClickOutside()` - Detects clicks or touches outside a given element and triggers a callback.
    - `useDebounce()` - Debounces a changing value by a given delay.
    - `useEventListener()` - Adds an event listener to a target and removes it on cleanup.
    - `useFeatureFlag()` - Returns whether a named feature flag is enabled.
    - `useFetch()` - A custom hook to fetch data from any API endpoint with loading and error state handling.
    - `useInterval` - Runs a callback on a fixed interval (like `setInterval`), with proper cleanup and reference stability.
    - `useIsClient` - A React hook to detect whether the component has mounted on the client side.
    - `useKeyPress` - Detects when a specific key or key combination is pressed.
    - `useLocalStorage` - Syncs React state with localStorage. Automatically updates localStorage when state changes.
    - `useResponsive` - Returns booleans indicating which breakpoint the viewport matches.

## What is Context?

Context is a way to share state across the entire app without passing props manually. Use it for things like:

- Authentication (user session)
- Localization
- Session Storage
- Theme switching (light/dark)
- Feature flags

## What is lib?

Lib is a reusable logic like utilities, app, and API function helpers

- Cookies manager
- Form validation
- Localization
- Logger
- Utility

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) — explore advanced features.
- [React Docs](https://react.dev/learn) — learn the modern way to build with React.
- [Vercel](https://vercel.com) — deploy your app in seconds.
