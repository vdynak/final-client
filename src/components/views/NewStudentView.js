/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import React from 'react'; 
import { Link } from 'react-router-dom';
import './styles/NewStudent.css';

const NewStudentView = ({ handleSubmit, handleChange, errors = {} }) => {
  return (
    <div className="new-student-container">
      <div className="form-header">
        <div className="title-section">
          <h1>Add New Student</h1>
          <p className="subtitle">Enter student information below</p>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name<span className="required">*</span></label>
              <input
                type="text"
                name="firstname"
                onChange={handleChange}
                className={errors.firstname ? "error" : ""}
                placeholder="Enter first name"
              />
              {errors.firstname && <span className="error-message">⚠️ {errors.firstname}</span>}
            </div>

            <div className="form-group">
              <label>Last Name<span className="required">*</span></label>
              <input
                type="text"
                name="lastname"
                onChange={handleChange}
                className={errors.lastname ? "error" : ""}
                placeholder="Enter last name"
              />
              {errors.lastname && <span className="error-message">⚠️ {errors.lastname}</span>}
            </div>

            <div className="form-group">
              <label>Email<span className="required">*</span></label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="student@example.com"
              />
              {errors.email && <span className="error-message">⚠️ {errors.email}</span>}
            </div>

            <div className="form-group">
              <label>GPA</label>
              <input
                type="number"
                name="gpa"
                step="0.1"
                min="0"
                max="4"
                onChange={handleChange}
                className={errors.gpa ? "error" : ""}
                placeholder="0.0 - 4.0"
              />
              {errors.gpa && <span className="error-message">⚠️ {errors.gpa}</span>}
            </div>

            <div className="form-group">
              <label>Campus ID</label>
              <input
                type="number"
                name="campusId"
                onChange={handleChange}
                className={errors.campusId ? "error" : ""}
                placeholder="Enter campus ID"
              />
              {errors.campusId && <span className="error-message">⚠️ {errors.campusId}</span>}
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                name="imageUrl"
                onChange={handleChange}
                className={errors.imageUrl ? "error" : ""}
                placeholder="https://example.com/image.jpg"
              />
              {errors.imageUrl && <span className="error-message">⚠️ {errors.imageUrl}</span>}
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
              Add Student
            </button>
          </div>
        </form>
      </div>
      
      <div className="back-button-container">
        <Link to="/students" className="back-button">
          ← Back to Students
        </Link>
      </div>
    </div>
  );
};

export default NewStudentView;