import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllNotes, selectNote } from '../actions/actions';
import NoteShow from './NoteShow';

class NotesIndex extends Component {
  componentDidMount() {
    this.props.fetchAllNotes();
  }

  renderAllNotes() {
    const { fetchAllStatus } = this.props;
    if (fetchAllStatus === 'fetching_started') {
      return <div className="text-center">Loading from server...</div>;
    }
    if (fetchAllStatus === 'error') {
      return (
        <div className="text-center">
          There was a problem connecting to the server! Please try again later!<br />
          <Link className="btn btn-info" to="/notes/error">
            Show Error
          </Link>
        </div>
      );
    }
    const { notes } = this.props;
    return _.map(notes, (oneNote) => {
      return (
        <li
          onClick={() => this.props.selectNote(oneNote._id)}
          key={oneNote._id}
          className="list-group-item"
        >
          {oneNote.title}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="row text-center">
          <div className="col-sm-3 col-md-4 col-lg-3 col-xl-3 new-note-parent">
            <Link className="btn btn-primary new-note" to="/notes/new">
              New note
            </Link>
          </div>
        </div>
        <div className="row">
          <ul className="list-group col-sm-3 col-md-4 col-lg-3 col-xl-3 notes-list">
            {this.renderAllNotes()}
          </ul>
          <NoteShow />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetchAllStatus: state.fetchAllStatus,
    notes: state.notes,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAllNotes: fetchAllNotes,
    selectNote: selectNote,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesIndex);
