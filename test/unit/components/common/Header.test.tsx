import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Header } from '../../../../src/components/common';
import { TestApp } from '../../../test-utils/TestApp';

import { APP_HEADING, APP_SUB_HEADING } from '../../../../locales/en-US.json';

describe('Header', () => {
  const websiteId = 'aaa';
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <TestApp intMessages={{ APP_HEADING, APP_SUB_HEADING }}>
        <Header />
      </TestApp>
    );
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it('component mounts', () => {
    expect(wrapper.length).toEqual(1);
  });
});
