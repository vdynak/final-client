import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudentThunk, editStudentThunk } from '../../store/thunks';
import { EditStudentView } from '../views';
import { Redirect } from 'react-router-dom';

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: "",
      campusId: "",
      errors: {
        firstname: "",
        lastname: "",
        email: "",
        gpa: "",
        imageUrl: ""
      },
      redirect: false
    };
  }

  componentDidMount() {
    // Get student ID from URL
    this.props.fetchStudent(this.props.match.params.id).then(() => {
      const { student } = this.props;
      this.setState({
        firstname: student.firstname,
        lastname: student.lastname,
        email: student.email,
        imageUrl: student.imageUrl || "",
        gpa: student.gpa || "",
        campusId: student.campusId || ""
      });
    });
  }

  validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstname":
      case "lastname":
        if (!value) error = "This field is required";
        else if (value.length < 2) error = "Must be at least 2 characters";
        break;
      
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = "Email is required";
        else if (!emailRegex.test(value)) error = "Invalid email format";
        break;
      
      case "gpa":
        if (value) {
          const gpaValue = parseFloat(value);
          if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
            error = "GPA must be between 0.0 and 4.0";
          }
        }
        break;
      
      case "imageUrl":
        if (value) {
          try {
            new URL(value);
          } catch {
            error = "Invalid URL format";
          }
        }
        break;
      
      default:
        break;
    }
    return error;
  }

  handleChange = event => {
    const { name, value } = event.target;
    
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: this.validateField(name, value)
      }
    }));
  }

  handleSubmit = async event => {
    event.preventDefault();
    
    // Validate all fields
    const errors = {
      firstname: this.validateField("firstname", this.state.firstname),
      lastname: this.validateField("lastname", this.state.lastname),
      email: this.validateField("email", this.state.email),
      gpa: this.validateField("gpa", this.state.gpa),
      imageUrl: this.validateField("imageUrl", this.state.imageUrl)
    };

    // Check if there are any errors
    if (Object.values(errors).some(error => error)) {
      this.setState({ errors });
      return;
    }

    try {
      await this.props.editStudent({
        id: this.props.student.id,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        imageUrl: this.state.imageUrl || null,
        gpa: this.state.gpa ? parseFloat(this.state.gpa) : null,
        campusId: this.state.campusId ? parseInt(this.state.campusId) : null
      });
      
      this.setState({ redirect: true });
    } catch (err) {
      console.error(err);
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          submit: "Failed to update student"
        }
      }));
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.props.student.id}`} />;
    }

    return (
      <EditStudentView 
        student={this.state.student}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        formData={this.state}
        errors={this.state.errors}
      />
    );
  }
}

const mapState = (state) => ({
  student: state.student
});

const mapDispatch = (dispatch) => ({
  fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  editStudent: (student) => dispatch(editStudentThunk(student))
});

export default connect(mapState, mapDispatch)(EditStudentContainer);