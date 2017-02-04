import { combineReducers } from 'redux';
import * as C from './constants';
import * as R from 'ramda';

function movies(state = {}, action) {
  switch (action.type) {
    case C.FETCH_MOVIES: {
      const item = action.payload.query.page === 1 ? null : state.item;
      return { loading: true, item: item, error: null };
    }
    case C.FETCH_MOVIES_SUCCESS: {
      const item = action.payload.query.page === 1
        ? action.payload.data.result
        : R.concat(state.item || [], action.payload.data.result);
      return { loading: false, item };
    }
    case C.FETCH_MOVIES_ERROR: {
      return { loading: false, error: action.error };
    }
  }
  return state;
}

export default combineReducers({
  movies
})
