import * as React from 'react';
import Movie from '../components/Movie';
import {connect} from "react-redux";
import * as actions from '../state/actions';

const getMovie = (state, movieId) => {
  const movie = state.movie.movie;
  if (movie.item) {
    movie.item = state.entities.movieDetails[movieId];
  }
  return movie;
};

const mapStateToProps = (state, props) => {
  const { movieId } = props.params;
  return {
    movie: getMovie(state, movieId)
  }
};

const mapDispatchToProps = (dispatch, props) => {
  const { movieId } = props.params;
  return {
    fetchMovie: () => dispatch(actions.fetchMovie(movieId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);