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

export interface RootProps {
    store: Store;
    history: History;
}

export const Root: React.FC<RootProps> = ({ store, history }: RootProps) => (
    <Provider store={store}>
        <CookiesProvider cookies={cookies}>
            <I18nConnected>
                <ConnectedRouter history={history}>
                    <JwtAuthenticator>
                        <Routes />
                    </JwtAuthenticator>
                </ConnectedRouter>
            </I18nConnected>
        </CookiesProvider>
    </Provider>
);
