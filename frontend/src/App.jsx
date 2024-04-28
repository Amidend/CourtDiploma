import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 


  import Login from './components/Login';
  import Register from './components/Register';
  import ProtectedRoute from './components/ProtectedRoute';
  import AdminHome from './admin/AdminHome';
  import UserHome from './users/UserHome';

  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      console.error(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
      return this.props.children; 
    }
  }


  function App() {
    const [userRole, setUserRole] = useState('');
  
    useEffect(() => {
      const roleFromCookie = document.cookie.split('; ').find((row) => row.startsWith('user_role='))?.split('=')[1];
      setUserRole(roleFromCookie);
    }, []);
  
    return (
      <div >

      <Router>
        <ErrorBoundary>
       
            <Routes>
            <Route path="/admin" element={<ProtectedRoute isAdmin><AdminHome /></ProtectedRoute>} />
            <Route path="/user" element={<ProtectedRoute isUser><UserHome /></ProtectedRoute>} /> 
              <Route path="/" element={
                userRole === 'admin' ? (
                  <ProtectedRoute isAdmin>
                    <AdminHome /> {/* Render Admin homepage */}
                  </ProtectedRoute>
                ) : userRole === 'user' ? (
                  <ProtectedRoute isUser>
                    <UserHome /> {/* Render User homepage */}
                  </ProtectedRoute>
                ) : (
                  <Navigate to="/login" replace /> // Redirect to login if not authenticated
                )
              } />
  

              {/* ... */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
        
        </ErrorBoundary>
      </Router>
      </div>
    );
  }
  
  export default App;
