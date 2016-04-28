'use strict';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import wallSelector from 'redux-ping/lib/selectors/wall';
import Tweet from './Tweet.jsx';

const Wall = (props) => {
  const tweets = props.wall;
  const bootstrapWidth = Math.floor(12 / (props.viewport.columns || 3)).toString();
  return <div className="wall container">
    {tweets.map((item, i) => <Tweet key={item._id} index={i} bootstrapWidth={bootstrapWidth} {...item} />)}
  </div>;
};

Wall.propTypes = {
  wall: PropTypes.any,
  viewport: PropTypes.object
};

export default connect(({wall, viewport}) => {
  return {
    wall: wallSelector.all(wall),
    viewport
  };
})(Wall);
