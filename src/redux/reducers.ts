import cookiesReducers from '@godaddy/gasket-cookies/reducers';
import { Reducer } from 'redux';
import * as features from './features';
import { apiReducers } from './api';

export const reducers = {
  ...cookiesReducers,
  ...[
    'configApi',
    'req',
    'analytics',
    'websiteId',
    'route',
    'countries',
    'appConfig',
    'thunderAuth'
  ].reduce(
    (r: Record<string, Reducer>, key) => ({
      ...r,
      [key]: (f: any) => f || null
    }),
    {}
  ),
  ...apiReducers,
  ...Object.values((features as unknown) as Record<string, { name: string; reducer: Reducer }>)
    .filter(f => 'reducer' in f && 'name' in f)
    .reduce(
      (r: Record<string, Reducer>, f) => ({
        ...r,
        [f.name]: f.reducer
      }),
      {}
    )
};
