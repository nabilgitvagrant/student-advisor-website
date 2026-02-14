import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Helping students succeed through expert academic guidance.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/advisors">Advisors</a></li>
            <li><a href="/book">Book Appointment</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@studentadvisor.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Student Advisor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;