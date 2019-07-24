import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Cookies } from 'react-cookie';
import { Provider } from 'react-redux';
import { Redirect, Route, Router } from 'react-router';
import createMockStore from 'redux-mock-store';
import AuthRoute, { AuthedRouteProps, RawAuthedRoute } from '..';
import { initialAppState } from '../../../services/common/app.state';
import { initialUserLoginState } from '../../../services/user/reducers/user.states';

describe('AuthedRoute component', () => {
    const routeProps: AuthedRouteProps = {
        path: 'blblbl',
        component: RawAuthedRoute,
        cookies: new Cookies(),
        loginJwt: jest.fn(),
        loginState: initialUserLoginState,
    };

    const routerWrapper = (props: AuthedRouteProps) => {
        return mount(
            <Router history={createBrowserHistory()}>
                <RawAuthedRoute {...props}></RawAuthedRoute>
            </Router>
        );
    };

    it('should render itself and children', () => {
        const wrapper = shallow(<RawAuthedRoute {...routeProps}></RawAuthedRoute>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render itself and children when connected', () => {
        const wrapper = mount(
            <Provider store={createMockStore()(initialAppState)}>
                <Router history={createBrowserHistory()}>
                    <AuthRoute {...routeProps}></AuthRoute>
                </Router>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render the component given in props when user is logged', () => {
        routeProps.loginState = { ...routeProps.loginState, logged: true };
        const wrapper = routerWrapper(routeProps);
        expect(wrapper.find(Route).props().render()).toEqual(<routeProps.component />);
    });

    it('should redirect when user is not logged', () => {
        routeProps.loginState = { ...routeProps.loginState, logged: false };
        const wrapper = routerWrapper(routeProps);
        expect(wrapper.find(Route).props().render({location: ''})).toEqual(<Redirect to={expect.anything()} />);
    });
});
