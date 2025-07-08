This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

- `app/` — your main application routes and layout
- `lib/` — reusable logic like hooks, utilities, and API helpers
- `components/` — shared UI components
- `context/` — global state shared via React Context
- `public/` — static files (images, icons, etc.)
- `styles/` — global styles

## What Are Hooks?

Hooks are functions that let you use React features (like state or lifecycle) inside functional components.

Examples:
- `useState()` — store local component state
- `useEffect()` — run side effects on mount/update
- Custom hooks like `useFetch()` and `useDebounce()` keep your code reusable and clean.

## What is Context?

Context is a way to share state across the entire app without passing props manually. Use it for things like:

- Authentication (user session)
- Theme switching (light/dark)
- Feature flags

You can create and access context via:

```tsx
const MyContext = createContext();
const value = useContext(MyContext);
```

Or wrap it in a custom `useAuth()` hook for better DX.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) — explore advanced features.
- [React Docs](https://react.dev/learn) — learn the modern way to build with React.
- [Vercel](https://vercel.com) — deploy your app in seconds.
