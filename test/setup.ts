import { configure as enzymeConfigure } from 'enzyme';
import { configure } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import './test-utils/mockCreatePortal';
import './test-utils/mockUseDispatch';
import './test-utils/mockUseRouter';
import './test-utils/mockUseAnalyticsTracker';

enzymeConfigure({ adapter: new Adapter() });
configure({
  // eslint-disable-next-line id-length
  computedStyleSupportsPseudoElements: false
});

const _error = console.error;
global.beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = function (errormessage: any, ...others: unknown[]) {
    /*
        if error is a proptype error and includes the following string: `Warning: Failed prop type:`
        suppress the error and don't show it. if it is not a proptype error, we show it
      */
    if (!errormessage.toString().includes('Warning: Failed prop type:')) {
      _error.apply(this, [errormessage, ...others]);
    }
  };
});

global.afterAll(() => {
  console.error = _error;
});

global.afterEach(() => {
  jest.clearAllMocks();
});
