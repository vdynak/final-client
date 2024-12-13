/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import React from 'react'; 
import { Link } from "react-router-dom";
import './styles/AllStudentsView.css';

const AllStudentsView = (props) => {
  const {students, deleteStudent} = props;

  if (!students.length) {
    return (
      <div className="student-header-section">
        <div className="student-title-section">
          <h1>All Students</h1>
          <p className="student-subtitle">Manage and view all student records</p>
        </div>
        <Link to={`/newstudent`} className="student-add-button">
          + Add New Student
        </Link>
      </div>
    );
  }
  
  return (
    <div className="student-container">
      <div className="student-header-section">
        <div className="student-title-section">
          <h1>All Students</h1>
          <p className="student-subtitle">Manage and view all student records</p>
        </div>
        <Link to={`/newstudent`} className="student-add-button">
          + Add New Student
        </Link>
      </div>

      <div className="student-grid">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <div className="student-image-container">
              <img 
                src={student.imageUrl || 'https://via.placeholder.com/400x200?text=Student+Image'} 
                alt={`${student.firstname} ${student.lastname}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x200?text=Student+Image';
                }}
              />
            </div>
            <div className="student-content">
              <Link to={`/student/${student.id}`} className="student-name-link">
                <h2>{student.firstname} {student.lastname}</h2>
              </Link>
              <div className="student-info">
                <p className="student-email">
                  <span className="student-icon">📧</span> {student.email}
                </p>
                {student.gpa && (
                  <p className="student-gpa">
                    <span className="student-icon">📚</span> GPA: {student.gpa}
                  </p>
                )}
                <div className="student-campus">
                  <span className="student-icon">🏛️</span>
                  {student.campus ? student.campus.name : 'No Campus Assigned'}
                </div>
              </div>
              
              <div className="student-action-container">
                <div className="student-buttons-wrapper">
                  <Link 
                    to={`/student/${student.id}`} 
                    className="student-button student-view-btn"
                  >
                    View Details
                  </Link>
                  <button 
                    className="student-button student-delete-btn"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this student?')) {
                        deleteStudent(student.id);
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

export default AllStudentsView;