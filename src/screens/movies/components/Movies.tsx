import * as React from 'react';
import * as R from 'ramda';
import AsyncItemPlaceholder from "components/AsyncItemPlaceholder";
import Filter from "./Filter";
import MoviesGrid from './MoviesGrid';
import Container from 'components/Container';

interface MoviesScreenProps {
  movies: AsyncItem<Movie>,
  query: MoviesQuery,
  fetchMovies: (query: MoviesQuery) => void,
  setQuery: (query: MoviesQuery) => void,
}

export default class Movies extends React.Component<MoviesScreenProps, null> {

  componentDidMount () {
    this.props.fetchMovies(this.props.query)
  }

  componentWillReceiveProps (nextProps: MoviesScreenProps) {
    const nextQuery = nextProps.query;
    const query = this.props.query;

    if (!R.equals(nextQuery, query)) {
      this.props.fetchMovies(nextQuery);
    }
  }

  handleQueryChange = (query: MoviesQuery) => {
    this.props.setQuery(query);
  };

  renderMovies = (movies: Movie[]) => {
    return <MoviesGrid movies={movies}/>;
  };

  render () {
    const { query } = this.props;
    return (
      <Container>
        <Filter query={query} onQueryChange={this.handleQueryChange} />
        <AsyncItemPlaceholder item={this.props.movies} loaded={this.renderMovies} />
      </Container>
    )
  }

}

