// providers/AuthProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { Models } from "appwrite";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  checkUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const PUBLIC_ROUTES = ['/login', '/register'];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname || '');

  const checkUser = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);

      // If we're on a public route but user is authenticated, redirect to editor
      if (isPublicRoute && currentUser) {
        router.push('/editor');
      }
    } catch (error) {
      // User is not authenticated
      setUser(null);
      
      // If we're not on a public route, redirect to login
      if (!isPublicRoute) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [pathname]);

  // Show loading state only on protected routes
  if (loading && !isPublicRoute) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // For protected routes, show nothing until we confirm no auth
  if (!isPublicRoute && !user && !loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, loading, checkUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};