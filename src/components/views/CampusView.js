/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link, useHistory } from "react-router-dom";
import '../views/styles/CampusView.css';

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, handleDelete } = props;
  const history = useHistory();

  // Handler for delete button
  const deleteCampus = async () => {
    await handleDelete(campus.id);
    history.push('/campuses');  // Redirect to all campuses view after deletion
  };
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      
      {/* Add delete button */}
      <button 
        className="delete-button"
        onClick={deleteCampus}
      >
        Delete Campus
      </button>

      {/* Display students if they exist */}
      {campus.students && campus.students.length > 0 ? (
        campus.students.map(student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>             
            </div>
          );
        })
      ) : (
        <p>No students currently enrolled</p>
      )}
    </div>
  );
};

export default CampusView;