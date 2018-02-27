import {
  EDIT_ONE_NOTE_STARTED,
  EDIT_ONE_NOTE_TOUCHED,
  EDIT_ONE_NOTE_ERROR,
  EDIT_ONE_NOTE_SUCCESS,
} from '../actions/actions';

export default function(state = {}, action) {
  switch (action.type) {
    case EDIT_ONE_NOTE_STARTED:
      return 'edit_note_started';
    case EDIT_ONE_NOTE_TOUCHED:
      return 'edit_note_touched';
    case EDIT_ONE_NOTE_ERROR:
      return 'error';
    case EDIT_ONE_NOTE_SUCCESS:
      return 'edit_note_success';
    default:
      return state;
  }
}
