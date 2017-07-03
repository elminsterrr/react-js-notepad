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

export function fetchAllNotes() {
  return (dispatch) => {
    dispatch({ type: FETCH_ALL_NOTES_STARTED });
    axios.get(`${ROOT_URL}/api/notes`).then((response) => {
      dispatch({ type: FETCH_ALL_NOTES_SUCCESS, payload: response });
    }).catch((error) => {
      dispatch({ type: FETCH_ALL_NOTES_ERROR, payload: error });
    });
  };
}

export function addNote(values, callback) {
  return (dispatch) => {
    dispatch({ type: ADD_NOTE_STARTED });
    axios.post(`${ROOT_URL}/api/notes`, values).then((response) => {
      dispatch({ type: ADD_NOTE_SUCCESS, payload: response });
      callback();
    }).catch((error) => {
      dispatch({ type: ADD_NOTE_ERROR, payload: error });
    });
  };
}

export function deleteOneNote(id, callback) {
  return (dispatch) => {
    dispatch({ type: DEL_NOTE_STARTED });
    axios.delete(`${ROOT_URL}/api/notes/${id}`).then(() => {
      dispatch({ type: DEL_NOTE_SUCCESS, payload: id });
      callback();
    }).catch((error) => {
      dispatch({ type: DEL_NOTE_ERROR, payload: error });
    });
  };
}

export function prepareEdit(id, callback) {
  return (dispatch) => {
    dispatch({ type: EDIT_ONE_NOTE_STARTED });
    callback();
  };
}

export function touchedEdit() {
  return {
    type: EDIT_ONE_NOTE_TOUCHED,
  };
}

export function editNote(id, values, callback) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/api/notes/${id}`, values).then((response) => {
      dispatch({ type: EDIT_ONE_NOTE_SUCCESS, payload: response });
      callback();
    }).catch((error) => {
      dispatch({ type: EDIT_ONE_NOTE_ERROR, payload: error });
    });
  };
}

export function selectNote(noteId) {
  return {
    type: NOTE_SELECTED,
    payload: noteId,
  };
}
