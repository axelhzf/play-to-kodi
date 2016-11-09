import React from 'react'
import api from '../lib/api'
import _ from 'lodash'
import Link from '../components/Link'
import moment from 'moment'
import Modal from '../components/Modal'

export default class ShowScreen extends React.Component {

  state = {
    seasonsModalVisible: false
  }

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
        </div>

      </div >
    )

  }

  renderHeader () {
    const { show } = this.state
    return (
      <div className="show-header">

        <div className="show-poster">
          <img src={show.images.fanart}/>
        </div>

        <div className="show-info">
          <div className="show-title">{show.title}</div>
          <div className="show-subtitle">
            {show.year} {show.rating.percentage}/100 {show.network} {show.status} {show.runtime}min
          </div>
          <div className="show-synopsis">{show.synopsis}</div>
        </div>

      </div>
    )
  }

  showSeasonsModal = () => {
    this.setState({ seasonsModalVisible: true })
  }

  hideSeasonsModal = () => {
    this.setState({ seasonsModalVisible: false })
  }

  renderSeasons () {
    const { show, seasonsModalVisible } = this.state
    const seasonId = this.getIntParameter("seasonId")

    const seasonsIds = _.chain(show.episodes)
      .map("season")
      .uniq()
      .orderBy()
      .value()

    return (
      <div>
        <div className="show-seasons-action">
          <button onClick={this.showSeasonsModal}>Season {seasonId} ⌄</button>
        </div>

        <Modal title="Seasons" open={seasonsModalVisible}>
          <ul className="link-list show-seasons">
            {seasonsIds.map(seasonId => (
              <li key={seasonId}>
                <Link className="show-season" to={`/shows/${show.imdb_id}/seasons/${seasonId}`}
                      onClick={this.hideSeasonsModal}>
                  Season {seasonId}
                </Link>
              </li>
            ))}
          </ul>
        </Modal>

      </div>
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
        {episodes.map(episode => {
          const first_aired = moment.unix(episode.first_aired).format("LL")
          return (
            <li key={episode.tvdb_id} className="show-episode" onClick={() => this.playEpisode(episode)}>
              <div className="content">
                <div><strong>{this.getEpisodeId(episode)} - {episode.title}</strong></div>
                <div>First Aired: {first_aired}</div>
              </div>
              <div className="right-icon">
                <i className="icon ion-ios-play"/>
              </div>
            </li>
          )
        })}
      </ul>
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

  async playEpisode (episode) {
    try {
      const torrent = episode.torrents[ "1080p" ] || episode.torrents[ "720p" ] || episode.torrents[ "480p" ];
      const magnet = torrent.url;
      await api.playMagnet(magnet);
    } catch (e) {
      console.error(e);
    }
  }

}