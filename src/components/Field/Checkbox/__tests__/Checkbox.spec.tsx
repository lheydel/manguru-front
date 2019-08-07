import React from 'react';
import { CheckboxProps, Checkbox } from '../Checkbox';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Checkbox component', () => {
  const props: CheckboxProps = {
    name: 'blblbl',
    values: {},
    handleChange: jest.fn(),
  };

  it('should render itself and children', () => {
    const wrapper = shallow(<Checkbox {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should trigger handleChange', () => {
    const wrapper = shallow(<Checkbox {...props} />);
    wrapper.simulate('change');
    expect(props.handleChange).toHaveBeenCalled();
  });
});
