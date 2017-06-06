import React, { Component } from 'react';
import { connect } from 'react-redux';

class NotesError extends Component {
  render() {
    const { fetchAllStatus } = this.props;
    const { errors } = this.props;
    if (fetchAllStatus !== 'error') {
      return <div className="text-center">No errors were found!</div>;
    }
    return <div className="text-center">{JSON.stringify(errors)}</div>;
  }
}

function mapStateToProps(state) {
  return {
    fetchAllStatus: state.fetchAllStatus,
    errors: state.errors,
  };
}

export default connect(mapStateToProps, null)(NotesError);
