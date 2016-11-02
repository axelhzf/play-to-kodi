import React from 'react'
import ReactDom from 'react-dom'
import ShowsScreen from './containers/ShowsScreen'
import MoviesScreen from './containers/MoviesScreen'
import ShowScreen from './containers/ShowScreen'
import App from './containers/App'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

const root = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to='/shows'/>

      <Route path='/shows' component={ShowsScreen}/>
      <Route path='/shows/:id' component={ShowScreen}/>

      <Route path='/movies' component={MoviesScreen}/>

    </Route>
  </Router>
)

ReactDom.render(root, document.getElementById('root'))
