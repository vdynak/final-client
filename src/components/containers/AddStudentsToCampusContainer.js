import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllStudentsThunk, editStudentThunk, fetchCampusThunk } from '../../store/thunks';
import { AddStudentsToCampusView } from '../views';
import Header from './Header';

class AddStudentsToCampusContainer extends Component {
  componentDidMount() {
    // Fetch all students and current campus
    this.props.fetchAllStudents();
    this.props.fetchCampus(this.props.match.params.id);
  }

  handleAddStudent = async (studentId) => {
    try {
      // Update student's campusId
      await this.props.editStudent({
        id: studentId,
        campusId: this.props.match.params.id
      });
      
      // Refresh campus data to show new student
      this.props.fetchCampus(this.props.match.params.id);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div>
        <Header />
        <AddStudentsToCampusView
          allStudents={this.props.allStudents}
          campus={this.props.campus}
          handleAddStudent={this.handleAddStudent}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  allStudents: state.allStudents,
  campus: state.campus
});

const mapDispatch = (dispatch) => ({
  fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
  fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
  editStudent: (student) => dispatch(editStudentThunk(student))
});

export default connect(mapState, mapDispatch)(AddStudentsToCampusContainer);