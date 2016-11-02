import React from 'react'
import api from '../lib/api'
import _ from 'lodash'

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

  render () {

    const { movie } = this.state

    if (!movie) {
      return (<div>Loading</div>)
    }

    return (
      <div>
        <img src={movie.images.poster} />
        <div>{movie.title}</div>
        <div>{movie.synopsis}</div>
      </div >
    )

  }

}