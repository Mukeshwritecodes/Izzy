// src/context/AuthContext.js

import React from "react";

// 1. Create the Context
const AuthContext = React.createContext();

// 2. Create the Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(localStorage.getItem("authToken"));

  // You can add a useEffect here to fetch user data if the token exists on page load

  const login = (userData, authToken) => {
    localStorage.setItem("authToken", authToken);
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setToken(null);
  };

  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Create a custom hook to use the context easily
export function useAuth() {
  return React.useContext(AuthContext);
}
