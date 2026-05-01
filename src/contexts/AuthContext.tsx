import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;
  login: (u: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('coderys_user') || '';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('coderys_auth') === 'true';
  });

  const login = (u: string) => {
    if (u.trim().length >= 2) {
      setIsAuthenticated(true);
      setUsername(u.trim());
      localStorage.setItem('coderys_auth', 'true');
      localStorage.setItem('coderys_user', u.trim());
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('coderys_auth');
    localStorage.removeItem('coderys_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
