'use strict';

import React, {PropTypes} from 'react';
import formatTweetText from './formatter';

const Tweet = (props) => {
  const userUrl = `https://twitter.com/${props.user.name}`;
  const tweetUrl = userUrl + '/status/' + props.id;
  
  const text = formatTweetText(props.text, props.entities);
  
  const profilePicture = props.pictureSize ?
    props.user.profile_picture.replace('_normal', '_' + props.pictureSize) :
    props.user.profile_picture;

  function getTweetText() {
    return {__html: text};
  }

  return <div className={`col-md-${props.bootstrapWidth} col-md-offset-${props.bootstrapOffset || 0} tweet-container`}>
    <a href={tweetUrl} target="_blank">
      <div className="tweet">
        <div className="picture">
          <div className="pictureContent">
            <img src={profilePicture}/>
          </div>
        </div>
        <div className="content-text">
          <div className="fade-text"></div>
          <div className="tweet-text">
            <p className="name"><a href={userUrl} target="_blank">@{props.user.name}</a>
            </p>
            <p className="text" dangerouslySetInnerHTML={getTweetText()}/>
          </div>
        </div>
      </div>
    </a>
  </div>;
};

Tweet.propTypes = {
  index: PropTypes.number,
  bootstrapWidth: PropTypes.string,
  bootstrapOffset: PropTypes.string,
  pictureSize: PropTypes.string,
  user: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
  text: PropTypes.string,
  _source: PropTypes.string
};

export default Tweet;
