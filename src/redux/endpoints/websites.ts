import { makeWebsiteUrl } from '../../utils/makeWebsiteUrl';
import type { ApiRequestDescription } from '../../types';

export const fetchWebsites: ApiRequestDescription = {
  url: makeWebsiteUrl('/v2/websites', 'websites.api')
};

export const fetchWebsite: ApiRequestDescription = {
  url: makeWebsiteUrl('/v2/websites/:websiteId?full=true', 'websites.api')
};
