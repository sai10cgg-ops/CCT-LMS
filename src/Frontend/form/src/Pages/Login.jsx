import React, { useState } from "react";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();

      // Save JWT token & role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      toast.success("Login successful!");

      

      if (data.role === "ADMIN") navigate("/admin");
      else navigate("/dashboard");

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="container-fluid vh-100"
      style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
    >
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center fw-bold">
                CCT-Leave Management System
              </h3>
              <p className="text-center text-muted mb-4">
                Login to your account
              </p>

              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button className="btn btn-primary w-100">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </button>
              </form>

              <p className="text-center text-muted small mt-4">
                © {new Date().getFullYear()} CCT-Leave Management System
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
