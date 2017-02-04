import {take, put, call, fork} from 'redux-saga/effects';
import * as actions from './actions';
import * as C from './constants';
import api from '../../../lib/api';
import {normalize} from 'normalizr';
import * as schemas from './schemas';

function* fetchMovie(): IterableIterator<any> {
  while (true) {
    const {payload: {movieId}} = yield take(C.FETCH_MOVIE);
    try {
      const movie = yield call(api.movieDetails, movieId);
      const normalizedMovie = normalize(movie, schemas.movieDetails);
      const action = actions.fetchMovieSuccess(normalizedMovie);
      yield put(action);
    } catch (error) {
      yield put(actions.fetchMovieError(error));
    }
  }
}

export default function*(): IterableIterator<any> {
  yield fork(fetchMovie);
}
