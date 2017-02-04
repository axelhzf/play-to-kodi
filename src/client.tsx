import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as global from './styles/global';
import { Provider } from 'react-redux';
import store from './state/store';
import routes from './routes/routes';
import { Router, browserHistory } from 'react-router';

import './styles.less'

const root = (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);

ReactDom.render(root, document.getElementById('root'))
