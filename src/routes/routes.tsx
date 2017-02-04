import * as React from 'react';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';
import App from '../containers/App';
import ShowsScreen from '../containers/ShowsScreen';
import ShowScreen from '../containers/ShowScreen';
import Movies from '../screens/movies/containers/Movies';
import Movie from '../screens/movie/containers/Movie';

const routes = (
  <Route path='/' component={App}>
    <IndexRedirect to='/shows' />

    <Route path='/shows' component={ShowsScreen} />
    <Route path='/shows/:showId' component={ShowScreen} />
    <Route path='/shows/:showId/seasons/:seasonId' component={ShowScreen} />
    <Route path='/shows/:showId/seasons/:seasonId/episodes/:episodeId' component={ShowScreen} />

    <Route path='/movies' component={Movies} />
    <Route path='/movies/:movieId' component={Movie} />
  </Route>
);

export default routes;
