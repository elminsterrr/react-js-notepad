import { FETCH_ALL_NOTES_ERROR, ADD_NOTE_ERROR, DEL_NOTE_ERROR, EDIT_ONE_NOTE_ERROR } from '../actions/actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_NOTES_ERROR:
      return { ...state, FETCH_ALL_NOTES_ERROR: action.payload };
    case ADD_NOTE_ERROR:
      return { ...state, ADD_NOTE_ERROR: action.payload };
    case DEL_NOTE_ERROR:
      return { ...state, DEL_NOTE_ERROR: action.payload };
    case EDIT_ONE_NOTE_ERROR:
      return { ...state, EDIT_ONE_NOTE_ERROR: action.payload };
    default:
      return state;
  }
}
