import React from 'react';
import { Link } from 'react-router-dom';
import './styles/EditStudent.css';

const EditStudentView = ({ handleSubmit, handleChange, formData, errors }) => {
  return (
    <div className="edit-student-container">
      <h1>Edit Student</h1>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label>First Name<span className="required">*</span></label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className={errors.firstname ? "error" : ""}
          />
          {errors.firstname && <span className="error-message">{errors.firstname}</span>}
        </div>

        <div className="form-group">
          <label>Last Name<span className="required">*</span></label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className={errors.lastname ? "error" : ""}
          />
          {errors.lastname && <span className="error-message">{errors.lastname}</span>}
        </div>

        <div className="form-group">
          <label>Email<span className="required">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>GPA</label>
          <input
            type="number"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            step="0.01"
            min="0"
            max="4"
            className={errors.gpa ? "error" : ""}
          />
          {errors.gpa && <span className="error-message">{errors.gpa}</span>}
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={errors.imageUrl ? "error" : ""}
          />
          {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
        </div>

        <div className="form-group">
          <label>Campus ID</label>
          <input
            type="number"
            name="campusId"
            value={formData.campusId}
            onChange={handleChange}
          />
        </div>

        {errors.submit && <div className="submit-error">{errors.submit}</div>}

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Save Changes
          </button>
          <Link to={`/student/${formData.id}`} className="cancel-button">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditStudentView;