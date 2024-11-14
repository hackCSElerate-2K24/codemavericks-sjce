/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider will provide the authentication state to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ role: "parent" }); // Holds user information
  const [loading, setLoading] = useState(false); // Track loading state

  // Dummy function for login
  const login = (userData) => {
    setLoading(true);
    setUser(userData);
    setLoading(false);
  };

  // Dummy function for logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Higher Order Component (HOC) for Protected Route based on role
export const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null; // Redirect to login if not logged in
  }

  // Check if the user has an allowed role
  if (!allowedRoles.includes(user.role)) {
    navigate("/");
    return null;
  }

  return children;
};
