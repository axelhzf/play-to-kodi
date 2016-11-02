import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

import App from './containers/App'
import ShowsScreen from './containers/ShowsScreen'
import ShowScreen from './containers/ShowScreen'
import MoviesScreen from './containers/MoviesScreen'
import MovieScreen from './containers/MovieScreen'

const root = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to='/shows'/>

      <Route path='/shows' component={ShowsScreen}/>
      <Route path='/shows/:id' component={ShowScreen}/>

      <Route path='/movies' component={MoviesScreen}/>
      <Route path='/movies/:id' component={MovieScreen}/>

    </Route>
  </Router>
)

ReactDom.render(root, document.getElementById('root'))
