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
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👨‍🏫</div>
            <h3>Expert Advisors</h3>
            <p>Connect with experienced academic advisors.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Easy Scheduling</h3>
            <p>Book appointments at times that work for you.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Learning Resources</h3>
            <p>Access guides and materials for success.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your academic journey.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;