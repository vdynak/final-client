import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/AddStudentsToCampus.css';

const AddStudentsToCampusView = ({ allStudents, campus, handleAddStudent, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'gpa', or 'email'
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');

  // Filter and sort students
  const filteredStudents = allStudents
    .filter(student => 
      // Filter out students already in this campus
      student.campusId !== (campus ? campus.id : null) &&
      // Search filter
      (student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'gpa':
          return (b.gpa || 0) - (a.gpa || 0);
        case 'email':
          return (a.email || '').localeCompare(b.email || '');
        default: // name
          return `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`);
      }
    });

  const formatGPA = (gpa) => {
    if (gpa === null || gpa === undefined) return 'N/A';
    const numGPA = parseFloat(gpa);
    return !isNaN(numGPA) ? numGPA.toFixed(2) : 'N/A';
  };

  const handleAddStudentWithFeedback = async (studentId) => {
    setIsAdding(true);
    setError('');
    try {
      await handleAddStudent(studentId);
    } catch (err) {
      setError('Failed to add student. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div className="add-students-container">
      <div className="header-section">
        <h1>Add Students to {campus ? campus.name : 'Campus'}</h1>
        <div className="header-buttons">
          <Link 
            to={`/newstudent?campusId=${campus?.id}`} 
            className="new-student-button"
          >
            + New Student
          </Link>
          <Link to={`/campus/${campus ? campus.id : ''}`} className="back-button">
            Back to Campus
          </Link>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="sort-box">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="gpa">Sort by GPA</option>
            <option value="email">Sort by Email</option>
          </select>
        </div>
      </div>

      {filteredStudents.length > 0 ? (
        <div className="students-grid">
          {filteredStudents.map(student => (
            <div key={student.id} className="student-card">
              <div className="student-info">
                <h3>{student.firstname} {student.lastname}</h3>
                <p><strong>Email:</strong> {student.email || 'N/A'}</p>
                <p><strong>GPA:</strong> {formatGPA(student.gpa)}</p>
                {student.campusId ? (
                  <p className="current-campus">
                    Currently at: {student.campus ? student.campus.name : 'Another Campus'}
                  </p>
                ) : (
                  <p className="no-campus">Not enrolled in any campus</p>
                )}
              </div>
              <button 
                onClick={() => handleAddStudentWithFeedback(student.id)}
                className={`add-button ${isAdding ? 'loading' : ''}`}
                disabled={isAdding}
              >
                {isAdding ? 'Adding...' : 'Add to Campus'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-students">
          {searchTerm ? (
            <p>No students found matching "{searchTerm}"</p>
          ) : (
            <>
              <p>No available students to add.</p>
              <Link 
                to={`/newstudent?campusId=${campus?.id}`} 
                className="new-student-button"
              >
                Create New Student
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AddStudentsToCampusView;