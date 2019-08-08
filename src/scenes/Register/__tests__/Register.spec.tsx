import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Register from '..';

describe('Register component', () => {

  it('should render itself', () => {
    const wrapper = shallow(<Register />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
