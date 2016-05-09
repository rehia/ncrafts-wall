import { expect } from 'chai';
import { getTwoLast, getMedias } from '../app/js/selectors';
import sample from './sample.json';
import reducers from '../app/js/reducers';
import { aggregate, setSize } from 'redux-ping/lib/actions/wall';
import { createStore, combineReducers } from 'redux';

describe('selectors', () => {

  describe('getTwoLast', () => {

    const store = createStore(combineReducers(reducers));
    store.dispatch(setSize(sample.length));
    sample.forEach(post => store.dispatch(aggregate(post)));

    it('should get the two last tweet', () => {
      const result = getTwoLast(store.getState());  
      expect(result).to.have.lengthOf(2);
      expect(result[0]._id).to.be.equal('f32b734208655f969992a3814c00aac9');
      expect(result[1]._id).to.be.equal('f32b734208655f969992a3814c00ad15');
    });
  });

  describe('get medias', () => {
    const store = createStore(combineReducers(reducers));
    store.dispatch(setSize(sample.length));
    sample.forEach(post => store.dispatch(aggregate(post)));
    
    it('should get medias from posts', () => {
      const result = getMedias(store.getState());

      expect(result).to.have.length(7);
      expect(result[0].id).to.equal('725957043622928384');
      expect(result[0].url).to.equal('http://pbs.twimg.com/media/ChMeFbtWYAAmvWV.jpg');
      expect(result[0].userName).to.equal('XDetant');
      expect(result[0].userPicture).to.equal('https://abs.twimg.com/sticky/default_profile_images/default_profile_6_normal.png');
    });
  });
});


