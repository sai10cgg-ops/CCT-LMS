import React from 'react'
import { logout } from '../auth';
import { useNavigate } from 'react-router-dom';

const dashboard = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();               
        navigate('/', { replace: true });
    };
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="card p-4 shadow-sm">
        <h3 className="card-title text-center">User Dashboard</h3>
        <p className="card-text text-center">Welcome to your dashboard!</p>
      </div>
    </div>
  );
}

export default dashboard