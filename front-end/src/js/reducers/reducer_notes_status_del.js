import { DEL_NOTE_STARTED, DEL_NOTE_ERROR, DEL_NOTE_SUCCESS } from '../actions/actions';

export default function (state = {}, action) {
  switch (action.type) {
    case DEL_NOTE_STARTED:
      return 'deleting_started';
    case DEL_NOTE_ERROR:
      return 'error';
    case DEL_NOTE_SUCCESS:
      return 'del_note_success';
    default:
      return state;
  }
}
