'use strict';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {getMedias} from './selectors';
import Media from './Media.jsx';

const MediaWall = (props) => {
  const bootstrapWidth = Math.floor(12 / (props.viewport.columns || 3)).toString();
  console.log(props.medias);
  return <div className="media-wall container">
    {props.medias.map((media, i) => <Media key={media.id} index={i} bootstrapWidth={bootstrapWidth} {...media} />)}
  </div>;
};

MediaWall.propTypes = {
  medias: PropTypes.array,
  viewport: PropTypes.object
};

export default connect(({wall, viewport}) => {
  return {
    medias: getMedias({wall}),
    viewport
  };
})(MediaWall);
