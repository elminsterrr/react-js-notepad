import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import './style/bootstrap.min.css';
import './style/quill.snow.css';
import './style/style.css';

import reducers from './reducers/index';
import NoteNew from './containers/NoteNew';
import NoteEdit from './containers/NoteEdit';
import NotesError from './containers/NotesError';
import NotesIndex from './containers/NotesIndex';

import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/notes/new" component={NoteNew} />
          <Route path="/notes/edit" component={NoteEdit} />
          <Route path="/notes/error" component={NotesError} />
          <Route path="/" component={NotesIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.container')
);
registerServiceWorker();
