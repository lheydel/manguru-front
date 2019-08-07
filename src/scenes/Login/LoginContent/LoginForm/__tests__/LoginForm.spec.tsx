import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Formik } from 'formik';
import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import LoginForm, { RawLoginForm } from '..';

describe('LoginForm component', () => {
  let wrapper: ReturnType<typeof mount>;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render itself and the form', () => {
    wrapper = mount(<RawLoginForm login={jest.fn()} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render itself and the form with redux', () => {
    wrapper = mount(
      <Provider store={createMockStore()()}>
        <LoginForm />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should dispatch a login request on submit', async () => {
    // mount component
    const loginMock = jest.fn();
    wrapper = mount(<RawLoginForm login={loginMock} />);

    // add values that pass yup validation
    const newValues = { email: 'aaa@aaa.com', password: 'blblbl', rememberMe: true };
    wrapper.find(Formik).instance().setState({ values: newValues });

    // simulate submit and wait for async tasks to finish
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    await new Promise(resolve => setImmediate(resolve));

    // check that login request has been dispatched with the righ values
    expect(loginMock).toHaveBeenCalledWith(newValues.email, newValues.password, newValues.rememberMe);
  });

  it('should not dispatch a login request on submit if wrong values', async () => {
    // mount component
    const loginMock = jest.fn();
    wrapper = mount(<RawLoginForm login={loginMock} />);

    // simulate submit and wait for async tasks to finish
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    await new Promise(resolve => setImmediate(resolve));

    // check that login request has not been dispatched
    expect(loginMock).not.toHaveBeenCalled();
  });
});
