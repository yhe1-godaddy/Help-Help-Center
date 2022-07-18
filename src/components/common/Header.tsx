import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Head } from './Head';
import { IntlKeys } from '../../constants/IntlKeys';

export const Header = () => (
  <>
    <Head />
    <header>
      <div>
        <div className='app-title'>
          <h1 className='headline-brand'>
            <FormattedMessage id={IntlKeys.APP_HEADING} />
          </h1>
          <div className='headline-subtitle' role='doc-subtitle'>
            <FormattedMessage id={IntlKeys.APP_SUB_HEADING} />
          </div>
        </div>
      </div>
    </header>
  </>
);
