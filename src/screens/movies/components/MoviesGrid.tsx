import * as React from 'react'
import MovieItem from './MovieItem';
import * as R from 'ramda';
import styled from 'styled-components';

interface MoviesGridProps {
  movies: Movie[]
}

const mapWithIndex = R.addIndex(R.map);

export default class MoviesGrid extends React.Component<MoviesGridProps, null> {

  renderMovie = (movie: Movie, index: number) => {
    const key = `${movie.imdb_id}_${index}`;
    return <MovieItem movie={movie} key={key}/>;
  };

  renderMovies = mapWithIndex(this.renderMovie);

  render () {
    const { movies } = this.props;
    return (
      <GridWrapper>{ this.renderMovies(movies) }</GridWrapper>
    )
  }
}

const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;