import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Routes } from '../../routes';

interface RootProps {
  store: Store;
  history: History;
}

export const Root: React.FC<RootProps> = ({store, history}: RootProps) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);
