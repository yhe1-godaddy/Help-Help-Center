import { makeWebsiteUrl } from '../../../src/utils';

describe('websiteUrl', () => {
  let state: any;

  beforeEach(() => {
    state = {
      req: { rootDomain: 'domain.com' }
    };
  });

  it('create url', () => {
    const newPath = makeWebsiteUrl('/test', 'v1')(() => state);

    expect(newPath).toEqual('https://v1.domain.com/test');
  });
});
