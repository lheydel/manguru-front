import React from 'react';
import { shallow, mount } from 'enzyme';
import { RawLoginContent, LoginContent } from '../LoginContent';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { initialAppState } from '../../../../services/common/app.states';
import { initialUserState } from '../../../../services/user/reducers/user.states';

describe('LoginContent component', () => {

  it('should render itself without alert', () => {
    const wrapper = shallow(<RawLoginContent loginErr={undefined} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render itself with alert', () => {
    const wrapper = shallow(<RawLoginContent loginErr={'error'} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render itself and children', () => {
    const wrapper = mount(
      <Provider
        store={createMockStore()({
          ...initialAppState,
          user: {
            ...initialUserState,
            login: {
              error: 'blblbl',
            }
          }
        })}
      >
        <LoginContent />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
