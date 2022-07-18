import React, { useMemo, createContext } from 'react';
import { useSelector } from 'react-redux';
import { useThunderAuth } from '@wsb/gasket-thunder-auth-react';
import { registerOriginCookie } from '@godaddy/user-analytics-js-register-origin';
import userAnalytics from '@godaddy/user-analytics-js';
import { getAnalyticsConfig } from '../redux/selectors/getAnalyticsConfig';
import { getWebsiteId } from '../redux/selectors/getWebsiteId';
import type { AnalyticsConfig } from '../types';
import { analyticsEvents } from '../../config/analytics.events';

type Props = {
  pathname: string;
  children: React.ReactNode;
};

export const AnalyticsTrackerContext = createContext(null);

export const AnalyticsTrackerProvider = ({ pathname, children }: Props) => {
  const websiteId = useSelector(getWebsiteId);
  const analyticsConfig = useSelector(getAnalyticsConfig);
  const isAgent = useThunderAuth().isAgent();

  const config: AnalyticsConfig = {
    ...analyticsConfig,
    mixpanel: {
      ...analyticsConfig?.mixpanel,
      identifier: websiteId
    }
  };

  try {
    config.mixpanel.superProperties = {
      ...config.mixpanel.superProperties,
      ...registerOriginCookie()
    };
  } catch (e) {
    // TODO: Figure out what to do when origin registering fails
  }

  const trackerValue = useMemo(() => {
    const tracker = userAnalytics(config);
    tracker.updateEventMap(analyticsEvents);

    // we have to set isAgent to super properties this approach, since we update the event map
    tracker.properties = {
      ...tracker.properties,
      isAgent
    };

    return tracker;
  }, []);

  return (
    <AnalyticsTrackerContext.Provider value={trackerValue}>
      {children}
    </AnalyticsTrackerContext.Provider>
  );
};
