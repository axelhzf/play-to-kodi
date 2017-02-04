import * as C from './constants';

export const fetchMovie = (movieId: string) => {
  return { type : C.FETCH_MOVIE, payload: { movieId } }
};

export const fetchMovieSuccess = (payload: any) => {
  return { type: C.FETCH_MOVIE_SUCCESS, payload }
};

export const fetchMovieError = (error: Error) => {
  return { type: C.FETCH_MOVIE_ERROR, error }
};