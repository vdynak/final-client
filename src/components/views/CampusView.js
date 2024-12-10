/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link, useHistory } from "react-router-dom";
import './styles/CampusView.css';

const CampusView = (props) => {
  const { campus, handleDelete } = props;
  const history = useHistory();

  // Loading state
  if (!campus) {
    return <div>Loading...</div>;
  }

  // Handler for delete button
  const deleteCampus = async () => {
    if (window.confirm('Are you sure you want to delete this campus?')) {
      await handleDelete(campus.id);
      history.push('/campuses');
    }
  };

  // Handler for removing student from campus
  const removeStudent = async (studentId) => {
    if (window.confirm('Remove this student from the campus?')) {
      await props.handleRemoveStudent(studentId);
    }
  };

  // Helper function to format GPA
  const formatGPA = (gpa) => {
    if (gpa === null || gpa === undefined) return 'N/A';
    const numGPA = parseFloat(gpa);
    return !isNaN(numGPA) ? numGPA.toFixed(2) : 'N/A';
  };
  
  return (
    <div className="campus-container">
      <div className="campus-header">
        <h1>{campus.name || 'Unnamed Campus'}</h1>
        <div className="campus-actions">
          <Link to={`/campus/${campus.id}/edit`} className="edit-button">
            Edit
          </Link>
          <button 
            className="delete-button"
            onClick={deleteCampus}
          >
            Delete Campus
          </button>
        </div>
      </div>

      <div className="campus-info">
        {campus.imageUrl && (
          <img 
            src={campus.imageUrl} 
            alt={campus.name}
            className="campus-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'default-campus.jpg'; // Add a default image
            }}
          />
        )}
        <p><strong>Address:</strong> {campus.address || 'No address provided'}</p>
        <p><strong>Description:</strong> {campus.description || 'No description available'}</p>
      </div>

      <div className="students-section">
        <div className="students-header">
          <h2>Enrolled Students ({campus.students ? campus.students.length : 0})</h2>
          <Link to={`/campus/${campus.id}/add-students`} className="add-button">
            Add Students
          </Link>
        </div>

        {campus.students && campus.students.length > 0 ? (
          <div className="students-list">
            {campus.students.map(student => {
              const name = `${student.firstname || ''} ${student.lastname || ''}`.trim() || 'Unnamed Student';
              return (
                <div key={student.id} className="student-card">
                  <div className="student-info">
                    <Link to={`/student/${student.id}`}>
                      <h3>{name}</h3>
                    </Link>
                    <p><strong>Email:</strong> {student.email || 'No email provided'}</p>
                    <p><strong>GPA:</strong> {formatGPA(student.gpa)}</p>
                  </div>
                  <button 
                    className="remove-button"
                    onClick={() => removeStudent(student.id)}
                  >
                    Remove Student
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-students">
            <p>No students currently enrolled</p>
            <Link to={`/campus/${campus.id}/add-students`} className="add-button">
              Add Students
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusView;