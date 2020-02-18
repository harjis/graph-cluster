// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

import App from './App';
import reducer from './reducers';

import 'normalize.css';
import './index.css';

const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
