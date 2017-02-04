import { fork } from 'redux-saga/effects';
import { moviesSaga } from '../features/movies/state/sagas';

export default function* (): IterableIterator<any> {
  yield fork(moviesSaga);
}
