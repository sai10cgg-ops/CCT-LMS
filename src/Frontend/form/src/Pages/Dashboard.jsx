import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card w-75 p-4 shadow">
        <h3 className="text-center">Admin Dashboard</h3>

        <p className="text-center">Welcome Admin — you are logged in 🎯</p>

        <div className="mt-4 text-center">
          <button className="btn btn-primary me-2" onClick={() => navigate("/apply-leave")}>
            Apply Leave
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/register-officer")}>
            Register New Officer
          </button>
        </div>

        <div className="mt-4 text-center">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
