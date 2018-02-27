import {
  ADD_NOTE_STARTED,
  ADD_NOTE_ERROR,
  ADD_NOTE_SUCCESS,
} from '../actions/actions';

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_NOTE_STARTED:
      return 'adding_started';
    case ADD_NOTE_ERROR:
      return 'error';
    case ADD_NOTE_SUCCESS:
      return 'add_note_success';
    default:
      return state;
  }
}
