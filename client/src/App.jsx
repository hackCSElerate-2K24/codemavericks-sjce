import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import Login from "./pages/Login";
import { useMediaQuery } from "react-responsive";
import Admin from "../components/Admin";
import Parent from "../components/Parent";
import DriverMobile from "../components/Driver/DriverMobile";
import DriverDesktop from "../components/Driver/DriverDesktop";

function App() {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                {isDesktop ? <Admin /> : <h1>Only on Desktop please</h1>}
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver"
            element={
              <ProtectedRoute allowedRoles={["driver"]}>
                return isDesktop ? <DriverDesktop /> : <DriverMobile />;
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent"
            element={
              <ProtectedRoute allowedRoles={["parent"]}>
                {isDesktop ? <Parent /> : <h1>Only on Desktop please</h1>}
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
