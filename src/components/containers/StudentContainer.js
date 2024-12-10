/*==================================================
StudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentThunk, deleteStudentThunk } from "../../store/thunks";
import { StudentView } from "../views";
import { Redirect } from 'react-router-dom';

class StudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    // Getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
  }

  // Handle student deletion
  handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await this.props.deleteStudent(this.props.student.id);
      this.setState({ redirect: true });
    }
  }

  render() {
    // Redirect to all students page after deletion
    if (this.state.redirect) {
      return <Redirect to="/students" />;
    }

    return (
      <div>
        <Header />
        <StudentView 
          student={this.props.student}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

// Map state to props
const mapState = (state) => {
  return {
    student: state.student,
  };
};

// Map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    deleteStudent: (id) => dispatch(deleteStudentThunk(id))
  };
};

export default connect(mapState, mapDispatch)(StudentContainer);