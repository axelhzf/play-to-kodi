import { take, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as C from './constants';
import api from '../../../lib/api';
import { normalize } from 'normalizr';
import * as schemas from './schemas';

export function* moviesSaga(): IterableIterator<any> {
  while(true) {
    const { payload: { query } } = yield take(C.FETCH_MOVIES);
    try {
      const movies = yield call(api.movies, query);
      const normalizedMovies = normalize(movies, schemas.movies);
      const action = actions.fetchMoviesSuccess(normalizedMovies);
      yield put(action);
    } catch(error) {
      console.log(error);
      yield put(actions.fetchMoviesError(error));
    }
  }
}
