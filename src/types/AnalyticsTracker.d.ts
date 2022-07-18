type EventType = 'click' | 'custom' | string;

type Event = {
  eventName: string;
  eventType: EventType;
  properties: any;
  timestamp: string;
};

type mixpanelConfig = {
  token: string;
  rerouteToken: string;
  identifier: string;
  config?: {
    // eslint-disable-next-line camelcase
    disable_persistence?: boolean;
    // eslint-disable-next-line camelcase
    cross_subdomain_cookie?: boolean;
    autotrack?: boolean;
    // eslint-disable-next-line camelcase
    track_pageview?: boolean;
  };
  superProperties: any;
};

type Traffic2Config =
  | {
  rootEid: string;
  defaultEventType: EventType;
  disabled?: boolean;
}
  | false;

export type AnalyticsTrackerOptions = {
  app: string;
  traffic2?:
    | {
    rootEid: string;
    defaultEventType: EventType;
    disabled?: boolean;
  }
    | false;
  mixpanel?: mixpanelConfig;
  mixpanelSdk?: any;
  initWithPageview?: boolean;
  debug?: boolean;
  shopperId: string;
  clientIp?: string;
  auth?: string;
  isAutomation?: boolean;
  logTraffic2EventsToMixpanel?: boolean;
  alwaysEnableUserProfiles?: boolean;
};

export interface AnalyticsTracker extends MetricsBase {
  new (opts: AnalyticsTrackerOptions): void;

  /**
   * Initializes a Mixpanel tracking object
   * @param {String} token     Mixpanel project token
   * @param {Object} [config]  Mixpanel config properties
   */
  initializeMixpanel(token: string, config: any): void;

  /**
   * Check a user is a TLA
   * @param {String} shopperId a shopperId used to check if it's internal ID
   * @returns {Boolean}         is internal or not
   */
  isInternal(shopperId: number | null): boolean;

  /**
   * Aliases the current distinct ID to a new user identifier
   * @param {String} identifier an identifier used to group events in Mixpanel
   */
  aliasToUser(identifier: any): void;

  /**
   * Register Mixpanel super properties
   * @param {Object} superProperties a mixpanel super properties config object
   */
  superProperties(superProperties: any): void;

  /**
   * Unregister Mixpanel super properties
   */
  unregisterSuperProperties(): void;

  /**
   * Set mixpanel user properties
   * @param {String}  userProperties  The user properties to set
   * @param {Boolean} [setOnce]       If true, properties that have already been written will not be overwritten
   */
  addMixpanelUserProperties(userProperties: any, setOnce: any): void;

  /**
   * Captures the start time for a timed event
   * @param  {String} eventName   The event name
   * @param  {String} eventType   The event type (e.g. impression, click)
   * @param  {Object} properties    Additional properties to attach to the event
   * @returns {String}            an event Id to pass to endEvent
   */
  beginEvent(eventName: string, eventType: string, properties: any): string;

  /**
   * Captures the end time for a timed event
   * @param  {String} eventId     The event Id
   * @param  {Object} properties  Additonal properties to attach to the event
   */
  endEvent(eventId: string, properties: any): void;

  /**
   * Writes an event
   * @param  {String} eventName   The event name
   * @param  {String} eventType   The event type (e.g. impression, click)
   * @param  {Object} properties  Additional properties to attach to the event
   */
  writeEvent(eventName: string, eventType: string, properties: any): void;
}

interface MetricsBase {
  options: {
    app: string;
    excludedShoppers: any;
    clientIp: string;
    eventMap: any;
    debugMode: boolean;
    traffic2: any;
    mixpanel: any;
    initWithPageview: any;
    shopperId: string;
    auth: any;
    isAutomation: boolean;
    logTraffic2EventsToMixpanel: any;
    alwaysEnableUserProfile: any;
    mixpanelSdk: any;
  };
  properties: any;
  events: Event[];

  defaultEventType: EventType;
  useTraffic2: Traffic2Config;

  logTraffic2EventsToMixpanel: boolean;

  instance: MetricsBase;

  initialize(): void;

  getEnvironment(): string;

  setupEventTypes(): void;

  setupTraffic2(): void;

  setupMixpanel(): void;

  /**
   * Identifies a user to Mixpanel by ID, or if not found, as 'unknownUser'
   * @param {String} identifier an identifier used to group events in Mixpanel
   */
  identifyUser(identifier: string): void;

  /**
   * Resets Mixpanel user ID on logout
   */
  logoutUser(): void;
}
