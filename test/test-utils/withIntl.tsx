import React from 'react';
import { IntlProvider } from 'react-intl';

export const withIntl = (messages: Record<string, string> = {}) => (
  Component: React.ComponentType
) => {
  return (props: any) => {
    return (
      <IntlProvider messages={messages} locale='en-US'>
        <Component {...props} />
      </IntlProvider>
    );
  };
};
