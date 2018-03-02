import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { prepareEdit, deleteOneNote } from '../actions/actions';

class NoteShow extends Component {
  onEditClick() {
    const { selectedNoteFromState } = this.props;
    this.props.prepareEdit(selectedNoteFromState, () => {
      this.props.history.push('/notes/edit');
    });
  }

  onDeleteClick() {
    const { selectedNoteFromState } = this.props;
    this.props.deleteOneNote(selectedNoteFromState, () => {
      this.props.history.push('/');
    });
  }

  errorView() {
    const { delNoteStatus } = this.props;
    if (delNoteStatus === 'error') {
      return (
        <div className="col-sm-5 col-md-5 col-lg-5 col-xl-5 error-del text-center">
          Sorry, something went wrong. Please try again later.
        </div>
      );
    }
    return <div />;
  }

  timeView() {
    const { selectedNoteFromState } = this.props;
    const { allNotesFromStateObj } = this.props;
    const noteToView = allNotesFromStateObj[selectedNoteFromState];
    if (noteToView.editTime) {
      return (
        <p className="text-center date-time">
          Last edited: {noteToView.editTime}
        </p>
      );
    }
    return (
      <p className="text-center date-time">Created: {noteToView.createTime}</p>
    );
  }

  renderNoteDetail() {
    const { selectedNoteFromState } = this.props;
    const { allNotesFromStateObj } = this.props;
    const noteToView = allNotesFromStateObj[selectedNoteFromState];
    return (
      <div className="col-sm-8 col-md-8 col-lg-8 col-xl-8 pull-sm-right text-justify note-show">
        <h2 className="text-center">{noteToView.title}</h2>
        <ReactQuill
          modules={{ toolbar: false }}
          readOnly={true}
          value={noteToView.content}
          className="note-show-content"
        />
        <hr />
        {this.timeView()}
        <button
          className="btn btn-secondary pull-xs-left small-buttons"
          onClick={this.onEditClick.bind(this)}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </button>
        <button
          className="btn btn-secondary pull-xs-right small-buttons"
          onClick={this.onDeleteClick.bind(this)}
        >
          <i className="fa fa-trash-o" aria-hidden="true" />
        </button>
      </div>
    );
  }

  render() {
    const { statusFromState } = this.props;
    const { selectedNoteFromState } = this.props;
    if (
      statusFromState === 'fetch_all_notes_success' &&
      selectedNoteFromState !== null
    ) {
      return (
        <div>
          {this.renderNoteDetail()}
          {this.errorView()}
        </div>
      );
    }
    return <div />;
  }
}

function mapStateToProps(state) {
  return {
    selectedNoteFromState: state.selectedNote,
    statusFromState: state.fetchAllStatus,
    allNotesFromStateObj: state.notes,
    delNoteStatus: state.delNoteStatus,
  };
}

export default withRouter(
  connect(mapStateToProps, { prepareEdit, deleteOneNote })(NoteShow)
);
