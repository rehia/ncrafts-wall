'use strict';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Tweet from './Tweet.jsx';

const LastTweet = (props) => {
  const tweet = props.wall.all.items.slice(-1)[0];
  if (tweet) {
    return <div className="last-tweet container">
      <Tweet key={tweet._id} bootstrapWidth="8" bootstrapOffset="2" pictureSize="bigger" {...tweet} />
    </div>;
  }
  return null;
};

LastTweet.propTypes = {
  bootstrapWidth: PropTypes.string,
  bootstrapOffset: PropTypes.string,
  wall: PropTypes.object
};

export default connect(({wall}) => {
  return {wall};
})(LastTweet);
