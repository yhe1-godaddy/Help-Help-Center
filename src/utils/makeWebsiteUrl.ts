import type { RootState } from '../types';

export const makeWebsiteUrl = (path: string, subDomain: string, includeWebsiteId = false) => (
  getState: (() => RootState) | RootState
): string => {
  const {
    req: { rootDomain },
    websiteId
  } = typeof getState === 'function' ? getState() : getState;

  const url = `https://${subDomain}.${rootDomain}${path}`;
  return includeWebsiteId ? `${url}?websiteId=${websiteId}` : url;
};
