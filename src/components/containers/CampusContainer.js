/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { 
  fetchCampusThunk, 
  deleteCampusThunk,
  editStudentThunk 
} from "../../store/thunks";
import { CampusView } from "../views";

class CampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,  // Initialize state here
    };
  }

  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
  }

  // Handle removing student from campus
  handleRemoveStudent = async (studentId) => {
    try {
      if (window.confirm('Remove this student from the campus?')) {
        await this.props.editStudent({
          id: studentId,
          campusId: null
        });
        // Refresh campus data
        this.props.fetchCampus(this.props.match.params.id);
      }
    } catch (error) {
      console.error("Error removing student:", error);
    }
  }

  // Handle campus deletion
  handleDelete = async (campusId) => {
    try {
      if (window.confirm('Are you sure you want to delete this campus?')) {
        await this.props.handleDelete(campusId);
        this.setState({ redirect: true });
      }
    } catch (error) {
      console.error("Error deleting campus:", error);
    }
  }

  render() {
    // Check if state exists before accessing redirect
    if (this.state && this.state.redirect) {
      return <Redirect to="/campuses" />;
    }

    // Add loading state
    if (!this.props.campus) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Header />
        <CampusView 
          campus={this.props.campus}
          handleDelete={this.handleDelete}
          handleRemoveStudent={this.handleRemoveStudent}
        />
      </div>
    );
  }
}

// Map state to props
const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

// Map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    handleDelete: (id) => dispatch(deleteCampusThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student))
  };
};

export default connect(mapState, mapDispatch)(CampusContainer);