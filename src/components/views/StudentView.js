/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import React from "react";
import { Link } from "react-router-dom";
import "./styles/Student.css";

const StudentView = (props) => {
  const { student, handleDelete } = props;

  // Ensure student exists before rendering
  if (!student) {
    return (
      <div className="student-container">
        <div className="student-header">
          <h1>Student not found</h1>
        </div>
        <div className="student-actions">
          <Link to="/students" className="action-button back">
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  // Render student info
  return (
    <div className="student-container">
      <div className="student-header">
        <h1>Student Profile</h1>
      </div>

      <div className="student-details">
        <div className="student-image-container">
          <img
            src={student.imageUrl || 'https://via.placeholder.com/200x200?text=Student+Image'}
            alt={`${student.firstname} ${student.lastname}`}
            className="student-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x200?text=Student+Image';
            }}
          />
        </div>

        <div className="student-info">
          <p>
            <span>👤</span> {student.firstname} {student.lastname}
          </p>
          <p>
            <span>📧</span> {student.email}
          </p>
          {student.gpa && (
            <p>
              <span>📚</span> GPA: {student.gpa}
            </p>
          )}
        </div>

        <div className="campus-section">
          <h3>Campus Information</h3>
          {student.campus ? (
            <Link to={`/campus/${student.campus.id}`} className="campus-link">
              <span>🏛️</span> {student.campus.name}
            </Link>
          ) : (
            <p className="not-enrolled">
              <span>ℹ️</span> Not currently enrolled in any campus
            </p>
          )}
        </div>

        <div className="student-actions">
          <Link
            to={`/student/${student.id}/edit`}
            className="action-button edit"
          >
            Edit
          </Link>
          <button
            className="action-button delete"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this student?')) {
                handleDelete(student.id);
              }
            }}
          >
            Delete
          </button>
          <Link to="/students" className="action-button back">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentView;