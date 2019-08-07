import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Alert from '..';
import { AlertProps } from '../Alert';

describe('Alert component', () => {
  const child = <i>blblbl</i>;

  let wrapper: ReturnType<typeof mount>;
  const mountComp = (variant: AlertProps['variant'] = 'danger') => {
    return mount(<Alert variant={variant}>{child}</Alert>);
  };

  afterEach(() => {
    wrapper.unmount();
  });

  test.each`
    variant
    ${'danger'}
  `('variant: [$variant]', (variant) => {
    wrapper = mountComp(variant);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render its children', () => {
    wrapper = mountComp();
    expect(wrapper.find(child)).toBeDefined();
  });
});
