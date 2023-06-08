import React, { useState } from 'react';
import './app.css';
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Header } from './container/header';
import { Login } from './login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/user"
          element={isLoggedIn ? <Header /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
