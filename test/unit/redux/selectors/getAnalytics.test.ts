import { getAnalytics } from '../../../../src/redux/selectors';

describe('getAnalytics selector', () => {
  let state: any;

  const subject = () => getAnalytics(state);

  beforeEach(() => {
    state = { analytics: { app: 'prop' } };
  });

  it('returns analytics', () => {
    expect(subject().app).toEqual('prop');
  });
});
