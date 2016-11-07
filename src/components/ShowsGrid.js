import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default class ShowsGrid extends React.Component {

  render () {
    const { shows } = this.props;

    return (
      <div className="poster-grid shows-poster-grid">
        {shows.map((show, index) =>(
          <div key={`${show.imdb_id}_${index}`} className="poster-grid-item">
            <Link to={`/shows/${show.imdb_id}`}>
              <img className="poster-grid-poster" src={`/images?url=${encodeURIComponent(show.images.poster)}&width=97&height=138`}/>
              <div className="poster-grid-description">
                <div className="title">{show.title}</div>
                <div className="description">Seasons {show.num_seasons}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    )

  }

}