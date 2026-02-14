import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Student Advisor</h1>
          <p>Your trusted partner in academic excellence</p>
          <div className="hero-buttons">
            <Link to="/advisors" className="btn btn-primary">
              Find an Advisor
            </Link>
            <Link to="/book" className="btn btn-secondary">
              Book Now
            </Link>
            <a 
              href="https://github.com/YOUR_USERNAME/student-advisor-website" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ marginLeft: '10px' }}
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </section>

      {/* Rest of component... */}
    </div>
  );
};

export default Home;