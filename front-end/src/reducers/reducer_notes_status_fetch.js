import {
  FETCH_ALL_NOTES_STARTED,
  FETCH_ALL_NOTES_ERROR,
  FETCH_ALL_NOTES_SUCCESS,
} from '../actions/actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_NOTES_STARTED:
      return 'fetching_started';
    case FETCH_ALL_NOTES_ERROR:
      return 'error';
    case FETCH_ALL_NOTES_SUCCESS:
      return 'fetch_all_notes_success';
    default:
      return state;
  }
}
