/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/HomePageView.css';
import { FaUniversity, FaUserGraduate } from 'react-icons/fa';

const HomePageView = () => {
  return (
    <div className="homepage-container">
      <div className="hero-section">
        <h1>Campus Management System</h1>
        <p className="subtitle">Streamline your educational institution management</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/campuses" className="dashboard-card">
          <FaUniversity className="card-icon" />
          <div className="card-content">
            <h2>Campuses</h2>
            <p>Manage and view all campus locations</p>
          </div>
        </Link>

        <Link to="/students" className="dashboard-card">
          <FaUserGraduate className="card-icon" />
          <div className="card-content">
            <h2>Students</h2>
            <p>View and manage student records</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePageView;