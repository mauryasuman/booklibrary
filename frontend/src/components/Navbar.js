/**
 * Navbar Component
 * Navigation bar with auth links
 */

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Get cart count from Context
  const { getCartCount } = useContext(CartContext);
  const cartCount = getCartCount();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-logo">
          📚 Bookstore
        </Link>

        {/* Navigation Links */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/cart" className="nav-link cart-link">
              🛒 Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>

          {/* If user is logged in */}
          {token ? (
            <>
              {/* Show Add Book link only if user is admin */}
              {user.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/add-book" className="nav-link">
                    Add Book
                  </Link>
                </li>
              )}

              {/* User info and logout */}
              <li className="nav-item">
                <span className="nav-user">👤 {user.name}</span>
              </li>
              <li className="nav-item">
                <button className="nav-button logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Show Login and Register links if not logged in */}
              <li className="nav-item">
                <Link to="/login" className="nav-button login-btn">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-button register-btn">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
