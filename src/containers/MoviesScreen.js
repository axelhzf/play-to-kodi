import React from 'react'
import api from '../lib/api'
import MoviesGrid from '../components/MoviesGrid'
import Filters from '../components/Filters'

export default class MoviesScreen extends React.Component {

  state = {
    filter: {
      sort: 'trending',
      order: -1,
      genre: null,
      keywords: ""
    }
  }

  componentDidMount () {
    this.fetchMovies()
  }

  async fetchMovies () {
    const {filter} = this.state
    const movies = await api.movies(filter)
    this.setState({ movies })
  }

  onChangeFilter = (filter) => {
    this.setState({filter})
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.fetchMovies()
    }
  }

  render () {
    const { movies, filter } = this.state
    if (!movies) return <div></div>
    return (
      <div>
        <Filters filter={filter} onChange={this.onChangeFilter} />
        <MoviesGrid movies={movies}/>
      </div>
    )
  }

}