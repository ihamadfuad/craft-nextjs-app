'use client';

import { User } from '@/features/models/api/User';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider
 * -----------------------------
 * Provides user state and auth actions (login, logout) across the app.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching session (e.g., from /api/me or cookies)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me');
        if (!res.ok) throw new Error('Not authenticated');
        const data: User = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (token: string) => {
    // Save token (optional: in cookie or localStorage)
    localStorage.setItem('authToken', token);

    // Refetch or decode token
    const res = await fetch('/api/me');
    if (!res.ok) throw new Error('Login failed');
    const data: User = await res.json();
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth
 * -----------------------------
 * Access the auth state and actions.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within <AuthProvider>');
  return context;
}