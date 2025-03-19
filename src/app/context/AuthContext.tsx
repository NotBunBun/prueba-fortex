import React, { createContext, useState, ReactNode } from 'react';

export type Role = 'admin' | 'viewer';

interface User {
  username: string;
  role: Role;
}

interface AuthContextProps {
  user: User;
  toggleRole: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({ username: 'John Doe', role: 'admin' });

  const toggleRole = () => {
    setUser((prev) =>
      prev.role === 'admin'
        ? { ...prev, role: 'viewer' }
        : { ...prev, role: 'admin' }
    );
  };

  return (
    <AuthContext.Provider value={{ user, toggleRole }}>
      {children}
    </AuthContext.Provider>
  );
}
