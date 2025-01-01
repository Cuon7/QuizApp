import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerLayout from './shared/layouts/CustomerLayout';
import PrivateRoute from './shared/components/PrivateRoute';
import AnonymousRoute from './shared/components/AnonymousRoute';
import ManagerLayout from './shared/layouts/ManagerLayout';
import AnonymousLayout from './shared/layouts/AnonymousLayout';
import About from './pages/About';
import AdminDashboard from './pages/manager/AdminDashboard';
import { AuthProvider } from './contexts/auth.context';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Contact from './pages/Contact';
import Quizzes from './shared/components/Quizzes';
import QuizPage from './pages/QuizPage';
import QuizList from './pages/manager/Quiz/QuizList';
import QuestionList from './pages/manager/Question/QuestionLIst';
import UserList from './pages/manager/User/UserList';
import RoleList from './pages/manager/Role/RoleList';
import PermissionDenied from './pages/PermissionDenied';


const App: React.FC = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <Routes>
            {/* Customer Router */}
            <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
            <Route path="/about" element={<CustomerLayout><About /></CustomerLayout>} />
            <Route path="/contact" element={<CustomerLayout><Contact /></CustomerLayout>} />
            <Route path="/quizzes" element={<CustomerLayout><Quizzes /></CustomerLayout>} />
            <Route path="/quiz/:quizId" element={<CustomerLayout><QuizPage /></CustomerLayout>} />
            <Route path="/permission-denied" element={<CustomerLayout><PermissionDenied /></CustomerLayout>} />

            {/* Admin Router */}
            <Route element={<PrivateRoute />}>
              <Route path="/manager/dashboard" element={<ManagerLayout><AdminDashboard /></ManagerLayout>} />
              <Route path="/manager/quiz" element={<ManagerLayout><QuizList /></ManagerLayout>} />
              <Route path="/manager/question" element={<ManagerLayout><QuestionList /></ManagerLayout>} />
              <Route path="/manager/user" element={<ManagerLayout><UserList /></ManagerLayout>} />
              <Route path="/manager/role" element={<ManagerLayout><RoleList /></ManagerLayout>} />
            </Route>
            {/* Auth Router */}
            <Route element={<AnonymousRoute />}>              
              <Route path="/auth/login" element={<AnonymousLayout><Login /></AnonymousLayout>} />
              <Route path="/auth/register" element={<AnonymousLayout><Register /></AnonymousLayout>} />
            </Route>
          </Routes>
    </div>
    </BrowserRouter>
    </AuthProvider>    
  );
};

export default App;
