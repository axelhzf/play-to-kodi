import { combineReducers } from 'redux';
import * as C from './constants';

export default function (state = {}, action) {
  switch (action.type) {
    case C.FETCH_MOVIES: return { loading: true, items: [], error: null }
    case C.FETCH_MOVIES_SUCCESS: return { loading: false, items: action.payload.result }
    case C.FETCH_MOVIES_ERROR: return { loading: false, error: action.error }
  }
  return state;
}
