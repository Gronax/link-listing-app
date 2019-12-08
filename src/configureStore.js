import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { createBrowserHistory } from 'history';
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr';
import { connectRouter } from 'connected-react-router';

import { dialogReducer } from './redux/Modules/dialog';
import { linkReducer } from './redux/Modules/links';

export const history = createBrowserHistory();

const composeEnhancers = composeWithDevTools({});

const reducers = combineReducers({
  toastr: toastrReducer,
  form: formReducer,
  dialog: dialogReducer,
  links: linkReducer,
  router: connectRouter(history),
});

const middleware = applyMiddleware(
  ReduxPromise,
  thunk
);

export const store = createStore(reducers, composeEnhancers(middleware));
