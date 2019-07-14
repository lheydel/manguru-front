import React from 'react';
import { AppProps, RawApp } from './App';
import { initialUserLoginState } from '../../services/user/reducers/user.states';
import { shallow } from 'enzyme';

let props: AppProps;

beforeEach(() => {
  props = {
    login: jest.fn(),
    loginState: initialUserLoginState,
    changeLanguage: jest.fn()
  };
});

it('renders without crashing', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  // ReactDOM.unmountComponentAtNode(div);
  shallow(<RawApp {...props} />);
});
