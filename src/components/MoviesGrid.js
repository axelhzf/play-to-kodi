import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default class MoviesGrid extends React.Component {

  render () {
    const { movies } = this.props;

    return (
      <div className="poster-grid movies-poster-grid">
        {movies.map(movie =>(
          <div key={movie.imdb_id} className="poster-grid-item">
            <Link to={`/movies/${movie.imdb_id}`}>
              <img className="poster-grid-poster" src={movie.images.poster}/>
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