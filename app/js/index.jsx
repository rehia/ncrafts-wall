'use strict';

import connect from 'tweetping-connect';
import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { aggregate, setSize, fetchHistory } from 'redux-ping/lib/actions/wall';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Wall from './Wall.jsx';
import LastTweet from './LastTweet.jsx';
import MediaWall from './MediaWall.jsx';
import {parse as parseQuery} from 'querystring';
import reducers from './reducers';
import {resize} from './actions';


const params = parseQuery(document.location.search.replace('?', ''));
const columns = parseInt(params.columns, 10) || 3;
const lines = parseInt(params.lines, 10) || 3;
const media = params.hasOwnProperty('media');

const streamId = 'd8eeba3a';

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

if (media) {
  ReactDOM.render(<Provider store={store}>
    <MediaWall />
  </Provider>, document.getElementById('content'));
} else {
  ReactDOM.render(<Provider store={store}>
    <div>
      <LastTweet />
      <Wall />
    </div>
  </Provider>, document.getElementById('content'));
}
