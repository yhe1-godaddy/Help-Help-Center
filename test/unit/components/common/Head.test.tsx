import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Head } from '../../../../src/components/common';
import { TestApp } from '../../../test-utils/TestApp';

describe('Head', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <TestApp>
        <Head />
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
