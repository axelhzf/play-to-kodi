import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Image from '../../../components/Image'


export default class MoviesGrid extends React.Component {

  render () {
    const { movies } = this.props;

    return (
      <div className="poster-grid movies-poster-grid">
        {movies.map((movie, index) =>(
          <div key={`${movie.imdb_id}_${index}`} className="poster-grid-item">
            <Link to={`/movies/${movie.imdb_id}`}>
              <Image src={movie.images.poster} width={97} height={138}/>

              <div className="poster-grid-description">
                <div className="title">{movie.title}</div>
                <div className="description">Movie description</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    )

  }

}