import React from 'react'
import api from '../lib/api'
import MoviesGrid from '../components/MoviesGrid'
import Filters from '../components/Filters'

export default class MoviesScreen extends React.Component {

  state = {
    movies: []
  }

  componentDidMount () {
    this.fetchMovies()
  }

  async fetchMovies () {
    const movies = await api.movies(this.getFilter(this.props))
    this.setState({ movies })
  }

  onChangeFilter = (filter) => {
    this.props.router.replace({
      pathname: '/movies',
      query: filter
    })
  }

  getFilter (props) {
    if (!props) return {}

    const defaultFilter = {
      sort: 'trending',
      order: -1,
      genre: null,
      keywords: ""
    }
    let {sort, order, genre, keywords} = props.location.query;
    return _.defaults({sort, order: this.parseInt(order), genre, keywords}, defaultFilter)
  }

  parseInt(number) {
    const int = parseInt(number, 10)
    return _.isNaN(int) ? undefined : int;
  }

  componentDidUpdate (prevProps) {
    const prevFilter = this.getFilter(prevProps)
    const currentFilter = this.getFilter(this.props)

    if (!_.isEqual(prevFilter, currentFilter)) {
      this.fetchMovies()
    }
  }

  render () {
    const { movies } = this.state
    if (!movies) return <div></div>

    const filter = this.getFilter(this.props)

    return (
      <div>
        <Filters filter={filter} onChange={this.onChangeFilter} />
        <MoviesGrid movies={movies}/>
      </div>
    )
  }

}