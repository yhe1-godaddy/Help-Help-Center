import React, { useEffect } from 'react';
import { useAnalyticsTracker } from '../hooks/useAnalyticsTracker';

type Props = {
  pathname: string;
};

export const AnalyticsTrackerContainer = ({ pathname }: Props) => {
  const tracker = useAnalyticsTracker();

  const onClickEvent = (e: Event) => {
    let eid = null;
    let payload = null;
    let el = e.target as Element;

    while (!eid && el) {
      if (el.getAttribute) {
        eid = el?.getAttribute('data-click-eid');
        payload = el?.getAttribute('data-click-payload');
      }
      el = el.parentNode as Element;
    }

    if (eid) tracker.track(eid, payload ? JSON.parse(payload) : null);
  };

  const onNavigationEvent = (e: Event) => {
    const clickedElement = e.target as HTMLElement;
    if (clickedElement && clickedElement.dataset.mix) {
      const mixEvent = clickedElement.dataset.mix.split('#');

      tracker.track({
        eid: 'navigation_click',
        payload: {
          'Item Name': mixEvent[0],
          'Is Group': mixEvent[1] === 'yes',
          'Group Name': mixEvent[2],
          'Column Name': mixEvent[3],
          'Application': mixEvent[4]
        }
      });
    }
  };

  useEffect(() => {
    tracker.track('gum_opened');
  }, []);

  /**
   * register click events to track eid tags
   */
  useEffect(() => {
    window.document.addEventListener('click', onClickEvent);

    const navBottom =
      window.document.querySelector('nav.nav-bottom') ||
      window.document.querySelector('.mobile-navigation');
    if (navBottom) {
      navBottom.addEventListener('click', onNavigationEvent);
    }

    return () => {
      window.document.removeEventListener('click', onClickEvent);
      if (navBottom) {
        navBottom.removeEventListener('click', onNavigationEvent);
      }
    };
  }, []);

  return null;
};
