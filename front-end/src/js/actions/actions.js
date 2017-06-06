import axios from 'axios';

export const FETCH_ALL_NOTES_STARTED = 'FETCH_ALL_NOTES_STARTED';
export const FETCH_ALL_NOTES_SUCCESS = 'FETCH_ALL_NOTES_SUCCESS';
export const FETCH_ALL_NOTES_ERROR = 'FETCH_ALL_NOTES_ERROR';
export const ADD_NOTE_STARTED = 'ADD_NOTE_STARTED';
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS';
export const ADD_NOTE_ERROR = 'ADD_NOTE_ERROR';
export const DEL_NOTE_STARTED = 'DEL_NOTE_STARTED';
export const DEL_NOTE_SUCCESS = 'DEL_NOTE_SUCCESS';
export const DEL_NOTE_ERROR = 'DEL_NOTE_ERROR';
export const EDIT_ONE_NOTE_STARTED = 'EDIT_ONE_NOTE_STARTED';
export const EDIT_ONE_NOTE_TOUCHED = 'EDIT_ONE_NOTE_TOUCHED';
export const EDIT_ONE_NOTE_SUCCESS = 'EDIT_ONE_NOTE_SUCCESS';
export const EDIT_ONE_NOTE_ERROR = 'EDIT_ONE_NOTE_ERROR';
export const NOTE_SELECTED = 'NOTE_SELECTED';

const ROOT_URL = 'https://elminster-white-note-rest-api.herokuapp.com';

export function fetchAllNotesStarted() {
  return {
    type: FETCH_ALL_NOTES_STARTED,
  };
}

export function fetchAllNotesSuccess(response) {
  return {
    type: FETCH_ALL_NOTES_SUCCESS,
    payload: response,
  };
}

export function fetchAllNotesError(response) {
  return {
    type: FETCH_ALL_NOTES_ERROR,
    payload: response,
  };
}

export function fetchAllNotes() {
  return (dispatch) => {
    dispatch(fetchAllNotesStarted());
    axios.get(`${ROOT_URL}/api/notes`).then((response) => {
      dispatch(fetchAllNotesSuccess(response));
    }).catch((error) => {
      dispatch(fetchAllNotesError(error));
    });
  };
}

export function addNoteStarted() {
  return {
    type: ADD_NOTE_STARTED,
  };
}

export function addNoteSuccess(response) {
  return {
    type: ADD_NOTE_SUCCESS,
    payload: response,
  };
}

export function addNoteError(response) {
  return {
    type: ADD_NOTE_ERROR,
    payload: response,
  };
}

export function addNote(values, callback) {
  return (dispatch) => {
    dispatch(addNoteStarted());
    axios.post(`${ROOT_URL}/api/notes`, values).then((response) => {
      dispatch(addNoteSuccess(response));
      callback();
    }).catch((error) => {
      dispatch(addNoteError(error));
    });
  };
}

export function deleteNoteStarted() {
  return {
    type: DEL_NOTE_STARTED,
  };
}

export function deleteNoteSuccess(response) {
  return {
    type: DEL_NOTE_SUCCESS,
    payload: response,
  };
}

export function deleteNoteError(response) {
  return {
    type: DEL_NOTE_ERROR,
    payload: response,
  };
}

export function deleteOneNote(id, callback) {
  return (dispatch) => {
    dispatch(deleteNoteStarted());
    axios.delete(`${ROOT_URL}/api/notes/${id}`).then(() => {
      dispatch(deleteNoteSuccess(id));
      callback();
    }).catch((error) => {
      dispatch(deleteNoteError(error));
    });
  };
}

export function editOneNoteStarted() {
  return {
    type: EDIT_ONE_NOTE_STARTED,
  };
}

export function touchedEdit() {
  return {
    type: EDIT_ONE_NOTE_TOUCHED,
  };
}

export function editOneNoteSuccess(response) {
  return {
    type: EDIT_ONE_NOTE_SUCCESS,
    payload: response,
  };
}

export function editOneNoteError(response) {
  return {
    type: EDIT_ONE_NOTE_ERROR,
    payload: response,
  };
}

export function prepareEdit(id, callback) {
  return (dispatch) => {
    dispatch(editOneNoteStarted());
    callback();
  };
}

export function editNote(id, values, callback) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/api/notes/${id}`, values).then((response) => {
      dispatch(editOneNoteSuccess(response));
      callback();
    }).catch((error) => {
      dispatch(editOneNoteError(error));
    });
  };
}

export function selectNote(noteId) {
  return {
    type: NOTE_SELECTED,
    payload: noteId,
  };
}
