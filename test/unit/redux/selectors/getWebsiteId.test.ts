import { getWebsiteId } from '../../../../src/redux/selectors';

describe('getWebsiteId selector', () => {
  let state: any;

  const subject = () => getWebsiteId(state);

  beforeEach(() => {
    state = {
      websiteId: 'websiteId'
    };
  });

  it('returns website id', () => {
    expect(subject()).toEqual('websiteId');
  });
});
