import React from 'react'
import api from '../lib/api'
import _ from 'lodash'
import Link from '../components/Link'
import moment from 'moment'

export default class ShowScreen extends React.Component {

  state = {}

  componentDidMount () {
    this.fetchShow()
  }

  async fetchShow () {
    const { params } = this.props
    const show = await api.showDetails(params.showId)
    this.setState({ show })
  }

  render () {
    const { show } = this.state
    if (!show) return this.renderLoading()

    return (
      <div className="show">
        {this.renderHeader()}

        <div className="show-content">
          {this.renderSeasons()}
          {this.renderActiveSeasonEpisodes()}
          {this.renderActiveEpisode()}
        </div>

      </div >
    )

  }

  renderHeader () {
    const { show } = this.state
    return (
      <div className="show-header">

        <div className="show-poster">
          <img src={show.images.poster}/>
        </div>

        <div className="show-info">
          <div className="show-title">{show.title}</div>
          <div className="show-subtitle">Year:{show.year}
            Rating: {show.rating.percentage}/100 {show.network} {show.status} {show.runtime}min
          </div>
          <div className="show-synopsis">{show.synopsis}</div>
        </div>

      </div>
    )
  }

  renderSeasons () {
    const { show } = this.state

    const seasonsIds = _.chain(show.episodes)
      .map("season")
      .uniq()
      .orderBy()
      .value()

    return (
      <ul className="link-list show-seasons">
        {seasonsIds.map(seasonId => (
          <li key={seasonId}>
            <Link className="show-season" to={`/shows/${show.imdb_id}/seasons/${seasonId}`}>
              Season {seasonId}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderActiveSeasonEpisodes () {
    const { show } = this.state
    const seasonId = this.getIntParameter("seasonId")

    if (!seasonId) return null;

    const episodes = _.chain(show.episodes)
      .filter({ season: seasonId })
      .sortBy("episode")
      .value()

    return (
      <ul className="link-list show-episodes">
        {episodes.map(episode => (
          <li key={episode.tvdb_id} className="show-episodes-item">
            <Link to={`/shows/${show.imdb_id}/seasons/${seasonId}/episodes/${episode.episode}`}>
              {this.getEpisodeId(episode)} - {episode.title}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderActiveEpisode () {
    const { show } = this.state
    const seasonId = this.getIntParameter("seasonId")
    const episodeId = this.getIntParameter("episodeId")

    const episode = _.find(show.episodes, { season: seasonId, episode: episodeId })

    if (!episode) return null;

    const first_aired = moment.unix(episode.first_aired).format("LL")

    console.log(episode)

    return (
      <div className="show-episode">
        <h2>{episode.title}</h2>
        <p>Season {episode.season}, Episode {episode.episode}</p>
        <p>Aired Date: {first_aired}</p>
        <p>{episode.overview}</p>
        <p>
          <button onClick={() => this.playEpisode(episode)}>Play now</button>
        </p>
      </div>
    )
  }

  getIntParameter (parameterName) {
    const { params } = this.props;
    if (_.has(params, parameterName)) return parseInt(params[ parameterName ])
  }

  renderLoading () {
    return (<div>Loading</div>)
  }

  getEpisodeId (episode) {
    return `S${_.padStart(episode.season.toString(), 2, "0")}E${_.padStart(episode.episode.toString(), 2, "0")}`;
  }

  async playEpisode(episode) {
    try {
      const torrent = episode.torrents["1080p"] || episode.torrents["720p"] || episode.torrents["480p"];
      const magnet = torrent.url;
      await api.playMagnet(magnet);
    } catch (e) {
      console.error(e);
    }
  }

}