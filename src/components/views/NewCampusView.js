/*==================================================
NewCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new campus page.
================================================== */
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/NewCampusView.css';

const NewCampusView = ({ handleSubmit, handleChange, errors = {} }) => {
  return (
    <div className="new-campus-container">
      <div className="form-header">
        <div className="title-section">
          <h1>Add New Campus</h1>
          <p className="subtitle">Enter campus information below</p>
        </div>
      </div>

      <div className="new-campus-form">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Campus Name<span className="required">*</span></label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className={errors.name ? "error" : ""}
                placeholder="Enter campus name"
              />
              {errors.name && <span className="error-message">⚠️ {errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Address<span className="required">*</span></label>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                className={errors.address ? "error" : ""}
                placeholder="Enter campus address"
              />
              {errors.address && <span className="error-message">⚠️ {errors.address}</span>}
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                className={errors.description ? "error" : ""}
                placeholder="Enter campus description"
                rows="4"
              />
              {errors.description && <span className="error-message">⚠️ {errors.description}</span>}
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                name="imageURL"
                onChange={handleChange}
                className={errors.imageURL ? "error" : ""}
                placeholder="https://example.com/image.jpg"
              />
              {errors.imageURL && <span className="error-message">⚠️ {errors.imageURL}</span>}
            </div>
          </div>

          {errors.submit && (
            <div className="submit-error">
              <span className="error-icon">⚠️</span>
              {errors.submit}
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Add Campus
            </button>
          </div>
        </form>
      </div>
      
      <div className="back-button-container">
        <Link to="/campuses" className="back-button">
          ← Back to Campuses
        </Link>
      </div>
    </div>
  );
};

export default NewCampusView;