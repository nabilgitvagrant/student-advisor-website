import React, { useState, useEffect } from 'react';
import { advisorService } from '../services/advisorService';
import '../styles/Advisors.css';

const Advisors = () => {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchAdvisors();
  }, []);

  const fetchAdvisors = async () => {
    try {
      setLoading(true);
      const data = await advisorService.getAll();
      setAdvisors(data);
      setError(null);
    } catch (err) {
      setError('Failed to load advisors: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredAdvisors = advisors.filter(advisor =>
    advisor.name.toLowerCase().includes(filter.toLowerCase()) ||
    (advisor.specialty && advisor.specialty.toLowerCase().includes(filter.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="advisors-page">
        <h1>Our Expert Advisors</h1>
        <p>Loading advisors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="advisors-page">
        <h1>Our Expert Advisors</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={fetchAdvisors}>Retry</button>
      </div>
    );
  }

  return (
    <div className="advisors-page">
      <h1>Our Expert Advisors</h1>
      <p>Find the perfect advisor for your academic journey</p>

      <div className="advisors-filter">
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      {filteredAdvisors.length === 0 ? (
        <p>No advisors found.</p>
      ) : (
        <div className="advisors-grid">
          {filteredAdvisors.map(advisor => (
            <div key={advisor.id} className="advisor-card">
              <div className="advisor-image">👨‍🏫</div>
              <h3>{advisor.name}</h3>
              <p className="specialty">{advisor.specialty || 'Academic Advisor'}</p>
              <button className="btn btn-primary">View Profile</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Advisors;