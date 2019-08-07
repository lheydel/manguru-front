import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import createMockStore from 'redux-mock-store';
import { Root, RootProps } from '../Root';

const mockStore = createMockStore();

describe('Root component', () => {
    const props: RootProps = {
        store: mockStore(),
        history: createBrowserHistory(),
        theme: createMuiTheme(),
    };

    it('should renders itself and children', () => {
        const wrapper = shallow(<Root {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
