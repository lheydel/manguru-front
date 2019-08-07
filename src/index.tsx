import { createMuiTheme } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './components/Root';
import './index.css';
import { initialAppState } from './services/common/app.states';
import storeConfig from './store';
import manguruTheme from './theme';

const history = createBrowserHistory();
const store = storeConfig.configureStore(history, initialAppState);
const theme = createMuiTheme(manguruTheme);

ReactDOM.render(<Root store={store} history={history} theme={theme} />, document.getElementById('root'));
