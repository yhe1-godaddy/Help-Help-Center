// Mocks useRouter
import querystring, { ParsedUrlQuery } from 'querystring';

const defaultRouter = {
  routeName: 'website',
  route: 'website',
  pathname: '/website',
  query: { websiteId: '123' },
  push: jest.fn(),
  pushRoute: jest.fn(),
  back: jest.fn()
};

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn().mockReturnValue(defaultRouter)
}));

jest.mock('../../src/hooks/useRouter', () => ({
  ...jest.requireActual('../../src/hooks/useRouter'),
  useRouter: jest.fn().mockReturnValue(defaultRouter)
}));

const nextUseRouter = jest.spyOn(require('next/router'), 'useRouter');
const useRouter = jest.spyOn(require('../../src/hooks/useRouter'), 'useRouter');

export const mockUseRouter = ({
  route,
  pathname,
  query = {},
  asPath = ''
}: {
  route: string;
  pathname: string;
  query?: ParsedUrlQuery;
  asPath?: string;
}) => {
  const push = jest.fn();
  const pushRoute = jest.fn();
  const back = jest.fn();

  if (asPath === '') {
    asPath = pathname + '?' + querystring.stringify(query);
  }

  nextUseRouter.mockImplementation(() => ({
    route,
    pathname,
    query,
    asPath,
    push,
    pushRoute,
    back
  }));

  useRouter.mockImplementation(() => ({
    routeName: route,
    route,
    pathname,
    query,
    asPath,
    push,
    pushRoute,
    back
  }));

  return { push, pushRoute, back };
};
