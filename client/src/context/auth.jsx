// auth.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider will provide the authentication state to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user information

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {/* Render the Toaster component for notifications */}
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/"); // Redirect to login if user is not logged in
    } else if (!allowedRoles.includes(user.role)) {
      navigate("/"); // Redirect if the user does not have an allowed role
    }
  }, [user, allowedRoles, navigate]);

  // Show nothing while redirecting
  if (user === null || !allowedRoles.includes(user.role)) {
    return null;
  }

  return children;
};
