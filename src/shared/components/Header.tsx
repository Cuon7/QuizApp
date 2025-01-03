import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { useAuth } from "../../contexts/auth.context";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

    const onLogout = () => {
        logout();
    }
  return (
    <header className="flex justify-between items-center px-4 bg-blue-500 text-white">
      <div className="flex items-center space-x-2">
        <img src={require('../../assets/images/logo.ico')} alt="Logo" className="h-8 w-8" />
        <Link to="/" className="brand text-2xl font-bold">Quizzes</Link>
      </div>
      <nav>
        <ul className="nav-menu flex justify-center">
          <li className="nav-item">
            <Link to="/" className="nav-link block p-4 hover:bg-blue-700">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/quizzes" className="nav-link block p-4 hover:bg-blue-700">Quizzes</Link>
          </li>
          <li className="nav-item">
            <Link to="/manager/dashboard" className="nav-link block p-4 hover:bg-blue-700">Management</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link block p-4 hover:bg-blue-700">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link block p-4 hover:bg-blue-700">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="profile-menu">
        {isAuthenticated ? (
          <ul className="nav-menu flex justify-center">
            <li className="nav-item">
              <Link to="/auth/profile" className="nav-link block p-4 hover:bg-blue-700">Welcome, Admin</Link>
            </li>
            <li className="nav-item">
              <button onClick={onLogout} className="nav-link block p-4 hover:bg-blue-700">Logout</button>
            </li>
          </ul>
        ) : (
          <ul className="nav-menu flex justify-center">
            <li className="nav-item">
              <Link to="/auth/login" className="nav-link block p-4 hover:bg-blue-700">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/auth/register" className="nav-link block p-4 hover:bg-blue-700">Register</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
