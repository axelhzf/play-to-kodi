import { combineReducers } from 'redux';
import * as R from 'ramda';
import movies from '../screens/movies/state/reducer';
import movie from '../screens/movie/state/reducer';
import _ from 'lodash';

const entities = (state = {}, action) => {
  const entities = R.path(["payload", "data", "entities"])(action);
  if (entities) {
    const entity = R.head(R.keys(entities));
    const newState = {
      ...state,
      [entity]: R.merge(state[entity], entities[entity])
    };
    return newState;
  }
  return state;
}

export default combineReducers({
  entities,
  movies,
  movie,
});
