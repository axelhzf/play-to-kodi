import React from 'react'
import api from '../lib/api'
import Image from '../components/Image'

export default class MovieScreen extends React.Component {

  state = {}

  componentDidMount () {
    this.fetchMovie()
  }

  async fetchMovie () {
    const { params } = this.props
    const movie = await api.movieDetails(params.id)
    this.setState({ movie })
  }

  playMovie = async () => {
    const { movie } = this.state
    try {
      const torrent = movie.torrents.en[ "1080p" ] || movie.torrents.en[ "720p" ] || movie.torrents.end[ "480p" ];
      const magnet = torrent.url;

      await api.playMagnet(magnet);
    } catch (e) {
      console.error(e);
    }
  }

  render () {

    const { movie } = this.state

    if (!movie) {
      return (<div>Loading</div>)
    }

    return (
      <div className="movie">
        <Image src={movie.images.fanart} width={320} height={180}/>
        <div className="movie-content">

          <h3>{movie.title}</h3>
          <p>{movie.synopsis}</p>
          <button onClick={this.playMovie}>Play now <i className="icon ion-ios-play"/></button>

        </div>
      </div >
    )

  }

}