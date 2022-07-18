// https://github.secureserver.net/PC/user-analytics-js
import { analyticsEvents } from './analytics.events';
import AppConfig from '../app.config';

module.exports = function analyticsConfig(config, shopperId) {
  return {
    app: config.appName,
    // Required param (used to filter out internal traffic to mixpanel)
    shopperId,
    // Optional list of known bot shopper IDs (excluded from Mixpanel)
    // excludedShoppers: ['12345', '678910'],
    // Optional param (used to filter out internal traffic to mixpanel)
    // clientIp: 'x.x.x.x',
    // traffic2-specific config; if falsey will disable traffic2 event logging
    traffic2: {
      // Optional root eid that will be prefixed to all events
      rootEid: `pnc.${config.appName}`,
      // Optional default event type (used when none is specified in either eventmap or as part of the track() method)
      defaultEventType: 'click'
    },
    // mixpanel-specific config; if falsey will disable mixpanel event logging
    mixpanel: AppConfig.environments[config.env]?.madMiniId
      ? {
        // Mixpanel token:
        token: AppConfig.environments[config.env].madMiniId,
        rerouteToken: AppConfig.environments.development.madMiniId,
        // Unique identifier for the current user that will track them across apps (e.g. websiteId for GC)
        identifier: '', // gets set to websiteId later
        // Optional mixpanel configuration (see default config section)
        config: {
          disable_persistence: true,
          cross_subdomain_cookie: false,
          autotrack: false
          // track_pageview: false
        },
        // Optional mixpanel super properties that will attach to all events (see mixpanel docs)
        superProperties: {} // gets set later
      }
      : {},
    // See the event mapping section for more details
    eventMap: analyticsEvents,
    // When true, it will explicitly track a "Pageview" event with mixpanel (if enabled) containing basic page data
    initWithPageview: true,
    // Set the following prop to true to enable console.log output for event tracking
    debug: config.env !== 'production',
    // Set the following prop to false to PREVENT events using the traffic2 naming convention from being logged to mixpanel
    logTraffic2EventsToMixpanel: true
    // alwaysEnableUserProfiles: true
  };
};
