import React from 'react';
import { Link } from 'react-router-dom';
import './styles/EditCampus.css';

const EditCampusView = ({ handleSubmit, handleChange, formData, errors }) => {
  // Add loading check
  if (formData.isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading campus information...</p>
      </div>
    );
  }

  // Add check for missing data
  if (!formData.name && !formData.isLoading) {
    return (
      <div className="error-container">
        <p>Error: Could not load campus data</p>
        <Link to="/campuses" className="back-button">
          Back to Campuses
        </Link>
      </div>
    );
  }

  return (
    <div className="edit-campus-container">
      <div className="header-section">
        <h1>Edit Campus</h1>
        <Link to={`/campus/${formData.id}`} className="back-button">
          Back to Campus
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label>Campus Name<span className="required">*</span></label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? "error" : ""}
            placeholder="Enter campus address"
          />
          {errors.address && <span className="error-message">⚠️ {errors.address}</span>}
        </div>

        <div className="form-group">
          <label>Description<span className="required">*</span></label>
          <textarea
            name="description"
            value={formData.description}
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
            value={formData.imageURL}
            onChange={handleChange}
            className={errors.imageURL ? "error" : ""}
            placeholder="https://example.com/image.jpg"
          />
          {errors.imageURL && <span className="error-message">⚠️ {errors.imageURL}</span>}
          <small className="help-text">
            Enter a valid image URL or leave blank for default image
          </small>
          
          {formData.imageURL && !errors.imageURL && (
            <div className="image-preview-container">
              <img 
                src={formData.imageURL} 
                alt="Preview" 
                className="image-preview"
                onError={(e) => {
                  e.target.style.display = 'none';
                  errors.imageURL = "Failed to load image";
                }}
              />
            </div>
          )}
        </div>

        {errors.submit && (
          <div className="submit-error">
            <span className="error-icon">⚠️</span>
            {errors.submit}
          </div>
        )}

        <div className="form-actions">
          <button 
            type="submit" 
            className={`submit-button ${formData.isSubmitting ? 'loading' : ''}`}
            disabled={formData.isSubmitting}
          >
            {formData.isSubmitting ? 'Saving Changes...' : 'Save Changes'}
          </button>
          <Link 
            to={`/campus/${formData.id}`} 
            className="cancel-button"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditCampusView;