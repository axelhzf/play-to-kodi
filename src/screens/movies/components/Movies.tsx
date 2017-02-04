import * as React from 'react';
import * as R from 'ramda';
import Filter from "./Filter";
import MoviesGrid from './MoviesGrid';
import Container from 'components/Container';
import VisibilitySensor from 'components/VisibilitySensor';
import Loading from "components/Loading";

interface MoviesScreenProps {
  movies: AsyncItem<Movie[]>,
  query: MoviesQuery,
  fetchMovies: (query: MoviesQuery) => void,
  setQuery: (query: MoviesQuery) => void,
}

export default class Movies extends React.Component<MoviesScreenProps, null> {

  componentDidMount() {
    const {query} = this.props;
    if (query.page === 1) {
      this.props.fetchMovies(query)
    } else {
      this.props.setQuery({...query, page: 1});
    }
  }

  componentWillReceiveProps(nextProps: MoviesScreenProps) {
    const nextQuery = nextProps.query;
    const query = this.props.query;

    if (!R.equals(nextQuery, query)) {
      this.props.fetchMovies(nextQuery);
    }
  }

  handleQueryChange = (query: MoviesQuery) => {
    this.props.setQuery(query);
  };

  handleBottomGridVisibilityChange = (active: boolean) => {
    if (active && this.props.query) {
      const {query} = this.props;
      const nextQuery = {...query, page: query.page + 1};
      this.props.setQuery(nextQuery);
    }
  };

  renderMovies = () => {
    const {movies} = this.props;
    if (!movies) return null;

    return (
      <div>
        { movies.item.length > 0 && <MoviesGrid movies={movies.item}/> }
        { !movies.loading && movies.item.length === 0 && <h1>Empty</h1> }
        { movies.loading && <Loading/> }
        <VisibilitySensor
          onChange={this.handleBottomGridVisibilityChange}
          offset={300}
          active={!movies.loading}
        />
      </div>
    );
  };

  render() {
    const {query} = this.props;
    return (
      <Container>
        <Filter query={query} onQueryChange={this.handleQueryChange} />
        { this.renderMovies() }
      </Container>
    )
  }

}

