import React from 'react'
import ReactDom from 'react-dom'
import ShowsScreen from './containers/ShowsScreen'
import ShowScreen from './containers/ShowScreen'
import {Router, Route, browserHistory} from 'react-router'

class App extends React.Component {

  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/'>
          <Route path='/shows' component={ShowsScreen}/>
          <Route path='/shows/:id' component={ShowScreen}/>
        </Route>
      </Router>
    )
  }
}


ReactDom.render(<App/>, document.getElementById('root'))
