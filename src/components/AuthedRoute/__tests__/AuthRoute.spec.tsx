import { shallow } from 'enzyme';
import React from 'react';
import { Redirect, Route } from 'react-router';
import { RawAuthRoute, RawAuthRouteProps } from '..';
import { RouteFront } from '../../../utils/properties';

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
