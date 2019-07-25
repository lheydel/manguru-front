import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Cookies, CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createMockStore from 'redux-mock-store';
import JwtAuthenticator from '..';
import { ApplicationState, initialAppState } from '../../../../services/common/app.state';
import { Cookie } from '../../../../utils/properties';
import { RawJwtAuthenticator } from '../JwtAuthenticator';

describe('JwtAuthenticator component', () => {
    let wrapper: ReturnType<typeof connectedWrapper>;

    const authState: (logged: boolean, loading: boolean, error?: string) => ApplicationState = (logged, loading, error) => ({
        ...initialAppState,
        user: {
            login: {
                logged: logged,
                loading: loading,
                error: error,
            }
        }
    });

    const connectedWrapper = (store: Store, cookies: Cookies) => {
        return mount(
            <Provider store={store}>
                <CookiesProvider cookies={cookies}>
                    <JwtAuthenticator>
                        <button />
                    </JwtAuthenticator>
                </CookiesProvider>
            </Provider>
        );
    };

    const doTest = (store: Store, cookies: Cookies, callLogin: boolean) => {
        wrapper = connectedWrapper(store, cookies);
        expect(store.dispatch).toHaveBeenCalledTimes(callLogin ? 1 : 0);
        expect(toJson(wrapper.find(RawJwtAuthenticator).render())).toMatchSnapshot();
    };

    afterEach(() => {
        wrapper.unmount();
    });

    test('user logged --> render children', () => {
        // setup store
        const store = createMockStore()(authState(true, false));
        store.dispatch = jest.fn();

        // actual tests
        doTest(store, new Cookies(), false);
    });

    test('user not logged + jwt cookie --> try to authenticate + render null', () => {
        // setup store
        const store = createMockStore()(authState(false, false));
        store.dispatch = jest.fn();

        // setup jwt cookie
        const cookies = new Cookies();
        cookies.set(Cookie.AUTH, 'token');

        // actual tests
        doTest(store, cookies, true);
    });

    test('user not logged + jwt cookie + loading --> render null', () => {
        // setup store
        const store = createMockStore()(authState(false, true));
        store.dispatch = jest.fn();

        // setup jwt cookie
        const cookies = new Cookies();
        cookies.set(Cookie.AUTH, 'token');

        // actual tests
        doTest(store, cookies, false);
    });

    test('user not logged + auth failed --> render children', () => {
        // setup store
        const store = createMockStore()(authState(false, false, 'err'));
        store.dispatch = jest.fn();

        // setup jwt cookie
        const cookies = new Cookies();
        cookies.set(Cookie.AUTH, 'token');

        // actual tests
        doTest(store, cookies, false);
    });

    test('user not logged + no jwt cookie --> render children', () => {
        // setup store
        const store = createMockStore()(authState(false, false));
        store.dispatch = jest.fn();

        // actual tests
        doTest(store, new Cookies(), false);
    });

});
