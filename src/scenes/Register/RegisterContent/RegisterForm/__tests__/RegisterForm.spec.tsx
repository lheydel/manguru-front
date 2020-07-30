import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Formik } from 'formik';
import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import RegisterForm, { RawRegisterForm } from '..';

describe('RegisterForm component', () => {
  let wrapper: ReturnType<typeof mount>;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render itself and the form', () => {
    wrapper = mount(<RawRegisterForm register={jest.fn()} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render itself and the form with redux', () => {
    wrapper = mount(
      <Provider store={createMockStore()()}>
        <RegisterForm />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it.skip('should dispatch a register request on submit', async () => {
    // mount component
    const registerMock = jest.fn();
    wrapper = mount(<RawRegisterForm register={registerMock} />);

    // add values that pass yup validation
    const newValues = { email: 'aaa@aaa.com', username: 'aaaaaa', password: 'blblbl', passwordConfirm: 'blblbl'};
    wrapper.find(Formik).instance().setState({ values: newValues });

    // simulate submit and wait for async tasks to finish
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    await new Promise(resolve => setImmediate(resolve));

    // check that register request has been dispatched with the righ values
    expect(registerMock).toHaveBeenCalledWith(newValues.email, newValues.username, newValues.password);
  });

  it('should not dispatch a register request on submit if wrong values', async () => {
    // mount component
    const registerMock = jest.fn();
    wrapper = mount(<RawRegisterForm register={registerMock} />);

    // simulate submit and wait for async tasks to finish
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    await new Promise(resolve => setImmediate(resolve));

    // check that register request has not been dispatched
    expect(registerMock).not.toHaveBeenCalled();
  });
});
