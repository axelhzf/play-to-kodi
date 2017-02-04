import Movies from '../components/Movies';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import {getMovies} from "../state/selectors";
import * as R from 'ramda';

const getLocationQuery = (location) => {
  return R.map(
    (value: string) => {
      if (!value) return value;
      if (!isNaN(value)) return parseFloat(value);
      return value;
    },
    location.query
  )
};

const mapStateToProps = (state, props) => {
  const defaultQuery = {
    sort: 'trending',
    order: -1,
    genre: null,
    keywords: ""
  };

  const locationQuery = getLocationQuery(props.location);
  const query = R.merge(defaultQuery, locationQuery);
  return {
    movies: getMovies(state),
    query,
    setQuery: (query: MoviesQuery) => {
      props.router.replace({ pathname: '/movies', query})
    }
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchMovies: (query: MoviesQuery) => dispatch(actions.fetchMovies(query)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);