'use strict';
import {createSelector} from 'reselect';
import wallSelector from 'redux-ping/lib/selectors/wall';

const posts = state => state.wall.all.items;
const wall = state => state.wall;

export const getTwoLast = createSelector([
  posts
], (posts) => {
  return posts.slice(0, 2);
});

export const getMedias = createSelector([
  wall
], (posts) => {
  const mediaIds = [];
  return wallSelector.all(posts)
    .filter(post => post.entities.media)
    .map(post =>
      post.entities.media.map(media => Object.assign({}, media, {
        id: media.id_str,
        url: media.media_url,
        userName: post.user.name,
        userPicture: post.user.profile_picture
      })))
    .reduce((list, medias) => list.concat(medias), [])
    .filter(media => {
      if (mediaIds.indexOf(media.id) < 0) {
        mediaIds.push(media.id);
        return true;
      }
      return false;
    });
});