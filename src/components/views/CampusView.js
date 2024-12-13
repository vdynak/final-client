/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students.
================================================== */
import React from "react";
import { Link } from "react-router-dom";
import "./styles/CampusView.css";

const CampusView = (props) => {
  const { campus, handleDelete, handleRemoveStudent } = props;

  // Ensure campus exists before rendering
  if (!campus) {
    return (
      <div className="campus-container">
        <div className="campus-header">
          <h1>Campus not found</h1>
        </div>
        <div className="campus-actions">
          <Link to="/campuses" className="action-button back">
            Back to Campuses
          </Link>
        </div>
      </div>
    );
  }

  // Render campus info
  return (
    <div className="campus-container">
      <div className="campus-header">
        <h1>{campus.name}</h1>
        <div className="campus-header-actions">
          <Link 
            to={`/campus/${campus.id}/edit`}
            className="action-button edit-button"
          >
            Edit Campus
          </Link>
          <button
            className="action-button delete-button"
            onClick={() => handleDelete(campus.id)}
          >
            Delete Campus
          </button>
        </div>
      </div>

      <div className="campus-image-container">
        <img
          src={campus.imageURL || 'https://via.placeholder.com/800x400?text=Campus+Image'}
          alt={campus.name}
          className="campus-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400?text=Campus+Image';
          }}
        />
      </div>

      <div className="campus-info">
        <p className="campus-address">
          <span>📍</span> {campus.address}
        </p>
        {campus.description && (
          <p>{campus.description}</p>
        )}
      </div>

      <div className="students-section">
        <div className="students-header">
          <div className="header-title">
            <h2>Enrolled Students</h2>
            <Link 
              to={`/newstudent?campusId=${campus.id}`} 
              className="action-button add-button"
            >
              + Add Student
            </Link>
          </div>
        </div>

        {campus.students && campus.students.length > 0 ? (
          <div className="students-list">
            {campus.students.map(student => (
              <div key={student.id} className="student-card">
                <Link to={`/student/${student.id}`}>
                  <h3>{student.firstname} {student.lastname}</h3>
                </Link>
                <div className="student-details">
                  <span>📧</span> {student.email}
                  {student.gpa && (
                    <span className="gpa">
                      <span>📚</span> GPA: {student.gpa}
                    </span>
                  )}
                </div>
                <button
                  className="remove-button"
                  onClick={() => {
                    if (window.confirm('Remove this student from the campus?')) {
                      handleRemoveStudent(student.id);
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-students">
            <p>No students currently enrolled at this campus</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusView;