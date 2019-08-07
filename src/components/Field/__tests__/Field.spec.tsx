import { mount } from 'enzyme';
import { Formik } from 'formik';
import React from 'react';
import Field from '..';
import Checkbox from '../Checkbox';
import TextField from '../TextField';

describe('Field component', () => {
  let wrapper: ReturnType<typeof mount>;

  const mountWrapper = (type: string) => {
    return mount(
      <Formik
        initialValues={{}}
        onSubmit={jest.fn()}
        render={(formikProps) => (
          <Field fieldType={type as any} name={'field'} formikProps={formikProps} />
        )}
      />
    );
  };

  afterEach(() => {
    wrapper.unmount();
  });

  test.each`
    fieldType     | Component
    ${'text'}     | ${TextField}
    ${'checkbox'} | ${Checkbox}
  `('[$fieldType] should render $Component.class', ({ fieldType, Component }) => {
    wrapper = mountWrapper(fieldType);
    expect(wrapper.containsMatchingElement(<Component />)).toBe(true);
  });

  it('should render null if fieldType is wrong', () => {
    wrapper = mountWrapper('blblbl');
    expect(wrapper.find(Field).isEmptyRender()).toBe(true);
  });
});
