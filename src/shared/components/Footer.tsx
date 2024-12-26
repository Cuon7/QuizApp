import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentMonthAndYear = new Intl.DateTimeFormat('en', { 
    month: 'long', 
    year: 'numeric' 
  }).format(new Date());

  return (
    <footer className="bg-white-800 text-white p-4 text-center">
      {/* Footer Info Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and About */}
        <div>
          <div className="flex items-center space-x-2">
            <img src={require('../../assets/images/logo.ico')} alt="Logo" className="h-8 w-8" />
            <h3 className="text-lg text-black font-bold">Quizzes</h3>
          </div>
          <p className=" text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Menu Links */}
        <div>
          <h3 className="text-lg text-black font-bold mb-4">Menu</h3>
          <ul className="text-gray-600">
            <li className="nav-item">
              <Link to="/" className="nav-link hover:bg-blue-700">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/manager/quizzes" className="nav-link hover:bg-blue-700">Quizzes</Link>
            </li>
            <li className="nav-item">
              <Link to="/manager/dashboard" className="nav-link hover:bg-blue-700">Management</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link hover:bg-blue-700">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link hover:bg-blue-700">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg text-black font-bold mb-4">Contact</h3>
          <ul className="text-gray-600">
            <li>cuon7.work@gmail.com</li>
            <li>+84 961 326 300</li>
            <li>70 Ngoc Ha, Ba Dinh, Ha Noi, Viet Nam</li>
          </ul>
        </div>
      </div>
      <p className='text-black p-4'>© {currentMonthAndYear}</p>
    </footer>
  );
};

export default Footer;
