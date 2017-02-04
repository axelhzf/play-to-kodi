import * as React from 'react';
import MoviesGrid from './MoviesGrid';
import Filters from '../../../components/Filters';
import * as InfiniteScroll from 'react-infinite-scroller';
import { Gateway } from 'react-gateway';
import * as _ from 'lodash';
import { LocationDescriptor, InjectedRouter } from '@types/react-router';
import { ProgressBar } from 'react-toolbox';
import Loading from "../../../components/Loading";

interface MoviesScreenProps {
  location: LocationDescriptor,
  router: InjectedRouter,
  movies: any,
  fetchMovies: () => void,
}

interface MoviesScreenState {
  movies: Movie[],
  hasMore: boolean,
  filterOpen: boolean,
}

export default class Movies extends React.Component<MoviesScreenProps, MoviesScreenState> {

  state = {
    movies: [] as Movie[],
    hasMore: true,
    filterOpen: false
  };

  componentDidMount () {
    this.props.fetchMovies()
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
      //this.fetchMovies()
    }
  }

  loadMore = async (page: number) => {
    if (page === 1) return;

/*
    const newMovies = await api.movies(page, this.getFilter(this.props))
    const movies = [].concat(this.state.movies, newMovies)
    this.setState({ movies, hasMore: newMovies.length > 0 })
 */
  }

  render () {
    const { movies } = this.props;
    console.log(movies);
    if (!movies) return null;


    if (movies.loading) return <Loading/>
    if (movies.error) return <div>Error</div>;
    if (!movies.items) return null;

    return (
      <div>
        <MoviesGrid movies={movies.items}/>
      </div>
    )
  }

}