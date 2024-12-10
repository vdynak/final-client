/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from 'react-router-dom';
import './styles/Student.css';

const StudentView = (props) => {
  const { student, handleDelete } = props;

  // Loading state
  if (!student) {
    return <div>Loading...</div>;
  }

  // Helper function to format GPA
  const formatGPA = (gpa) => {
    if (gpa === null || gpa === undefined) return 'Not Available';
    return typeof gpa === 'number' ? gpa.toFixed(2) : gpa;
  };

  return (
    <div className="student-container">
      <div className="student-header">
        <h1>{student.firstname} {student.lastname}</h1>
        <div className="student-actions">
          <Link to={`/student/${student.id}/edit`} className="edit-button">
              Edit
            </Link>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </div>
      </div>

      <div className="student-details">
        <div className="student-info">
          <p><strong>Email:</strong> {student.email || 'No email provided'}</p>
          <p><strong>GPA:</strong> {formatGPA(student.gpa)}</p>
          
          {student.imageUrl && (
            <img 
              src={student.imageUrl} 
              alt={`${student.firstname} ${student.lastname}`}
              className="student-image"
            />
          )}
        </div>

        <div className="campus-section">
          <h3>Campus Information</h3>
          {student.campus ? (
            <div>
              <p>Currently enrolled at:</p>
              <Link to={`/campus/${student.campus.id}`} className="campus-link">
                {student.campus.name}
              </Link>
            </div>
          ) : (
            <p className="not-enrolled">
              This student is not currently enrolled at any campus.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentView;