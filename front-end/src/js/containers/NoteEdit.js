import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editNote, touchedEdit } from '../actions/actions';

class NoteEdit extends Component {
  componentWillReceiveProps(nextProps) {
    const { notes } = nextProps;
    const { edit } = this.props;
    if (!(_.isEmpty(notes)) && edit !== 'edit_note_touched') {
      const { change } = this.props;
      const { selectedNote } = this.props;
      change('title', notes[selectedNote].title);
      change('content', notes[selectedNote].content);
      this.props.touchedEdit();
    }
  }

  onSumbit(values) {
    const { selectedNote } = this.props;
    const currentTime = this.formatDateAndHour();
    const currentTimeRaw = new Date();
    this.props.editNote(
      selectedNote,
      { ...values, editTime: currentTime, timeRaw: currentTimeRaw },
      () => this.props.history.push('/'),
    );
  }

  formatDateAndHour() {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December',
    ];
    const date = new Date();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const dayShow = day < 10 ? '0' + day : day;
    const hourShow = hour < 10 ? '0' + hour : hour;
    const minutesShow = minutes < 10 ? '0' + minutes : minutes;
    return `${dayShow} ${monthNames[monthIndex]} ${year} ${hourShow}:${minutesShow}`;
  }

  errorView() {
    const { edit } = this.props;
    if (edit === 'error') {
      return <div>Sorry, something went wrong. Please try again later.</div>;
    }
    return <div />;
  }

  renderFieldTitle(field) {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label className="form-title">{field.labelToShow}</label><br />
        <input
          className="form-control-title"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  renderFieldContent(field) {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label className="form-title">{field.labelToShow}</label><br />
        <textarea
          className="form-control-content text-justify"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row form-fields text-center">
        <form onSubmit={handleSubmit(this.onSumbit.bind(this))}>
          <Field
            name="title"
            labelToShow="title"
            component={this.renderFieldTitle}
          />
          <Field
            name="content"
            labelToShow="content"
            component={this.renderFieldContent}
          />
          <button type="submit" className="btn btn-secondary">
            <i className="fa fa-check" aria-hidden="true" />
          </button>
          <Link to="/" className="btn btn-secondary">
            <i className="fa fa-times" aria-hidden="true" />
          </Link>
          {this.errorView()}
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title || values.title.length < 3) {
    errors.title = 'Enter note title that is at least 3 characters long!';
  }
  if (!values.content || values.content.length < 3) {
    errors.content = 'Enter note content that is at least 3 characters long!';
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    edit: state.editNoteStatus,
    notes: state.notes,
    selectedNote: state.selectedNote,
  };
}

export default withRouter(reduxForm({
  validate: validate,
  form: 'NoteNewFormUnique',
})(connect(mapStateToProps, { editNote, touchedEdit })(NoteEdit)));
