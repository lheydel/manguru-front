import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Root } from './components/Root';
import storeConfig from './store';
import { createBrowserHistory } from 'history';
import { initialAppState } from './services/common/app.state';

const history = createBrowserHistory();
const store = storeConfig.configureStore(history, initialAppState);

ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'));
