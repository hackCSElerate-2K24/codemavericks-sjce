import { useState } from "react";

function Login() {
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [selectedStudent, setSelectedStudent] = useState(""); // For parent dropdown
  const [selectedBus, setSelectedBus] = useState(""); // For driver dropdown

  const students = ["Student A", "Student B", "Student C"];
  const buses = ["Bus 101", "Bus 102", "Bus 103"];

  // Configuration for form fields by role
  const roleFields = {
    Admin: [
      { label: "Email", type: "email", placeholder: "Enter your Email" },
      {
        label: "Password",
        type: "password",
        placeholder: "Enter your Password",
      },
    ],
    Driver: [
      { label: "Bus Number", type: "dropdown", options: buses },
      {
        label: "Password",
        type: "password",
        placeholder: "Enter your Password",
      },
    ],
    Parent: [
      { label: "Student", type: "dropdown", options: students },
      {
        label: "Password",
        type: "password",
        placeholder: "Enter your Password",
      },
    ],
  };

  const renderField = (field) => {
    if (field.type === "dropdown") {
      return (
        <div key={field.label}>
          <label className="block mb-1 font-medium text-gray-200">
            {field.label}
          </label>
          <select
            className="w-full p-2 border rounded-lg"
            value={selectedRole === "Driver" ? selectedBus : selectedStudent}
            onChange={(e) =>
              selectedRole === "Driver"
                ? setSelectedBus(e.target.value)
                : setSelectedStudent(e.target.value)
            }
          >
            <option value="" disabled>
              Select {field.label}
            </option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }
    return (
      <div key={field.label} className="">
        <label className="block mb-1 font-medium text-gray-200">
          {field.label}
        </label>
        <input
          type={field.type}
          placeholder={field.placeholder}
          className="w-full p-2 border rounded-lg"
        />
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black flex-col gap-5">
      <div className="flex items-center justify-evenly flex-col h-[60vh] w-[90%] md:w-[40vw] bg-[#141414] rounded-xl">
        {/* Role Selection */}
        <h1 className="text-5xl text-[#d32f2f] font-bold">Login</h1>
        <div className="flex space-x-2">
          {["Admin", "Driver", "Parent"].map((role) => (
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

        {/* Dynamic Form */}
        <form className="space-y-4 w-[70%]">
          {roleFields[selectedRole].map((field) => renderField(field))}

          {/* Login Button */}
          <button
            type="submit"
            className="w-32 ml-auto py-2 font-bold text-white bg-[#d32f2f] rounded-lg hover:bg-blue-600 "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
