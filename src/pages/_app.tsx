import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import '@ux/icon/index.css';
import '@ux/tag/dist/styles.css';

import React from 'react';
import type { AppProps } from 'next/app';
import { createAppComponent } from '@godaddy/gasket-next';
import { ThunderAuthProvider } from '@wsb/gasket-thunder-auth-react';
import { useStore } from 'react-redux';
import { theme } from '../theme';
import { createUseStyles, ThemeProvider } from '../hooks/jss';
import { AnalyticsTrackerContainer } from '../containers/AnalyticsTrackerContainer';
import { AnalyticsTrackerProvider } from '../containers/AnalyticsTrackerProvider';
import { withRoutes } from '@wsb/gasket-complex-next-routes-react';

interface GasketAppProps extends AppProps {
  Page: React.ComponentType;
}

/**
 * Applied global css
 */
const useStyle = createUseStyles({
  '@global': {
    '.bg-scheduled': { backgroundColor: '#FADCD9' },
    '.bg-service_request': { backgroundColor: '#FFEEA9' }
  }
});

const Root = ({ Page, pageProps }: GasketAppProps) => {
  useStyle();
  const { thunderAuth: thunderAuthConfig } = useStore().getState();

  return (
    <ThemeProvider theme={theme}>
      <ThunderAuthProvider config={thunderAuthConfig}>
        <AnalyticsTrackerProvider {...pageProps}>
          <AnalyticsTrackerContainer {...pageProps} />

          <section className='container'>
            <Page {...pageProps} />
          </section>
        </AnalyticsTrackerProvider>
      </ThunderAuthProvider>
    </ThemeProvider>
  );
};

// Adding { strictMode: false } removes a lot of the react warnings in console to help
// w/ debuging, i.e. createAppComponent(Root, { strictMode: false });
// eslint-disable-next-line import/no-default-export
export default createAppComponent(withRoutes()(Root), {
  strictMode: false,
  redux: {}
});
