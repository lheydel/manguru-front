import React from 'react';
import Login from '..';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Login component', () => {

  it('should render itself', () => {
    const wrapper = shallow(<Login />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
