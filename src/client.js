import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import { GatewayProvider } from 'react-gateway'
import App from './containers/App'
import ShowsScreen from './containers/ShowsScreen'
import ShowScreen from './containers/ShowScreen'
import MoviesScreen from './containers/MoviesScreen'
import MovieScreen from './containers/MovieScreen'
import './styles.less'

const root = (
  <GatewayProvider>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRedirect to='/shows'/>

        <Route path='/shows' component={ShowsScreen}/>

        {/* todo nested routes */}
        <Route path='/shows/:showId' component={ShowScreen}/>
        <Route path='/shows/:showId/seasons/:seasonId' component={ShowScreen}/>
        <Route path='/shows/:showId/seasons/:seasonId/episodes/:episodeId' component={ShowScreen}/>

        <Route path='/movies' component={MoviesScreen}/>
        <Route path='/movies/:id' component={MovieScreen}/>

      </Route>
    </Router>
  </GatewayProvider>
)

ReactDom.render(root, document.getElementById('root'))
