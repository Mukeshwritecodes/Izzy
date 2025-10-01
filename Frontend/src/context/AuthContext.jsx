import React, { useState, useEffect, createContext, useContext } from "react";

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  // --- 1. ADD THIS useEffect TO REHYDRATE THE USER STATE ---
  // This effect runs only once when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // If we find a user object in storage, set it to our state
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // The empty array ensures this runs only on initial mount

  const login = (userData, authToken) => {
    // --- 2. STORE THE USER OBJECT ALONGSIDE THE TOKEN ---
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user as a string
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    // --- 3. REMOVE THE USER OBJECT ON LOGOUT ---
    localStorage.removeItem("authToken");
    localStorage.removeItem("user"); // Also remove the user object
    setUser(null);
    setToken(null);
  };

  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Create a custom hook to use the context easily
export function useAuth() {
  return useContext(AuthContext);
}
