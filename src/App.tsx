import React from 'react';
import Home from './pages/Home';
import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerLayout from './shared/layouts/CustomerLayout';
import PrivateRoute from './shared/components/PrivateRoute';
import AnonymousRoute from './shared/components/AnonymousRoute';
import ManagerLayout from './shared/layouts/ManagerLayout';
import AnonymousLayout from './shared/layouts/AnonymousLayout';
import About from './pages/About';


const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      {/* <main className="flex-grow p-4">
        <Home />
      </main> */}
      <Routes>
            {/* Customer Router */}
            <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
            <Route path="/about" element={<CustomerLayout><About /></CustomerLayout>} />
            {/* <Route path="/contact" element={<CustomerLayout><Contact /></CustomerLayout>} /> */}

            {/* Admin Router */}
            {/* <Route element={<PrivateRoute />}>
              <Route path="/manager/dashboard" element={<ManagerLayout><AdminDashboard /></ManagerLayout>} />
              <Route path="/manager/amenities" element={<ManagerLayout><AmenityList /></ManagerLayout>} />
              <Route path="/manager/rooms" element={<ManagerLayout><RoomList /></ManagerLayout>} />
            </Route> */}
            {/* Auth Router */}
            {/* <Route element={<AnonymousRoute />}>              
              <Route path="/auth/login" element={<AnonymousLayout><Login /></AnonymousLayout>} />
              <Route path="/auth/register" element={<AnonymousLayout><Register /></AnonymousLayout>} />
            </Route> */}
          </Routes>
    </div>
    </BrowserRouter>
    
  );
};

export default App;
