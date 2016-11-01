import React from 'react'
import api from '../lib/api'
import _ from 'lodash'

export default class ShowScreen extends React.Component {

  state = {}

  componentDidMount () {
    this.fetchShow()
  }

  async fetchShow () {
    const { params } = this.props
    const show = await api.showDetails(params.id)
    debugger

    const sortedEpisodes = _.sortBy(show.episodes, [ "season", "episode" ]);
    this.setState({ show })
  }

  render () {

    const { show } = this.state

    if (!show) {
      return (<div>Loading</div>)
    }

    const episodes = _.sortBy(show.episodes, [ "season", "episode" ])

    return (
      <div>
        <div>{show.title}</div>

        {episodes.map(episode => (
          <div key={episode.tvdb_id}>
            <div>{this.getEpisodeId(episode)} - {episode.title}</div>
            <div>{episode.overview}</div>
          </div>
        ))}

      </div >
    )

  }

  getEpisodeId(episode) {
    return `S${_.padStart(episode.season.toString(), 2, "0")}E${_.padStart(episode.episode.toString(), 2, "0")}`;
  }

}