'use client';

import React, { createContext, useContext, useCallback, useEffect, useState, ReactNode } from 'react';
import { User, AuthData } from '@/types';
import { authAPI } from '@/services/auth';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const cached = localStorage.getItem(USER_KEY);
        if (token && cached) setUser(JSON.parse(cached));

        if (token) {
          const { data } = await authAPI.getProfile();
          const fresh = data as User;
          setUser(fresh);
          localStorage.setItem(USER_KEY, JSON.stringify(fresh));
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const persist = (u: User, token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);
  };

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await authAPI.login({ email, password });
    const auth = data as AuthData;
    persist(
      { _id: auth._id, name: auth.name, email: auth.email, avatar: auth.avatar, role: auth.role },
      auth.token
    );
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const { data } = await authAPI.register({ name, email, password });
    const auth = data as AuthData;
    persist(
      { _id: auth._id, name: auth.name, email: auth.email, avatar: auth.avatar, role: auth.role },
      auth.token
    );
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch {
      // ignore network errors on logout
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
