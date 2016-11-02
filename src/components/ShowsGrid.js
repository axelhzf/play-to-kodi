import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './ShowsGrid.css'

export default class ShowsGrid extends React.Component {

  render () {
    const { shows } = this.props;

    return (
      <div className={styles.grid}>
        {shows.map(show =>(
          <div key={show.imdb_id} className={styles.item}>
            <Link to={`/shows/${show.imdb_id}`}>
              <img className={styles.poster} src={show.images.poster}/>
              <div className={styles.title}>{show.title}</div>
              <div className={styles.description}>Seasons {show.num_seasons}</div>
            </Link>
          </div>
        ))}
      </div>
    )

  }

}