import _ from 'lodash';
import { FETCH_ALL_NOTES_SUCCESS, DEL_NOTE_SUCCESS } from '../actions/actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_NOTES_SUCCESS:
      return _.mapKeys(action.payload.data, '_id');
    case DEL_NOTE_SUCCESS:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
