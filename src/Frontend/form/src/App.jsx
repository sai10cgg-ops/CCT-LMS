import { Routes, Route } from "react-router-dom";
import ApplyLeave from "./Pages/ApplyLeave";
import NewOfficerRegistrationForm from "./Pages/NewOfficerRegistrationForm";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/apply-leave" element={<ProtectedRoute><ApplyLeave /></ProtectedRoute>} />
      <Route path="/register-officer" element={<ProtectedRoute><NewOfficerRegistrationForm /></ProtectedRoute>} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
