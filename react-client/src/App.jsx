import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getCurrentEmployee, logout } from "./utils/api";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Courses from "./components/Courses";
import Students from "./components/Students";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentEmployee()
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      console.log('Attempting to log out...');
      await logout();
      console.log('Logout successful, clearing user state');
      setUser(null);
      
      // Clear any remaining authentication state
      if (window && window.localStorage) {
        window.localStorage.removeItem('user');
      }
      
      // Force a full page reload to ensure all state is cleared
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error in App:', error);
      // Even if there's an error, we'll still clear the user state
      setUser(null);
      window.location.href = '/login';
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <Login onLoginSuccess={(userData) => setUser(userData)} />;

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/course/:courseId" element={<Students />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
