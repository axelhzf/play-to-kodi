import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './MoviesGrid.css'

export default class MoviesGrid extends React.Component {

  render () {
    const { movies } = this.props;

    return (
      <div className={styles.grid}>
        {movies.map(movie =>(
          <div key={movie.imdb_id} className={styles.item}>
            <Link to={`/movies/${movie.imdb_id}`}>
              <img className={styles.poster} src={movie.images.poster}/>
              <div className={styles.title}>{movie.title}</div>
              <div className={styles.description}>Movie description</div>
            </Link>
          </div>
        ))}
      </div>
    )

  }

}