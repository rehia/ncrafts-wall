import wall from 'redux-ping/lib/reducers/wall';
import { RESIZE } from './actions';

function viewport(state = {}, {type, columns}) {
  switch (type) {
    case RESIZE:
      return {
        columns
      };
    default:
      return state;
  }
}

export default { wall, viewport };
