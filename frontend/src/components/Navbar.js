import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📚 Student Advisor
        </Link>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/advisors" className="nav-link" onClick={() => setIsOpen(false)}>
            Advisors
          </Link>
          <Link to="/book" className="nav-link" onClick={() => setIsOpen(false)}>
            Book Appointment
          </Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>

        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;