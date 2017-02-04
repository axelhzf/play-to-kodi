import { combineReducers } from 'redux';
import * as C from './constants';

function movie(state = {}, action) {
  switch (action.type) {
    case C.FETCH_MOVIE: return { loading: true, item: null, error: null };
    case C.FETCH_MOVIE_SUCCESS: return { loading: false, item: action.payload.result };
    case C.FETCH_MOVIE_ERROR: return { loading: false, error: action.error };
  }
  return state;
}

export default combineReducers({
  movie,
})
