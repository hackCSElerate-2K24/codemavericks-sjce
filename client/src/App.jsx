import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "./context/auth";
import Login from "./pages/Login";
import { useMediaQuery } from "react-responsive";
import Admin from "./components/Admin/Admin";
import Parent from "./components/Parent/Parent";
import DriverMobile from "./components/Driver/DriverMobile";
import DriverDesktop from "./components/Driver/DriverDesktop";

function App() {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                {isDesktop ? <Admin /> : <h1>Only on Desktop please</h1>}
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver"
            element={
              <ProtectedRoute allowedRoles={["Driver"]}>
                {isDesktop ? (
                  <DriverDesktop />
                ) : (
                  <h1>Only on desktop please</h1>
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent"
            element={
              <ProtectedRoute allowedRoles={["Parent"]}>
                {!isDesktop ? <Parent /> : <h1>Only on Desktop please</h1>}
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes to login */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
