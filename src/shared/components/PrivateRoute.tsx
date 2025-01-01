import React from "react";
import { useAuth } from "../../contexts/auth.context";
import { Navigate, Outlet } from "react-router-dom";

// Check role and redirect to the correct route
// Neu user chua login thi redirect ve login page
// Neu user da login thi cho phep vao cac route con lai
// Neu ko co role du dieu kien thi redirect to 403 page
const getUserRole = () => {
  const userInformation = localStorage.getItem('userInformation');
  if (userInformation) {
    try {
      const user = JSON.parse(JSON.parse(userInformation));
      return user.roles || []; // Return the roles array
    } catch (error) {
      console.error('Error parsing user information:', error);
      return [];
    }
  }
  return [];
};


const PrivateRoute: React.FC = () => {  
  const userRoles = getUserRole();
  const { isAuthenticated, logout } = useAuth();
  if (isAuthenticated && userRoles.includes('Admin1')) {
    return  <Outlet />;
  }
  else {
    logout();
    return <Navigate to="/permission-denied" />;
  }
}

export default PrivateRoute;