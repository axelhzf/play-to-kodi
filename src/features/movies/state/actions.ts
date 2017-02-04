import * as C from './constants';

export const fetchMovies = (query: MoviesQuery) => {
  return { type : C.FETCH_MOVIES }
}

export const fetchMoviesSuccess = (payload: any) => {
  return { type: C.FETCH_MOVIES_SUCCESS, payload }
}

export const fetchMoviesError = (error: Error) => {
  return { type: C.FETCH_MOVIES_ERROR, error }
}