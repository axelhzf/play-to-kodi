import React, { PropTypes } from 'react'
import 'react-select/dist/react-select.css'
import Modal from './Modal'

export default class Filters extends React.Component {

  propsType = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    filter: PropTypes.shape({
      sort: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
      genre: PropTypes.string,
      keywords: PropTypes.string
    }).required,
  }

  state = {
    keywords: ""
  }

  componentDidMount () {
    this.initializeTempFilter();
  }

  componentDidReceiveProps(nextProps) {
    this.initializeTempFilter();
  }

  onOk = () => {
    const { keywords, sort, order, genre } = this.state;
    this.props.onClose({ keywords, sort, order, genre });
  }

  initializeTempFilter() {
    this.setState(this.props.filter)
  }

  render () {
    const { keywords } = this.state
    const {  } = this.props.filter

    return (
      <Modal open={this.props.open} onOk={this.onOk} title="Filter">

        <div className="filters">

          <div className="filter">
            <label>Keywords</label>
            <div>
              <input className="input-search" value={keywords} onChange={e => this.setState({ keywords: e.target.value })}/>
            </div>
          </div>

          <FormRowSelect label="Sort" value={this.state.sort} options={SORT_OPTIONS} onChange={sort => this.setState({sort})}/>
          <FormRowSelect label="Order" value={this.state.order} options={ORDER_OPTIONS} onChange={order => this.setState({order})}/>
          <FormRowSelect label="Genre" value={this.state.genre} options={GENRE_OPTIONS} onChange={genre => this.setState({genre})}/>

        </div>

      </Modal>
    )
  }

}

  class FormRowSelect extends React.Component {

  state = {
    open: false
  }

  onSelectOption(option) {
    this.setState({ open: false })
    this.props.onChange(option.value)
  }

  render () {
    const {label, value, options, onChange} = this.props;
    const valueLabel = _.get(_.find(options, {value}), "label")

    const visibleOptions = [
      {value: undefined, label: "None"}
    ].concat(options)

    return (
      <div className="form-select">
        <div className="filter filter-select" onClick={() => this.setState({open: true})}>
          <div className="filter-label">{label}</div>
          <div className="filter-content">{valueLabel}</div>
          <div className="filter-icon"><i className="icon ion-ios-arrow-right"/></div>
        </div>

        <Modal open={this.state.open} title={label}>
          {visibleOptions.map((option, index) => (
            <div key={index} onClick={() => this.onSelectOption(option)} className="form-select-option">
              <div className="form-select-label">{option.label}</div>
              <div className="form-select-icon">
                { option.value === value && <i className="icon ion-ios-checkmark-empty"/> }
              </div>
            </div>
          ))}
        </Modal>

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