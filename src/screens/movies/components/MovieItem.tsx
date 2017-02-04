import * as React from 'react';
import { Link } from "react-router";
import Image from 'components/Image';
import styled from 'styled-components';
import * as variables from 'styles/variables';

interface MovieItemProps {
  movie: Movie
}

const imageRation = 750 / 500;
const imageToShow = 5;
const imageMarginRight = 7;
const imageWidth = Math.floor((variables.containerWidth - ((imageToShow - 1) * imageMarginRight)) / imageToShow);

export default class MovieItem extends React.Component<MovieItemProps, null> {

  render () {
    const { movie } = this.props;
    return (
      <Wrapper>
        <Link to={`/movies/${movie.imdb_id}`}>
          <Image src={movie.images.poster} width={imageWidth} height={imageWidth * imageRation}/>

          <Text>
            <Title>{movie.title}</Title>
            <Description>{movie.year}</Description>
          </Text>
        </Link>
      </Wrapper>
    )
  }

}

const Wrapper = styled.div`
  margin-right: ${imageMarginRight}px;
  margin-bottom: 7px;
  width: ${imageWidth}px;
  
  &:nth-child(${imageToShow}n) {
    margin-right: 0;
  }
`;

const Title = styled.div`
  font-weight: bold;
`;

const Description = styled.div`
  
`;

const Text = styled.div`
  
`;