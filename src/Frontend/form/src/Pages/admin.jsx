import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth';
const admin = () => {

const navigate = useNavigate();
const handleLogout = () => {
    logout();               
    navigate('/', { replace: true });
}
  return (
    <div className="container mt-5">
   <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="card p-4 shadow-sm">
        <h3 className="card-title text-center">Admin Panel</h3>
        <p className="card-text text-center">Welcome, Admin!</p>
      </div>
    </div>
  );
}

export default admin