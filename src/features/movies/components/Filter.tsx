import * as React from 'react';
import styled from 'styled-components';
import {Input, Dropdown} from 'react-toolbox';
import * as R from 'ramda';
import * as _ from 'lodash';

interface FilterProps {
  query: MoviesQuery,
  onQueryChange: (filter: MoviesQuery) => void,
}

export default class Filter extends React.Component<FilterProps, null> {

  componentWillMount() {
    this.setState({ keywords : this.props.query.keywords });
  }

  componentWillReceiveProps(nextProps: FilterProps) {
    if (nextProps.query.keywords !== this.props.query.keywords) {
      this.setState({ keywords : nextProps.query.keywords });
    }
  }

  handleInputChange = (value) => {
    this.setState({ keywords : value });
    this.debouncedUpdateFilter({ keywords: value });
  };

  updateFilter = (updatedFilterPart) => {
    this.props.onQueryChange(R.merge(this.props.query, updatedFilterPart));
  };

  debouncedUpdateFilter = _.debounce(this.updateFilter, 300);

  render() {
    return (
      <Container>
        <HeaderInput type='text' placeholder='Search' value={this.state.keywords} onChange={this.handleInputChange} icon="search"/>
        <Dropdown
          source={SORT_OPTIONS}
          onChange={sort => this.updateFilter({ sort })}
          value={this.props.query.sort}
          label="Sort"
        />
        <Dropdown
          source={GENRE_OPTIONS}
          onChange={genre => this.updateFilter({ genre })}
          value={this.props.query.genre}
          label="Genre"
        />
        <Dropdown
          source={ORDER_OPTIONS}
          onChange={order => this.updateFilter({ order })}
          value={this.props.query.order}
          label="Order"
        />
      </Container>
    )
  }

}

const Container = styled.div`
  display: flex;
`;

const HeaderInput = styled(Input)`
  margin-bottom: 10px;
  flex: 1;
  margin-right: 7px;
`;


const SORT_OPTIONS = [
  { value: 'trending', label: 'Trending' },
  { value: 'rating', label: 'Rating' },
  { value: 'updated', label: 'Updated' },
  { value: 'year', label: 'Year' },
  { value: 'name', label: 'Name' }
];

const ORDER_OPTIONS = [
  { value: -1, label: "Desc" },
  { value: 1, label: "Asc" },
];

const GENRE_OPTIONS = [
  { value: null, label: 'All'},
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
