import React from 'react'
import api from '../lib/api'
import ShowsGrid from '../components/ShowsGrid'
import Filters from '../components/Filters'

export default class ShowsScreen extends React.Component {

  state = {
    filter: {
      sort: 'trending',
      order: -1,
      genre: null,
      keywords: ""
    }
  }

  componentDidMount () {
    this.fetchShows()
  }

  async fetchShows () {
    const { filter } = this.state;
    const shows = await api.shows(filter)
    this.setState({ shows })
  }

  onChangeFilter = (filter) => {
    this.setState({filter})
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.fetchShows()
    }
  }

  render () {
    const { shows, filter } = this.state
    if (!shows) return <div></div>

    return (
      <div>
        <Filters filter={filter} onChange={this.onChangeFilter} />
        <ShowsGrid shows={shows}/>
      </div>
    )
  }

}