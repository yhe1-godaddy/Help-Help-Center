import { useContext } from 'react';
import { AnalyticsTrackerContext } from '../containers/AnalyticsTrackerProvider';

export const useAnalyticsTracker = (): any => useContext(AnalyticsTrackerContext);
