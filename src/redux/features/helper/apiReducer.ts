import { Reducer } from 'redux';
import type { ApiActionCreator } from '../../../types';

type apiReducersReducers = {
  start?: Reducer<any, any>;
  fail?: Reducer<any, any>;
  success?: Reducer<any, any>;
};

export function apiReducer(
  apiActions: ApiActionCreator | ApiActionCreator[],
  reducers: apiReducersReducers
) {
  if (!Array.isArray(apiActions)) {
    apiActions = [apiActions];
  }

  return apiActions.reduce((acc, apiAction) => {
    if ('start' in reducers) {
      acc[apiAction.subActions.start.type] = reducers.start;
    }

    if ('fail' in reducers) {
      acc[apiAction.subActions.fail.type] = reducers.fail;
    }

    if ('success' in reducers) {
      acc[apiAction.subActions.success.type] = reducers.success;
    }

    return acc;
  }, {} as Record<string, Reducer | undefined>);
}
