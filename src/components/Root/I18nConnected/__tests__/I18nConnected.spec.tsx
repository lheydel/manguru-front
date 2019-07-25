import React from 'react';
import { Provider } from 'react-redux';
import I18nConnected, { RawI18nConnected } from '..';
import { shallow, mount } from 'enzyme';
import createMockStore from 'redux-mock-store';
import { initialAppState } from '../../../../services/common/app.state';
import toJson from 'enzyme-to-json';
import { I18nProvider } from '@lingui/react';
import { Language } from '../../../../utils/properties';

describe('I18nConnected component', () => {
    const child = <button />;

    it('should render itself and children when connected', () => {
        const wrapper = shallow(
            <Provider store={createMockStore()(initialAppState)}>
                <I18nConnected>{child}</I18nConnected>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should use default language', () => {
        const wrapper = mount(
            <Provider store={createMockStore()(initialAppState)}>
                <I18nConnected>{child}</I18nConnected>
            </Provider>
        );
        expect(wrapper.find(I18nProvider).props().language).toBe(initialAppState.i18n.language);
    });
});
