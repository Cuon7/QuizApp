import React from 'react';
import { Link } from 'react-router-dom';

const PermissionDenied: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-red-500">Permission Denied</h2>
        <p className="text-center">You do not have permission to access this page.</p>
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-500">Go back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PermissionDenied;
