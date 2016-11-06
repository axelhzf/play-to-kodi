import React from 'react'
import api from '../lib/api'
import ShowsGrid from '../components/ShowsGrid'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default class ShowsScreen extends React.Component {

  state = {
    sortBy: 'trending',
    order: -1,
    genre: null
  }

  componentDidMount () {
    this.fetchShows()
  }

  async fetchShows () {
    const { sortBy, order, genre } = this.state;
    const shows = await api.shows({ sort: sortBy, order, genre })
    this.setState({ shows })
  }

  onSortByChange = (sortOption) => {
    this.setState({ sortBy: _.get(sortOption, "value") })
  }

  onOrderChange = (orderOption) => {
    this.setState({ order: _.get(orderOption, "value") })
  }

  onGenreChange = (genreOption) => {
    this.setState({ genre: _.get(genreOption, "value") })
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      prevState.sortBy !== this.state.sortBy ||
      prevState.order !== this.state.order ||
      prevState.genre !== this.state.genre
    ) {
      this.fetchShows()
    }
  }

  render () {
    const { shows, sortBy, order, genre } = this.state
    if (!shows) return <div></div>

    return (
      <div>

        <div className="filters">
          <div className="filter">
            <label>Genre</label>
            <Select value={genre} options={GENRE_OPTIONS} onChange={this.onGenreChange} style={{ width: 200 }}/>
          </div>
          <div className="filter">
            <label>Sort</label>
            <Select value={sortBy} options={SORT_OPTIONS} onChange={this.onSortByChange} style={{ width: 300 }} clearable={false}/>
          </div>
          <div className="filter">
            <label>Order</label>
            <Select value={order} options={ORDER_OPTIONS} onChange={this.onOrderChange} style={{ width: 200 }} clearable={false}/>
          </div>
        </div>

        <ShowsGrid shows={shows}/>
      </div>
    )
  }

}

const SORT_OPTIONS = [
  { value: 'trending', label: 'Trending' },
  { value: 'rating', label: 'Rating' },
  { value: 'updated', label: 'Updated' },
  { value: 'year', label: 'Year' },
  { value: 'name', label: 'Name' }
]

const ORDER_OPTIONS = [
  { value: -1, label: "Desc" },
  { value: 1, label: "Asc" },
]

const GENRE_OPTIONS = [
  { value: "action", label: "Action" },
  { value: "adventure", label: "Adventure" },
  { value: "animation", label: "Animation" },
  { value: "comedy", label: "Comedy" },
  { value: "crime", label: "Crime" },
  { value: "disaster", label: "Disaster" },
  { value: "documentary", label: "Documentary" },
  { value: "drama", label: "Drama" },
  { value: "eastern", label: "Eastern" },
  { value: "family", label: "Family" },
  { value: "fan-film", label: "Fan-film" },
  { value: "fantasy", label: "Fantasy" },
  { value: "film-noir", label: "Film-noir" },
  { value: "history", label: "History" },
  { value: "holiday", label: "Holiday" },
  { value: "horror", label: "Horror" },
  { value: "indie", label: "Indie" },
  { value: "music", label: "Music" },
  { value: "mystery", label: "Mystery" },
  { value: "none", label: "None" },
  { value: "road", label: "Road" },
  { value: "romance", label: "Romance" },
  { value: "science-fiction", label: "Science-fiction" },
  { value: "short", label: "Short" },
  { value: "sports", label: "Sports" },
  { value: "sporting-event", label: "Sporting-event" },
  { value: "suspense", label: "Suspense" },
  { value: "thriller", label: "Thriller" },
  { value: "tv-movie", label: "TV-movie" },
  { value: "war", label: "War" },
  { value: "western", label: "Western" }
]