import { getConfigApi } from '../../../../src/redux/selectors';

describe('getConfigApi selector', () => {
  let state: any;

  const subject = () => getConfigApi(state);

  beforeEach(() => {
    state = {
      configApi: {
        key: 'param'
      }
    };
  });

  it('returns configApi', () => {
    expect(subject().key).toEqual('param');
  });
});
