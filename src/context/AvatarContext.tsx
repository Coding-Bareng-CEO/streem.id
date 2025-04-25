"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AvatarContextType {
  avatarUrl: string | null;
  setAvatarUrl: React.Dispatch<React.SetStateAction<string | null>>;
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAvatarUrl(localStorage.getItem('avatarUrl'));
      setUsername(localStorage.getItem('username'));
      setEmail(localStorage.getItem('email'));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('avatarUrl', avatarUrl || '');
      localStorage.setItem('username', username || '');
      localStorage.setItem('email', email || '');
    }
  }, [avatarUrl, username, email]);

  return (
    <AvatarContext.Provider value={{ avatarUrl, setAvatarUrl, username, setUsername, email, setEmail }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};
