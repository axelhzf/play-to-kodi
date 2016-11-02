import React from 'react'
import api from '../lib/api'
import MoviesGrid from '../components/MoviesGrid'

export default class MoviesScreen extends React.Component {

  state = {

  }

  componentDidMount () {
    this.fetchMovies()
  }

  async fetchMovies () {
    const movies = await api.movies()
    this.setState({ movies })
  }

  render () {
    const { movies } = this.state
    if (!movies) return <div></div>
    return (<MoviesGrid movies={movies}/>)
  }

}