/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import React from 'react'; 
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  constructor(props) {
    super(props);
    // Get campusId from URL query parameters
    const searchParams = new URLSearchParams(this.props.location.search);
    const campusId = searchParams.get('campusId');
    
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: "",
      campusId: campusId || "", // Initialize with campusId from URL if it exists
      errors: {
        firstname: "",
        lastname: "",
        email: "",
        gpa: "",
        imageUrl: "",
        campusId: "",
        submit: ""
      },
      redirect: false,
      redirectId: null,
      redirectToCampus: !!campusId // New flag to handle redirect back to campus
    };
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
          const urlRegex = /^https?:\/\/.+\..+/;
          if (!urlRegex.test(value)) {
            error = "Invalid URL format (must start with http:// or https://)";
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
        [name]: this.validateField(name, value),
        submit: ""
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
      const student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        imageUrl: this.state.imageUrl || null,
        gpa: this.state.gpa ? parseFloat(this.state.gpa) : null,
        campusId: this.state.campusId ? parseInt(this.state.campusId) : null
      };

      const newStudent = await this.props.addStudent(student);

      if (newStudent && newStudent.id) {
        this.setState({
          redirect: true,
          redirectId: newStudent.id
        });
      } else {
        throw new Error("Failed to add student");
      }
    } catch (err) {
      console.error(err);
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          submit: "Failed to add student: " + (err.message || "Unknown error")
        }
      }));
    }
  }

  render() {
    // Handle redirect based on whether we're adding to a campus or not
    if (this.state.redirect) {
      if (this.state.redirectToCampus) {
        return <Redirect to={`/campus/${this.state.campusId}`} />;
      }
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          campusId={this.state.campusId} // Pass campusId to view
          redirectToCampus={this.state.redirectToCampus} // Pass redirect flag to view
        />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  addStudent: (student) => dispatch(addStudentThunk(student))
});

export default connect(null, mapDispatch)(NewStudentContainer);