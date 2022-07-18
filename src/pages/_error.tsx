import React from 'react';
import { IntlKeys } from '../constants/IntlKeys';
import { useIntl } from 'react-intl';
import NextError from 'next/error';
import { withLocale } from '../utils/hoc/withLocale';

type Props = {
  statusCode: number;
  errorMessage?: string;
};

const Error = ({ statusCode, errorMessage }: Props) => {
  const intl = useIntl();

  const message =
    errorMessage ||
    (code => {
      switch (code) {
        case 403:
          return intl.formatMessage({ id: IntlKeys.DONT_HAVE_ACCESS_TO_PAGE });
        case 404:
          return intl.formatMessage({ id: IntlKeys.PAGE_NOT_FOUND });
        default:
          return intl.formatMessage({ id: IntlKeys.UNKOWN_ERROR });
      }
    })(statusCode);

  return <NextError title={message} statusCode={statusCode} />;
};

type InitialProps = {
  res?: any;
  err?: any;
};

Error.getInitialProps = ({ res, err }: InitialProps) => {
  const statusCode = res?.statusCode || err?.statusCode || 404;
  return { statusCode };
};

// eslint-disable-next-line import/no-default-export
export default withLocale(Error);
