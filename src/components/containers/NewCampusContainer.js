/*==================================================
/src/components/containers/NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCampusThunk } from '../../store/thunks';
import { NewCampusView } from '../views';
import Header from './Header';

class NewCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageURL: "",
      error: "",
      isSubmitting: false
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ""
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isSubmitting: true, error: "" });

    try {
      // Validate required fields
      if (!this.state.name || !this.state.address) {
        throw new Error("Name and address are required");
      }

      const campusData = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description || "",
        imageURL: this.state.imageURL || "https://via.placeholder.com/480x240"
      };

      console.log("Submitting campus data:", campusData); // Debug log
      await this.props.addCampus(campusData);
      this.props.history.push('/campuses');
    } catch (err) {
      console.error("Error adding campus:", err);
      this.setState({
        error: err.response?.data?.message || err.message || "Failed to add campus"
      });
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    return (
      <div>
        <Header />
        <NewCampusView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          formData={this.state}
        />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  addCampus: (campus) => dispatch(addCampusThunk(campus))
});

export default connect(null, mapDispatch)(NewCampusContainer);