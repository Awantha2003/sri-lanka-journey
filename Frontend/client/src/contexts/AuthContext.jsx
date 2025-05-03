import React, { useCallback, useState, createContext, useContext } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = useCallback(async (credentials) => {
    // Simulated login (replace with real API)
    if (
      credentials.email === 'admin@gmail.com' &&
      credentials.password === 'Awantha123@'
    ) {
      setIsAuthenticated(true);
      setUser({
        name: 'Admin User',
        role: 'admin',
      });
    } else {
      throw new Error('Invalid credentials');
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


export default AuthContext;

