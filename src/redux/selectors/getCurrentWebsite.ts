import type { RootState, Website } from '../../types';

export const getCurrentWebsite = ({ website, websiteId }: RootState): Website | undefined => {
  return website.entities[websiteId];
};
