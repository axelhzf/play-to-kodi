import * as React from 'react';
import {Button} from "react-toolbox";
import Image from 'components/Image';
import Container from 'components/Container';
import styled from "styled-components";
import AsyncItemPlaceholder from "components/AsyncItemPlaceholder";

interface MovieProps {
  movie: AsyncItem<Movie>,
  fetchMovie: () => void,
}

export default class MovieComponent extends React.Component<MovieProps, null> {

  componentDidMount() {
    this.props.fetchMovie();
  }

  renderMovie(movie: Movie) {
    const imageRation = 750 / 500;
    const imageWidth = 320;
    return (
      <Row>
        <Column width={imageWidth}>
          <Image src={movie.images.poster} width={imageWidth} height={imageWidth * imageRation} />
        </Column>
        <Column fit>
          <h1>{movie.title}</h1>
          <Details>
            <li><strong>Year</strong>: {movie.year}</li>
            <li><strong>Genres</strong>: {movie.genres.join(', ')}</li>
            <li><strong>Rating</strong>: {movie.rating.percentage}%</li>
          </Details>
          <p>{movie.synopsis}</p>
          <Button raised primary icon="tv">Play now</Button>
          <Button raised icon="weekend">Watch trailer</Button>
        </Column>
      </Row>
    )
  }

  render() {
    const {movie} = this.props;
    return <AsyncItemPlaceholder item={movie} loaded={this.renderMovie} />;
  }

}

const Row = styled(Container)`
  display: flex;
`;

const Column = styled.div`
  width: ${props => props.width ? `${props.width}px` : 'auto' },
  flex-grow: ${props => props.fit ? '1' : '0' }
  margin-right: 7px;  
  &:last-child {
    margin-right: 0;
  }
`;

const Details = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    display: inline-block;
    margin-right: 14px;
  }
`;