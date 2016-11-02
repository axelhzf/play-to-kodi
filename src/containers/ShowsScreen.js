import React from 'react'
import api from '../lib/api'
import {Link} from 'react-router'
import ShowsGrid from '../components/ShowsGrid'

export default class ShowsScreen extends React.Component {

  state = {

  }

  componentDidMount () {
    this.fetchShows()
  }

  async fetchShows () {
    const shows = await api.shows()
    this.setState({ shows })
  }

  render () {
    const { shows } = this.state
    if (!shows) return <div></div>
    return (<ShowsGrid shows={shows}/>)
  }

}