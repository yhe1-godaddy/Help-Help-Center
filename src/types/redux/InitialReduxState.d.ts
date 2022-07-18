import { EntityState } from '@reduxjs/toolkit';
import { analyticsEvents } from '../../../config/analytics.events';

export interface InitialReduxState extends EntityState {
  appConfig: {
    featureFlags: {};
  };
  req: {
    rootDomain: string;
    localApi;
    gemDomain: string;
    locale: string;
  };
  analytics: AnalyticsConfig;
  websiteId: string;
  route: {
    name: string;
    params: Record<string, string>;
    query: Record<string, string>;
  };
}

export interface AnalyticsConfig {
  app: stirng;
  shopperId: stirng;
  traffic2: {
    // Optional root eid that will be prefixed to all events
    rootEid: string;
    // Optional default event type (used when none is specified in either eventmap or as part of the track() method)
    defaultEventType: 'click' | string;
  };
  mixpanel: {
    token: string;
    rerouteToken: string;
    identifier: string; // gets set to websiteId later
    config: {
      // eslint-disable-next-line camelcase
      disable_persistence: boolean;
      // eslint-disable-next-line camelcase
      cross_subdomain_cookie: boolean;
      autotrack: boolean;
    };
    superProperties: Record<string, unknown>;
    [key: string]: unknown;
  };
  eventMap: typeof analyticsEvents;
  initWithPageview: boolean;
  debug: boolean;
  logTraffic2EventsToMixpanel: boolean;
}
