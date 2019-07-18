import React from 'react';
import { AppProps, RawApp } from './App';
import { initialUserLoginState } from '../../services/user/reducers/user.states';
import { shallow } from 'enzyme';
import { Cookies } from 'react-cookie';

let props: AppProps;

beforeEach(() => {
  props = {
    changeLanguage: jest.fn(),
    cookies: new Cookies(),
    login: jest.fn(),
    loginJwt: jest.fn(),
    loginState: initialUserLoginState,
  };
});

it('renders without crashing', () => {
  shallow(<RawApp {...props} />);
});
