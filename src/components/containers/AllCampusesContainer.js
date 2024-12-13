/*==================================================
/src/components/containers\AllCampusesContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import React from 'react'; 
import Header from './Header';
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllCampusesThunk, deleteCampusThunk } from "../../store/thunks";
import { AllCampusesView } from "../views";

class AllCampusesContainer extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    console.log("Component mounting, props:", this.props);
    this.props.fetchAllCampuses();
  }
  handleDelete(campusId) {
    console.log("Deleting campus:", campusId);
    this.props.handleDelete(campusId);
  }

  render() {
    console.log("Rendering with campuses:", this.props.allCampuses);
    return (
      <div>
        <Header />
        <AllCampusesView
          allCampuses={this.props.allCampuses}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "allCampuses".
// The following 2 input arguments are passed to the "connect" function used by "AllCampusesContainer" component to connect to Redux Store.
const mapState = (state) => {
  return {
    allCampuses: state.allCampuses,  // Get the State object from Reducer "allCampuses"
  };
};  
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    handleDelete: (campusId) => dispatch(deleteCampusThunk(campusId))
  };
};

// Type check props;
AllCampusesContainer.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  fetchAllCampuses: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

// Export store-connected container by default
// AllCampusesContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(AllCampusesContainer);