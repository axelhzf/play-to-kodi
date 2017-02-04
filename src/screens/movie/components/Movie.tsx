import * as React from 'react';
import {Button} from "react-toolbox";
import Image from 'components/Image';
import Loading from 'components/Loading';

interface MovieProps {
  fetchMovie: () => void,
}

export default class Movie extends React.Component<MovieProps, null> {

  componentDidMount() {
    this.props.fetchMovie();
  }

  render() {
    const {movie} = this.props;
    if (movie.loading) return <Loading />;
    if (!movie.item) return null;
    return (
      <div>
        <Image src={movie.item.images.fanart} width={320} height={180} />
        <div className="movie-content">
          <h3>{movie.item.title}</h3>
          <p>{movie.item.synopsis}</p>
          <Button raised primary icon="tv">Play now</Button>
        </div>
      </div>
    )
  }

}