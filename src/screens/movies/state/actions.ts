import * as C from './constants';

export const fetchMovies = (query: MoviesQuery) => {
  return { type : C.FETCH_MOVIES, payload: { query } }
};

export const fetchMoviesSuccess = (query: MoviesQuery, data: any) => {
  return { type: C.FETCH_MOVIES_SUCCESS, payload: { query, data } }
};

export const fetchMoviesError = (error: Error) => {
  return { type: C.FETCH_MOVIES_ERROR, error }
};