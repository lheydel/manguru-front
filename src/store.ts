import { createStore, applyMiddleware, Store, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { History } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { fork, all } from 'redux-saga/effects';
import userSaga from './services/user/saga/user.saga';
import { BaseSaga } from './services/common/base.saga';
import userReducer from './services/user/reducers/user.reducers';

class StoreConfig {

    /**
     * Declare here all the synchroneous reducers
     */
    private reducers: any = {
        router: null, // setup in this.configureStore
        user: userReducer
    };

    /**
     * Declare here all the redux-saga triggers calling the asyn reducers
     */
    private sagaTriggers: BaseSaga[] = [
        userSaga
    ];

    /**
     * Manage all sunchroneous reducers
     */
    private _rootReducers() {
        return combineReducers(this.reducers);
    }

    /**
     * Manage all saga reducers
     */
    private * _rootSaga(sagaTriggers: BaseSaga[]) {
        const reducers = sagaTriggers.map(r => fork([r, r.makeSaga]));
        yield all(reducers);
    }

    public configureStore(history: History, initialState: any): Store<any> {

        // define router history
        this.reducers.router = connectRouter(history);

        // define middlewares
        const sagaMiddleware = createSagaMiddleware();
        const routeMiddleware = routerMiddleware(history);
        const loggerMiddleware = createLogger();

        // create redux store
        const store = createStore(
            this._rootReducers(),
            initialState,
            applyMiddleware(
                routeMiddleware,
                sagaMiddleware,
                loggerMiddleware // must be the last one
            )
        );

        // start saga middleware with the saga reducers
        sagaMiddleware.run(this._rootSaga, this.sagaTriggers);
        return store;
    }
}

const storeConfig = new StoreConfig();
export default storeConfig;
