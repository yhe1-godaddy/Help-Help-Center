import { getCurrentWebsite } from '../../../../src/redux/selectors';
import { websiteFactory } from '../../../fixtures';
import { Website } from '../../../../src/types';
import { buildEntityState } from '../../../test-utils/buildEntityState';

describe('getCurrentWebsite selector', () => {
  let state: any;
  let website: Website;

  beforeEach(() => {
    website = websiteFactory.build();
    state = {
      websiteId: website.id,
      website: {
        ...buildEntityState(website)
      }
    };
  });

  it('returns website', () => {
    const currentWebsite = getCurrentWebsite(state);

    expect(currentWebsite).not.toBeNull();
    expect(currentWebsite?.id).toEqual(state.website.ids[0]);
  });
});
