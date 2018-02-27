import { NOTE_SELECTED, DEL_NOTE_SUCCESS } from '../actions/actions';

export default function(state = null, action) {
  switch (action.type) {
    case NOTE_SELECTED:
      return action.payload;
    case DEL_NOTE_SUCCESS:
      return null;
    default:
      return state;
  }
}
