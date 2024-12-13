import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';
import { EditCampusView } from '../views';
import { Redirect } from 'react-router-dom';
import Header from './Header';

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageURL: "",
      errors: {
        name: "",
        address: "",
        description: "",
        imageURL: ""
      },
      redirect: false
    };
  }

  componentDidMount() {
    // Get campus data
    this.props.fetchCampus(this.props.match.params.id).then(() => {
      const { campus } = this.props;
      this.setState({
        name: campus.name,
        address: campus.address,
        description: campus.description,
        imageURL: campus.imageURL || ""
      });
    });
  }

  validateForm = () => {
    let isValid = true;
    const errors = {
      name: "",
      address: "",
      description: "",
      imageURL: ""
    };

    // Name validation
    if (!this.state.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    // Address validation
    if (!this.state.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    // Description validation
    if (!this.state.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    // Image URL validation
    if (this.state.imageURL && !this.isValidUrl(this.state.imageURL)) {
      errors.imageURL = "Please enter a valid URL";
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    }, () => {
      // Real-time validation
      this.validateForm();
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (this.validateForm()) {
      try {
        await this.props.editCampus({
          id: this.props.match.params.id,
          name: this.state.name,
          address: this.state.address,
          description: this.state.description,
          imageURL: this.state.imageURL
        });
        this.setState({ redirect: true });
      } catch (err) {
        console.error(err);
        this.setState({
          errors: {
            ...this.state.errors,
            submit: "Failed to update campus. Please try again."
          }
        });
      }
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.props.match.params.id}`} />;
    }

    return (
      <div>
        <Header />
        <EditCampusView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          formData={this.state}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  campus: state.campus
});

const mapDispatch = (dispatch) => ({
  fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
  editCampus: (campus) => dispatch(editCampusThunk(campus))
});

export default connect(mapState, mapDispatch)(EditCampusContainer);