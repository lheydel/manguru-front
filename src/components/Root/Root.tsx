import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Routes } from '../../routes';
import { I18nConnected } from './I18nConnected';

export interface RootProps {
  store: Store;
  history: History;
}

export const Root: React.FC<RootProps> = ({store, history}: RootProps) => (
    <Provider store={store}>
      <I18nConnected>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </I18nConnected>
    </Provider>
);
