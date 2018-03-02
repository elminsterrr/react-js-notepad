import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNote } from '../actions/actions';

class NoteNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
    this.modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
    };
    this.formats = [
      'background',
      'color',
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'align',
      'bullet',
      'link',
      'image',
    ];
  }

  handleContentChange(value) {
    this.setState({ content: value });
  }

  onNoteReadySumbit(values) {
    const content = this.state.content;
    const currentTime = this.formatDateAndHour();
    const currentTimeRaw = new Date();
    this.props.addNote(
      { ...values, content, createTime: currentTime, timeRaw: currentTimeRaw },
      () => this.props.history.push('/')
    );
  }

  formatDateAndHour() {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const date = new Date();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const dayShow = day < 10 ? `0${day}` : day;
    const hourShow = hour < 10 ? `0${hour}` : hour;
    const minutesShow = minutes < 10 ? `0${minutes}` : minutes;
    return `${dayShow} ${
      monthNames[monthIndex]
    } ${year} ${hourShow}:${minutesShow}`;
  }

  errorView() {
    const { addNoteStatus } = this.props;
    if (addNoteStatus === 'error') {
      return (
        <div className="error-del">
          Sorry, something went wrong. Please try again later.
        </div>
      );
    }
    return <div />;
  }

  renderFieldTitle(field) {
    const className = `form-group ${
      field.meta.touched && field.meta.error ? 'has-danger' : ''
    }`;
    return (
      <div className={className}>
        <label className="form-title" htmlFor="title">
          {field.labelToShow}
        </label>
        <br />
        <input className="form-control-title" type="text" {...field.input} />
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
        <form onSubmit={handleSubmit(this.onNoteReadySumbit.bind(this))}>
          <Field
            name="title"
            labelToShow="Note title"
            component={this.renderFieldTitle}
          />
          <div className="text-editor">
            <ReactQuill
              theme="snow"
              modules={this.modules}
              formats={this.formats}
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}
              name="content"
              labelToShow="content"
              component={this.renderFieldContent}
            />
          </div>
          <button type="submit" className="btn btn-secondary submit-button">
            <i className="fa fa-check" aria-hidden="true" />
          </button>
          <Link to="/" className="btn btn-secondary back-button">
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
  return errors;
}

function mapStateToProps(state) {
  return {
    addNoteStatus: state.addNoteStatus,
  };
}

export default reduxForm({
  validate,
  form: 'NoteNewFormUnique',
})(connect(mapStateToProps, { addNote })(NoteNew));
