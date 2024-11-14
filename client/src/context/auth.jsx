import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider will provide the authentication state to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user information
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  // Function for login
  const login = async (email, password, roleSelected) => {
    setLoading(true);
    try {
      // Send login request to the server
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/login`,
        {
          email,
          password,
          role: roleSelected,
        }
      );

      // Extract user data and role from response
      const { userData, role } = response.data;
      console.log(role);

      // Set the user state with the logged-in user’s information
      setUser({ ...userData, role });

      console.log(user);
      // Show success notification
      toast.success(`Welcome back, ${user.name}!`);

      // Redirect to the dashboard or home page after successful login
      navigate("/dashboard", { state: { role: roleSelected } });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Function for logout
  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* Render the Toaster component for notifications */}
      <Toaster position="top-right" reverseOrder={false} />
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
