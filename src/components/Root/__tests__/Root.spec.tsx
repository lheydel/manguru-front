import React from 'react';
import { RootProps, Root } from '../Root';
import { shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import toJson from 'enzyme-to-json';
import createMockStore from 'redux-mock-store';

const mockStore = createMockStore();

describe('Root component', () => {
    const props: RootProps = {
        store: mockStore(),
        history: createBrowserHistory()
    };

    it('should renders itself and children', () => {
        const wrapper = shallow(<Root {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
