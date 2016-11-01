import React from 'react'
import api from '../lib/api'
import {Link} from 'react-router'

export default class ShowsScreen extends React.Component {

  state = {

  }

  componentDidMount () {
    this.fetchShows()
  }

  async fetchShows () {
    const shows = await api.shows()
    this.setState({ shows })
  }

  render () {
    const { shows } = this.state

    if (!shows) {
      return <div></div>
    }

    return (
      <ul>
        {shows.map(show =>(
          <li key={show.imdb_id}>
            <Link to={`/shows/${show.imdb_id}`}>{show.title}</Link>
          </li>
        ))}
      </ul>
    )

  }

}