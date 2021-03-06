import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import Alert from '../../../../components/Alert';
import { initialAppState } from '../../../../services/common/app.states';
import { initialUserState } from '../../../../services/user/reducers/user.states';
import { LoginContent, RawLoginContent } from '../LoginContent';

describe('LoginContent component', () => {

  it('should render itself without alert', () => {
    const wrapper = shallow(<RawLoginContent loginErr={undefined} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render itself with alert', () => {
    const wrapper = shallow(<RawLoginContent loginErr={'error'} />);
    expect(wrapper.find(Alert).props()).toBeDefined();
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
