/**
 * Main App Component
 * Routes configuration and layout
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';
import BookDetailsPage from './pages/BookDetailsPage';
import CartPage from './pages/CartPage';

import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content */}
          <main className="app-main">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/cart" element={<CartPage />} />

              {/* Book Details Route - Public */}
              <Route path="/book/:id" element={<BookDetailsPage />} />

              {/* Protected Routes - Admin Only */}
              <Route
                path="/add-book"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AddBookPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-book/:id"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <EditBookPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
