import { fork } from 'redux-saga/effects';
import moviesSaga from '../screens/movies/state/sagas';
import movieSaga from '../screens/movie/state/sagas';

export default function* (): IterableIterator<any> {
  yield fork(moviesSaga);
  yield fork(movieSaga);
}
