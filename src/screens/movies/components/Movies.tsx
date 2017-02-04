import * as React from 'react';
import MoviesGrid from './MoviesGrid';
import * as R from 'ramda';
import { Gateway } from 'react-gateway';
import Loading from "components/Loading";
import styled from 'styled-components';
import Filter from "./Filter";

interface MoviesScreenProps {
  movies: any,
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

  renderContent() {
    const { movies } = this.props;
    if (!movies) return null;
    if (movies.loading) return <Loading/>;
    if (movies.error) return <div>Error</div>;
    if (!movies.items) return null;
    return <MoviesGrid movies={movies.items}/>;
  }

  render () {
    const { query } = this.props;
    return (
      <Wrapper>
        <Filter query={query} onQueryChange={this.handleQueryChange} />
        { this.renderContent() }
      </Wrapper>
    )
  }

}

const Wrapper = styled.div`
  padding: 10px;
`;

