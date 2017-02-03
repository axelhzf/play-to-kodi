import * as React from 'react'
import api from '../lib/api'
import MoviesGrid from '../components/MoviesGrid'
import Filters from '../components/Filters'
import * as InfiniteScroll from 'react-infinite-scroller'
import { Gateway } from 'react-gateway'
import * as _ from 'lodash';
import { LocationDescriptor, InjectedRouter } from '@types/react-router';

interface MoviesScreenProps {
  location: LocationDescriptor,
  router: InjectedRouter
}

interface MoviesScreenState {
  movies: Movie[],
  hasMore: boolean,
  filterOpen: boolean,
}

export default class MoviesScreen extends React.Component<MoviesScreenProps, MoviesScreenState> {

  state = {
    movies: [] as Movie[],
    hasMore: true,
    filterOpen: false
  };

  componentDidMount () {
    this.fetchMovies()
  }

  async fetchMovies () {
    const movies = await api.movies(1, this.getFilter(this.props));
    this.setState({ movies, hasMore: movies.length > 0 })
  }

  onCloseFilter = (filter: MoviesQuery) => {
    this.setState({filterOpen: false})

    this.props.router.replace({
      pathname: '/movies',
      query: filter
    })
  }

  getFilter (props: MoviesScreenProps) {
    if (!props) return {}

    const defaultFilter: MoviesQuery = {
      sort: 'trending',
      order: -1,
      genre: null,
      keywords: ""
    }
    let { sort, order, genre, keywords } = props.location.query as { [key: string]: string };
    return _.defaults({sort, order: this.parseInt(order), genre, keywords}, defaultFilter)
  }

  parseInt(number: string) {
    const int = parseInt(number, 10)
    return _.isNaN(int) ? undefined : int;
  }

  componentDidUpdate (prevProps: MoviesScreenProps) {
    const prevFilter = this.getFilter(prevProps)
    const currentFilter = this.getFilter(this.props)

    if (!_.isEqual(prevFilter, currentFilter)) {
      this.fetchMovies()
    }
  }

  loadMore = async (page: number) => {
    if (page === 1) return;

    const newMovies = await api.movies(page, this.getFilter(this.props))
    const movies = [].concat(this.state.movies, newMovies)
    this.setState({ movies, hasMore: newMovies.length > 0 })
  }

  render () {
    const { movies } = this.state
    if (!movies) return <div></div>

    const filter = this.getFilter(this.props)

    return (
      <div>

        <Gateway into="header-right">
          <button onClick={() => this.setState({filterOpen: true})}><i className="icon ion-search"/></button>
        </Gateway>

        <Filters
          open={this.state.filterOpen}
          onClose={this.onCloseFilter}
          filter={filter}
        />

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={this.state.hasMore}
          loader={<div className="loader">Loading ...</div>}
        >
          <MoviesGrid movies={movies}/>
        </InfiniteScroll>
      </div>
    )
  }

}