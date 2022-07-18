import React from 'react';
import { withLocaleRequired, withIntlProvider } from '@gasket/react-intl';

export const withLocale = <P extends Record<string, unknown>>(Component: React.ComponentType<P>) =>
  withLocaleRequired('/locales', { initialProps: true })(Component);
