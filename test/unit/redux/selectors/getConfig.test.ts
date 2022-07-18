import { getConfig } from '../../../../src/redux/selectors';

describe('getConfig selector', () => {
  let state: any;

  const subject = () => getConfig(state);

  beforeEach(() => {
    state = {
      req: {
        apiVersion: 'param'
      }
    };
  });

  it('returns config', () => {
    expect(subject().apiVersion).toEqual('param');
  });
});
