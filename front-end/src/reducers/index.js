import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SelectedNotes from './reducer_note_selected';
import FetchStatusReducer from './reducer_notes_status_fetch';
import AddStatusReducer from './reducer_notes_status_add';
import DelStatusReducer from './reducer_notes_status_del';
import EditStatusReducer from './reducer_notes_status_edit';
import GeneralNotesReducer from './reducer_notes_general';
import ErorsNotesReducer from './reducer_notes_errors';

const rootReducer = combineReducers({
  selectedNote: SelectedNotes,
  fetchAllStatus: FetchStatusReducer,
  addNoteStatus: AddStatusReducer,
  delNoteStatus: DelStatusReducer,
  editNoteStatus: EditStatusReducer,
  notes: GeneralNotesReducer,
  errors: ErorsNotesReducer,
  form: formReducer,
});

export default rootReducer;
