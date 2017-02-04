import * as React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from '../containers/App';
import ShowsScreen from '../containers/ShowsScreen';
import ShowScreen from '../containers/ShowScreen';
import Movies from '../features/movies/containers/Movies';
import MovieScreen from '../containers/MovieScreen';

const routes = (
  <Route path='/' component={App}>
    <IndexRedirect to='/shows'/>

    <Route path='/shows' component={ShowsScreen}/>

    {/* todo nested routes */}
    <Route path='/shows/:showId' component={ShowScreen}/>
    <Route path='/shows/:showId/seasons/:seasonId' component={ShowScreen}/>
    <Route path='/shows/:showId/seasons/:seasonId/episodes/:episodeId' component={ShowScreen}/>

    <Route path='/movies' component={Movies}/>
    <Route path='/movies/:id' component={MovieScreen}/>
  </Route>
)

export default routes;
