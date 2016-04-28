'use strict';

import connect from 'tweetping-connect';
import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import wallReducer from 'redux-ping/lib/reducers/wall';
import { aggregate, setSize, fetchHistory } from 'redux-ping/lib/actions/wall';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Wall from './Wall.jsx';
import LastTweet from './LastTweet.jsx';
import {parse as parseQuery} from 'querystring';

function viewportReducer(state = {}, {type, columns}) {
  switch (type) {
    case 'RESIZE': {
      return {columns};
    }
    default: {
      return state;
    }
  }
}

function resize(columns) {
  return {
    type: 'RESIZE',
    columns
  };
}

const params = parseQuery(document.location.search.replace('?', ''));
const columns = parseInt(params.columns, 10) || 3;
const lines = parseInt(params.lines, 10) || 3;

const streamId = 'd8eeba3a';

const reducers = {
  wall: wallReducer,
  viewport: viewportReducer
};

const store = createStore(combineReducers(reducers), undefined, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.dispatch(setSize(columns * lines));
store.dispatch(resize(columns));

setTimeout(() => {
  store.dispatch(fetchHistory(streamId, {}));
});

connect(streamId, 'wall', (post) => {
  store.dispatch(aggregate(post));
}, 'wss://tweetping.net/');

ReactDOM.render(<Provider store={store}>
  <div>
    <LastTweet />
    <Wall />
  </div>
</Provider>, document.getElementById('content'));
