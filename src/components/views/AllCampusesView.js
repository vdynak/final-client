/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import '../views/styles/AllCampusesView.css';

const AllCampusesView = (props) => {
  console.log("AllCampusesView props:", props);
  if (!props.allCampuses) {
    console.log("No campuses data yet");
    return <div>Loading...</div>;
  }
  // If there is no campus, display a message and Add Campus button
  if (!props.allCampuses.length) {
    return (
      <div className="no-campuses">
        <h1>All Campuses</h1>
        <p>There are no campuses in the database.</p>
        <Link to={`/newcampus`}>
          <button className="add-button">Add New Campus</button>
        </Link>
      </div>
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div className="all-campuses">
      <h1>All Campuses</h1>

      {/* Add New Campus button at the top */}
      <Link to={`/newcampus`}>
        <button className="add-button">Add New Campus</button>
      </Link>

      <div className="campus-grid">
        {props.allCampuses.map((campus) => (
          <div key={campus.id} className="campus-card">
            <Link to={`/campus/${campus.id}`}>
              <h2>{campus.name}</h2>
            </Link>
            <p><strong>Campus ID:</strong> {campus.id}</p>
            <p><strong>Address:</strong> {campus.address}</p>
            {campus.description && (
              <p><strong>Description:</strong> {campus.description}</p>
            )}
            
            <div className="button-group">
              <Link to={`/campus/${campus.id}`}>
                <button className="view-button">View Details</button>
              </Link>
              <button 
                className="delete-button"
                onClick={() => props.handleDelete(campus.id)}
              >
                Delete Campus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Update PropTypes to include handleDelete
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default AllCampusesView;