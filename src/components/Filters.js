import React, { PropTypes } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default class Filters extends React.Component {

  state = {
    keywords: ""
  }

  propsType = {
    filter: PropTypes.shape({
      sort: PropTypes.string.required,
      order: PropTypes.number.required,
      genre: PropTypes.string,
      keywords: PropTypes.string
    }).required,
    onChange: PropTypes.func
  }

  componentDidMount () {
    this.setState({ keywords: this.props.filter.keywords || "" })
  }

  onSortChange = (option) => {
    const newFilter = Object.assign({}, this.props.filter, { sort: _.get(option, "value") });
    this.props.onChange(newFilter)
  }

  onOrderChange = (option) => {
    const newFilter = Object.assign({}, this.props.filter, { order: _.get(option, "value") });
    this.props.onChange(newFilter)
  }

  onGenreChange = (option) => {
    const newFilter = Object.assign({}, this.props.filter, { genre: _.get(option, "value") });
    this.props.onChange(newFilter)
  }

  onKeywordsChange = (event) => {
    this.setState({ keywords: event.target.value })
  }

  onKeywordsKeyPress = event => {
    if (event.key === 'Enter') {
      const newFilter = Object.assign({}, this.props.filter, { keywords: this.state.keywords });
      this.props.onChange(newFilter)
    }
  }

  render () {
    const { keywords } = this.state
    const { sort, order, genre } = this.props.filter

    return (
      <div className="filters">
        <div className="filter">
          <label>Search</label>
          <div>
            <input className="input-search"
                   value={keywords}
                   onChange={this.onKeywordsChange}
                   onKeyPress={this.onKeywordsKeyPress}
                   style={{ width: 300 }}/>
          </div>
        </div>
        <div className="filter">
          <label>Genre</label>
          <Select value={genre} options={GENRE_OPTIONS} onChange={this.onGenreChange} style={{ width: 200 }}/>
        </div>
        <div className="filter">
          <label>Sort</label>
          <Select value={sort} options={SORT_OPTIONS} onChange={this.onSortChange} style={{ width: 200 }}
                  clearable={false}/>
        </div>
        <div className="filter">
          <label>Order</label>
          <Select value={order} options={ORDER_OPTIONS} onChange={this.onOrderChange} style={{ width: 200 }}
                  clearable={false}/>
        </div>
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