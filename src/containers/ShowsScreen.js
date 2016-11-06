import React from 'react'
import api from '../lib/api'
import ShowsGrid from '../components/ShowsGrid'
import Filters from '../components/Filters'
import InfiniteScroll from 'react-infinite-scroller'

export default class ShowsScreen extends React.Component {

  state = {
    shows: []
  }

  componentDidMount () {
    this.fetchShows()
  }

  async fetchShows () {
    const shows = await api.shows(1, this.getFilter(this.props))
    this.setState({ shows })
  }

  onChangeFilter = (filter) => {
    this.props.router.replace({
      pathname: '/shows',
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
    const { sort, order, genre, keywords } = props.location.query;
    return _.defaults({ sort, order: this.parseInt(order), genre, keywords }, defaultFilter)
  }

  parseInt (number) {
    const int = parseInt(number, 10)
    return _.isNaN(int) ? undefined : int;
  }

  componentDidUpdate (prevProps) {
    const prevFilter = this.getFilter(prevProps)
    const currentFilter = this.getFilter(this.props)

    if (!_.isEqual(prevFilter, currentFilter)) {
      this.fetchShows()
    }
  }

  loadMore = async (page) => {
    if (page === 1) return;

    const newShows = await api.shows(page, this.getFilter(this.props))
    const shows = [].concat(this.state.shows, newShows)
    this.setState({ shows })
  }

  render () {
    const { shows } = this.state
    if (!shows) return <div></div>

    const filter = this.getFilter(this.props)

    return (
      <div>
        <Filters filter={filter} onChange={this.onChangeFilter}/>

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={true}
          loader={<div className="loader">Loading ...</div>}
        >
          <ShowsGrid shows={shows}/>
        </InfiniteScroll>

      </div>
    )
  }

}
