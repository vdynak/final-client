/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import React from 'react'; 
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './styles/AllCampusesView.css';

const AllCampusesView = (props) => {
  if (!props.allCampuses) {
    return (
      <div className="campus-loading-state">
        <div className="campus-loading-spinner"></div>
        <p>Loading campuses...</p>
      </div>
    );
  }

  // If there is no campus, display a message and Add Campus button
  if (!props.allCampuses.length) {
    return (
      <div className="campus-header-section">
        <div className="campus-title-section">
          <h1>All Campuses</h1>
          <p className="campus-subtitle">Manage and view all campus locations</p>
        </div>
        <Link to={`/newcampus`} className="campus-add-button">
          + Add New Campus
        </Link>
      </div>
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div className="campus-container">
      <div className="campus-header-section">
        <div className="campus-title-section">
          <h1>All Campuses</h1>
          <p className="campus-subtitle">Manage and view all campus locations</p>
        </div>
        <Link to={`/newcampus`} className="campus-add-button">
          + Add New Campus
        </Link>
      </div>

      <div className="campus-grid">
        {props.allCampuses.map((campus) => (
          <div key={campus.id} className="campus-card">
            <div className="campus-image-container">
              <img 
                src={campus.imageURL || 'https://via.placeholder.com/400x200?text=Campus+Image'} 
                alt={campus.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x200?text=Campus+Image';
                }}
              />
            </div>
            <div className="campus-content">
              <Link to={`/campus/${campus.id}`} className="campus-name-link">
                <h2>{campus.name}</h2>
              </Link>
              <div className="campus-info">
                <p className="campus-address">
                  <span className="campus-icon">📍</span> {campus.address}
                </p>
                {campus.description && (
                  <p className="campus-description">
                    {campus.description.length > 100 
                      ? `${campus.description.substring(0, 100)}...` 
                      : campus.description}
                  </p>
                )}
                <div className="campus-student-count">
                  <span className="campus-icon">👥</span>
                  {campus.students ? campus.students.length : 0} Students
                </div>
              </div>
              
              <div className="campus-action-container">
                <div className="campus-buttons-wrapper">
                  <Link 
                    to={`/campus/${campus.id}`} 
                    className="campus-button campus-view-btn"
                  >
                    View Details
                  </Link>
                  <button 
                    className="campus-button campus-delete-btn"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this campus?')) {
                        props.handleDelete(campus.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default AllCampusesView;