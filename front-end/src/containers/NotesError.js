import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NotesError extends Component {
  render() {
    const { fetchAllStatus } = this.props;
    const { errors } = this.props;
    if (fetchAllStatus !== 'error') {
      return (
        <div className="error-main text-center">
          No errors were found!
          <br />
          <Link to="/">Go Back</Link>
        </div>
      );
    }
    return (
      <div className="error-main text-center">
        {JSON.stringify(errors)}
        <br />
        <Link to="/">Go Back</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetchAllStatus: state.fetchAllStatus,
    errors: state.errors,
  };
}

export default connect(mapStateToProps, null)(NotesError);
