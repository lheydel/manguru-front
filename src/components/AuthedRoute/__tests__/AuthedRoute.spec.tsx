import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Cookies, CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { Redirect, Route, Router } from 'react-router';
import { Store } from 'redux';
import createMockStore from 'redux-mock-store';
import AuthRoute, { AuthedRouteProps, RawAuthedRoute } from '..';
import { User } from '../../../models/user.model';
import { ApplicationState, initialAppState } from '../../../services/common/app.state';
import userActionners from '../../../services/user/actions/user.actionners';
import { initialUserLoginState } from '../../../services/user/reducers/user.states';
import userService from '../../../services/user/service/user.service';
import { Cookie } from '../../../utils/properties';

describe('AuthedRoute component', () => {
    const routeProps: AuthedRouteProps = {
        path: 'blblbl',
        component: RawAuthedRoute,
        cookies: new Cookies(),
        loginJwt: jest.fn(),
        loginState: initialUserLoginState,
    };

    const connectedWrapper = (props: AuthedRouteProps, store: Store) => {
        return mount(
            <Provider store={store}>
                <CookiesProvider cookies={props.cookies}>
                    <Router history={createBrowserHistory()}>
                        <AuthRoute {...props}></AuthRoute>
                    </Router>
                </CookiesProvider>
            </Provider>
        );
    };

    it('should render itself and children', () => {
        const wrapper = shallow(<RawAuthedRoute {...routeProps}></RawAuthedRoute>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render itself and children when connected', () => {
        expect(toJson(connectedWrapper(routeProps, createMockStore()(initialAppState)))).toMatchSnapshot();
    });

    it('should render the component given in props when user is logged', () => {
        const state: ApplicationState = {
            ...initialAppState,
            user: {
                login: {
                    logged: true,
                    loading: false,
                }
            }
        };
        const wrapper = connectedWrapper(routeProps, createMockStore()(state));
        expect(wrapper.find(Route).props().render()).toEqual(<routeProps.component />);
    });

    it('should redirect when user is and can not logged', () => {
        const state: ApplicationState = {
            ...initialAppState,
            user: {
                login: {
                    logged: false,
                    loading: false,
                    error: 'err',
                }
            }
        };
        const wrapper = connectedWrapper(routeProps, createMockStore()(state));
        expect(wrapper.find(Route).props().render({location: ''})).toEqual(<Redirect to={expect.anything()} />);
    });

    it('should authenticate the user when is not logged and jwt cookie is set', () => {
        const state: ApplicationState = {
            ...initialAppState,
            user: {
                login: {
                    logged: false,
                    loading: false,
                }
            }
        };
        const props: AuthedRouteProps = { ...routeProps, cookies: new Cookies() };
        props.cookies.set(Cookie.AUTH, 'token');

        const store = createMockStore()(state);
        store.dispatch = jest.fn();

        connectedWrapper(props, store);
        expect(store.dispatch).toBeCalledWith(userActionners.loginJwtRequest());
    });
});
