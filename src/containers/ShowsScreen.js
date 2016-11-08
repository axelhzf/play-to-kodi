import React from 'react'
import api from '../lib/api'
import ShowsGrid from '../components/ShowsGrid'
import Filters from '../components/Filters'
import InfiniteScroll from 'react-infinite-scroller'
import {Gateway} from 'react-gateway'

export default class ShowsScreen extends React.Component {

  state = {
    shows: [],
    filterOpen: false
  }

  componentDidMount () {
    this.fetchShows()
  }

  async fetchShows () {
    const shows = await api.shows(1, this.getFilter(this.props))
    this.setState({ shows })
  }

  onCloseFilter = (filter) => {
    console.log("close filter");
    this.setState({filterOpen: false})

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
      console.log("component did update")
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
          hasMore={false} //improve this
          loader={<div className="loader">Loading ...</div>}
        >
          <ShowsGrid shows={shows}/>
        </InfiniteScroll>

      </div>
    )
  }

}
