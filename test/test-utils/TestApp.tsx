import React, { useEffect } from 'react';
import { Store } from 'redux';
import { Router } from 'next/router';
import { withIntl } from './withIntl';
import { makeTestStore } from './makeTestStore';
import { withStore } from './withStore';
import { ThemeProvider } from '../../src/hooks';
import { theme, Theme } from '../../src/theme';
import { websiteFactory } from '../fixtures';
import { buildEntityState } from './buildEntityState';
import { RootStateOrAny } from 'react-redux';
import { mockUseRouter } from './mockUseRouter';

type Props = {
  disableDispatch?: boolean;
  children: React.ReactNode;
  router?: jest.SpyInstance<Partial<Router>>;
  initialState?: RootStateOrAny; // not used when store is provided
  intMessages?: Record<string, string>;
  store?: Store;
};

export const TestApp = ({
  children,
  disableDispatch = true,
  router,
  initialState = {},
  intMessages = {},
  store
}: Props) => {
  if (!store) {
    const website = websiteFactory.build();
    const state = {
      websiteId: website.id,
      website: {
        ...buildEntityState(website)
      },
      req: {
        rootDomain: 'https://testing'
      },
      intl: {
        language: 'en-US',
        assetPrefix: '',
        languageMap: {},
        defaultLanguage: 'en-US'
      }
    };

    store = makeTestStore({
      initialState: {
        ...state,
        ...initialState
      }
    });
  }

  if (!router) {
    const mockRoute = {
      route: 'website',
      pathname: '/website',
      query: { websiteId: store?.getState().websiteId ? store?.getState().websiteId : '123' }
    };
    mockUseRouter(mockRoute);
  }

  if (disableDispatch) {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    useEffect(
      () => () => {
        mockDispatch.mockClear();
      },
      []
    );
  }

  let Component = (() => children) as React.ComponentType;

  Component = withStore(store)(Component);

  Component = withIntl(intMessages)(Component);

  return (
    <ThemeProvider theme={theme}>
      <Component />
    </ThemeProvider>
  );
};
