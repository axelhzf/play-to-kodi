import * as React from 'react';
import * as ReactDom from 'react-dom';
import applyGlobalStyles from './styles/global';
import { Provider } from 'react-redux';
import store from './state/store';
import routes from './routes/routes';
import { Router, browserHistory } from 'react-router';
import { GatewayProvider } from 'react-gateway';

applyGlobalStyles();

const root = (
  <Provider store={store}>
    <GatewayProvider>
      <Router history={browserHistory} routes={routes} />
    </GatewayProvider>
  </Provider>
);

ReactDom.render(root, document.getElementById('root'))
