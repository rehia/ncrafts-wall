'use strict';

import React, {PropTypes} from 'react';

const Media = (props) => {
  const userUrl = `https://twitter.com/${props.userName}`;
  const tweetUrl = userUrl + '/status/' + props.id;
  const style = {
    backgroundImage: `url("${props.url}")`
  };

  return <div className={`col-md-${props.bootstrapWidth} col-md-offset-${props.bootstrapOffset || 0} media-container`}>
    <a href={tweetUrl} target="_blank">
      <div className="media" style={style}></div>
    </a>
  </div>;
};

Media.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  bootstrapWidth: PropTypes.string,
  bootstrapOffset: PropTypes.string,
  userName: PropTypes.string,
  userPicture: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default Media;
