import { configureMakeStore, getOrCreateStore } from '@gasket/redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import { Store } from 'redux';
import { AbstractModel } from './models/AbstractModel';
import merge from 'lodash.merge';
import type { RootState } from '../types';

/**
 * Leaving here to help decode serverside dispatches
 */
// const logger: Middleware<any, RootState> = store => next => action => {
//   if (
//     ![
//       'LocaleApi_getLocaleManifest_SUCCESS',
//       'LocaleApi_getMessages_SUCCESS',
//       'LOAD_COOKIES'
//     ].includes(action.type)
//   ) {
//     console.group(action.type);
//     console.info('dispatching', action);
//     console.groupEnd();
//   }
//   return next(action);
// };

const rootReducer = (state: RootState, { type, payload }: any) =>
  type === HYDRATE ? merge({}, state, payload) : state;

export const initCreateStore = (
  config: Record<string, any> = { middleware: [thunk], rootReducer, reducers },
  callBack: (store: Store) => void = store => null
) => {
  const makeStore = configureMakeStore({ ...config }, (store: Store) => {
    callBack(store);
    AbstractModel.setStateGetter(store.getState);

    return store;
  });

  makeStore.nextRedux = createWrapper(getOrCreateStore(makeStore));
  return makeStore;
};
