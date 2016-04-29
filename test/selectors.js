import { expect } from 'chai';
import { getTwoLast } from '../app/js/selectors';
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
});


