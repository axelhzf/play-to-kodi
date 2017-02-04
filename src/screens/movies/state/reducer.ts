import { combineReducers } from 'redux';
import * as C from './constants';

function movies(state = {}, action) {
  switch (action.type) {
    case C.FETCH_MOVIES: return { loading: true, items: [], error: null };
    case C.FETCH_MOVIES_SUCCESS: return { loading: false, items: action.payload.result };
    case C.FETCH_MOVIES_ERROR: return { loading: false, error: action.error };
  }
  return state;
}

function movie(state = {}, action) {
  switch (action.type) {
    case C.FETCH_MOVIE: return { loading: true, item: null, error: null };
    case C.FETCH_MOVIE_SUCCESS: return { loading: false, item: action.payload.result };
    case C.FETCH_MOVIE_ERROR: return { loading: false, error: action.error };
  }
  return state;
}

export default combineReducers({
  movies,
  movie,
})
