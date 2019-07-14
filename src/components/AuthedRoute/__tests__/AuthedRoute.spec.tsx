import React from 'react';
import AuthedRoute, { AuthedRouteProps, RawAuthedRoute } from '..';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Route, Router, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { initialAppState } from '../../../services/common/app.state';

describe('AuthedRoute component', () => {
    const routeProps: AuthedRouteProps = {
        path: 'blblbl',
        component: RawAuthedRoute,
        logged: true
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
                    <AuthedRoute {...routeProps}></AuthedRoute>
                </Router>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render the component given in props when user is logged', () => {
        routeProps.logged = true;
        const wrapper = routerWrapper(routeProps);
        expect(wrapper.find(Route).props().render()).toEqual(<routeProps.component />);
    });

    it('should redirect when user is not logged', () => {
        routeProps.logged = false;
        const wrapper = routerWrapper(routeProps);
        expect(wrapper.find(Route).props().render({location: ''})).toEqual(<Redirect to={expect.anything()} />);
    });
});
