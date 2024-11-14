import { useState } from "react";
import { useAuth } from "../context/auth"; // Adjust the path if needed
import toast from "react-hot-toast";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Parent"); // Default to "Parent"
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Attempt login with email, password, and selected role
      await login(email, password, selectedRole);
    } catch (error) {
      toast.error("Invalid credentials, please try again.");
      console.error("Login error:", error);
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
            className="w-32 ml-auto py-2 font-bold text-white bg-[#d32f2f] rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
