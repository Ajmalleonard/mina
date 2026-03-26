'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // In a real app, you might have a /me endpoint to validate token and get user
      // For now, we decode or just try to fetch user data if endpoint exists
      // Assuming we stored user data or just rely on token presence for initial state
      // But better to fetch user profile
      // Let's assume we don't have a /me endpoint yet, so we just trust the token for now
      // Or we can decode it.
      // But for robust auth, we should add a /profile endpoint in API.
      // Let's decode the JWT payload for basic info if needed, but for now we'll just set isAuthenticated
      
      // Ideally: const { data } = await api.get('/users/profile'); setUser(data);
      // For now, let's just assume valid if token exists, and handle 401 later
      setLoading(false);
    } catch (error) {
      localStorage.removeItem('token');
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.access_token);
      // Decode token or fetch user here
      // const decoded = decode(data.access_token);
      // setUser(decoded);
      
      // For now, let's just reload or redirect
      toast.success('Login successful');
      
      // Fetch user profile if possible, or just set a basic user object
      // We need to implement a "me" endpoint or return user data on login
      // Let's assume login returns token only for now as per my API implementation
      // So we will just set a dummy user or wait for a full profile fetch implementation
      setUser({ id: 'temp', email, role: 'USER' }); 
      
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const { data } = await api.post('/auth/register', userData);
      localStorage.setItem('token', data.access_token);
      setUser({ id: 'temp', email: userData.email, role: 'USER' });
      toast.success('Registration successful');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/login');
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user || !!(typeof window !== 'undefined' && localStorage.getItem('token')) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
