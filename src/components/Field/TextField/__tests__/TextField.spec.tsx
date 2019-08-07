import React from 'react';
import { TextFieldProps, TextField } from '../TextField';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('TextField component', () => {
  const props: (touched?: boolean, error?: boolean) => TextFieldProps = (touched, error) => {
    const name = 'blblbl';
    return {
      errors: { [name]: touched && error ? 'err' : '' },
      name: name,
      touched: { [name]: touched },
      values: {},
      handleBlur: jest.fn(),
      handleChange: jest.fn(),
    };
  };

  it('should render itself and children', () => {
    const wrapper = shallow(<TextField {...props()} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render text field with no error', () => {
    const wrapperTF = shallow(<TextField {...props(true, false)} />);
    const wrapperFT = shallow(<TextField {...props(false, true)} />);
    expect(toJson(wrapperTF)).toMatchSnapshot();
    expect(toJson(wrapperFT)).toMatchSnapshot();
  });

  it('should render text field with error', () => {
    const wrapper = shallow(<TextField {...props(true, true)} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should trigger handleBlur', () => {
    const fieldProps = props();
    const wrapper = shallow(<TextField {...fieldProps} />);
    wrapper.simulate('blur');
    expect(fieldProps.handleBlur).toHaveBeenCalled();
  });

  it('should trigger handleChange', () => {
    const fieldProps = props();
    const wrapper = shallow(<TextField {...fieldProps} />);
    wrapper.simulate('change');
    expect(fieldProps.handleChange).toHaveBeenCalled();
  });
});
