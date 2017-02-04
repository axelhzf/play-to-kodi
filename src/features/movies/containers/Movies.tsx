import Movies from '../components/Movies';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import {getMovies} from "../state/selectors";

const mapStateToProps = (state) => {
  return {
    movies: getMovies(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovies: () => dispatch(actions.fetchMovies())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);