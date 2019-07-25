import { mount, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Redirect } from 'react-router';
import { Store } from 'redux';
import createMockStore from 'redux-mock-store';
import AuthRoute, { RawAuthRouteProps, RawAuthRoute } from '..';
import { ApplicationState, initialAppState } from '../../../services/common/app.state';
import { RouteFront } from '../../../utils/properties';
import toJson from 'enzyme-to-json';

describe('AuthedRoute component', () => {
    const shallowWrapper = (props: RawAuthRouteProps, logged: boolean) => {
        return shallow(
            <RawAuthRoute {...props} logged={logged}></RawAuthRoute>
        );
    };

    const routeProps: (shouldBe: boolean) => RawAuthRouteProps = (shouldBe) => ({
        component: () => <button />,
        shouldBe: shouldBe,
    });

    it('should render its children when user [is] and [should be] logged', () => {
        const props = routeProps(true);
        const wrapper = shallowWrapper(props, true);

        expect(wrapper.find(Route).props().render()).toEqual(<props.component />);
    });

    it('should redirect to [Home] when user [is] and [should not] be logged', () => {
        const props = routeProps(false);
        const wrapper = shallowWrapper(props, true);

        expect(wrapper.find(Route).props().render({location: ''})).toMatchObject(<Redirect to={{ pathname: RouteFront.HOME}} />);
    });

    it('should redirect to [Login] when user [is not] and [should be] logged', () => {
        const props = routeProps(true);
        const wrapper = shallowWrapper(props, false);

        expect(wrapper.find(Route).props().render({location: ''})).toMatchObject(<Redirect to={{ pathname: RouteFront.LOGIN}} />);
    });

    it('should render its children when user [is not] and [should not] be logged', () => {
        const props = routeProps(false);
        const wrapper = shallowWrapper(props, false);

        expect(wrapper.find(Route).props().render()).toEqual(<props.component />);
    });
});
