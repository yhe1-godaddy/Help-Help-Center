import { Middleware, Reducer, Store } from 'redux';
import { reducers as allReducers } from '../../src/redux/reducers';
import { Enhancer } from 'next/dist/next-server/lib/utils';
import { initCreateStore } from '../../src/redux/store';

type makeTestStoreConfig = {
  reducers?: Record<string, Reducer>;
  initialState?: Record<string, unknown>;
  middleware?: any[];
  enhancers?: Enhancer<any>[];
  logging?: boolean;
  thunkMiddleware?: Middleware;
};

export const makeTestStore = (
  config: makeTestStoreConfig = {},
  postCreate: (store: Store) => void = (store: Store) => undefined
) => {
  const initialState = {
    req: {
      rootDomain: 'https://test.dev-godaddy.com'
    },
    ...config?.initialState
  };

  const testCreateStore = initCreateStore(
    {
      reducers: allReducers,
      ...config,
      initialState,
      middleware: []
    },
    postCreate
  );

  const store: Store = testCreateStore();
  const originalDispatch = store.dispatch;
  store.dispatch = jest.fn(originalDispatch);
  return store;
};
