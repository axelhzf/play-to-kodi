import { combineReducers } from 'redux';
import * as R from 'ramda';
import movies from '../screens/movies/state/reducer';
import movie from '../screens/movie/state/reducer';

const entities = (state = {}, action) => {
  const entities = R.path(["payload", "entities"])(action);
  if (entities) return R.merge(state, entities);
  return state;
}

export default combineReducers({
  entities,
  movies,
  movie,
});
