// Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth"; // Adjust the path if needed
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const { setUser } = useAuth(); // Access setUser to set the logged-in user
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Parent"); // Default to "Parent"
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send login request to the server
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/login`,
        { email, password, role: selectedRole },
        { withCredentials: true }
      );

      const { user: userData, role } = response.data;
      setUser({ ...userData, role }); // Set the user in AuthContext

      console.log(role);

      toast.success(`Welcome back, ${userData?.name || userData.college}!`);
      navigate(`/${role.toLowerCase()}`);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid credentials, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black flex-col gap-5">
      <div className="flex items-center justify-evenly flex-col h-[60vh] w-[90%] md:w-[40vw] bg-[#141414] rounded-xl">
        <h1 className="text-5xl text-[#d32f2f] font-bold">Login</h1>

        {/* Role Selection */}
        <div className="flex space-x-2 mb-4">
          {["Parent", "Admin", "Driver"].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-lg cursor-pointer ${
                selectedRole === role
                  ? "bg-[#d32f2f] text-white"
                  : "bg-gray-200"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 w-[70%]">
          <div>
            <label className="block mb-1 font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-32 ml-auto py-2 font-bold text-white bg-[#d32f2f] rounded-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border animate-spin border-2 border-white rounded-full h-5 w-5"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
