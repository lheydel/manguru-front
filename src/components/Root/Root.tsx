import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Routes } from '../../routes';
import { cookies } from '../../utils/common';
import { I18nConnected } from './I18nConnected';
import JwtAuthenticator from './JwtAuthenticator';
import { ThemeProvider } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export interface RootProps {
  store: Store;
  history: History;
  theme: Theme;
}

export const Root: React.FC<RootProps> = ({ store, history, theme }: RootProps) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <CookiesProvider cookies={cookies}>
        <ThemeProvider theme={theme}>
          <I18nConnected>
            <JwtAuthenticator>
              <Routes />
            </JwtAuthenticator>
          </I18nConnected>
        </ThemeProvider>
      </CookiesProvider>
    </ConnectedRouter>
  </Provider>
);
