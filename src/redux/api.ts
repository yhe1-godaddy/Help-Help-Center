import fetch from '@gasket/fetch';
import { ApiDescription, makeFetchAdapter, setupApi } from 'reduxful';
import AbortController from 'abort-controller';
import * as endpoints from './endpoints';
import type {
  ApiActionCreators,
  ApiRequestDescription,
  ApiResource,
  Reduxful,
  RootState
} from '../types';
import { Dispatch } from 'redux';
import { apiQueueType } from '../constants/apiQueueType';
import { fromEntriesObj } from '../utils/fromEntriesObj';
import { mergeObjects } from '../utils/mergeObjects';

const apiName = 'api';
const apiEndpoints = endpoints as Record<string, ApiRequestDescription>;

export const apiGlobalHeaders = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  } as Record<string, string>,
  addHeader: function (header: string, value: string) {
    this.headers[header] = value;
  },
  getHeaders: function (getState: () => RootState): Record<string, string> {
    return {
      'X-Websiteid': getState().websiteId,
      ...this.headers
    };
  }
};

/**
 * Leaving here to help when needing to debug server api calls
 */
// const debugFetch = function () {
//   console.log(arguments);
//   return fetch
//     .apply(this, arguments)
//     .then(response => {
//       console.log('response', response);
//       return response;
//
//           })
//     .catch(r => console.log(r));
// };
// const requestAdapter = makeFetchAdapter(debugFetch);

export const requestAdapter = makeFetchAdapter(fetch);

const apiConfig = {
  requestAdapter,
  options: (getState: () => RootState) => ({
    credentials: 'include',
    headers: apiGlobalHeaders.getHeaders(getState)
  })
};

export const reduxfulApi = setupApi(apiName, apiEndpoints as ApiDescription, apiConfig) as Reduxful;

export const apiReducers = reduxfulApi.reducers;

export const apiResources = reduxfulApi.actions as {
  [P in keyof typeof apiEndpoints]: ApiResource;
};

type AbortControllerTracker = { abortController: AbortController | null };

export const apiActions = fromEntriesObj(
  Object.entries(apiResources).map(([endpoint, apiActionCreator]) => {
    const endpointConfig = apiEndpoints[endpoint];
    const abortControllerTracker: AbortControllerTracker = { abortController: null };

    function actionCreator<Payload = any>(payload: Payload = {} as Payload) {
      return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        if (
          abortControllerTracker.abortController &&
          endpointConfig?.queueType === apiQueueType.TAKE_LATEST
        ) {
          abortControllerTracker.abortController.abort();
        }
        abortControllerTracker.abortController = new AbortController();

        const globalOptions = {
          ...apiGlobalHeaders.getHeaders(getState),
          signal: abortControllerTracker.abortController?.signal,
          requestPayload: payload
        };

        if (endpointConfig.requestTransform) {
          const { urlProps = {}, options = {} } = endpointConfig.requestTransform(
            payload,
            getState
          );

          const { body = null, ...otherOptions } = options;
          const mergedOptions = mergeObjects(globalOptions, otherOptions, true);
          if (body) {
            mergedOptions.body = body;
          }

          if (options.headers) {
            Object.entries(options?.headers).forEach(([key, value]) => {
              if (value === null) {
                delete mergedOptions.headers[key];
              }
            });
          }

          const response = await dispatch<any>(apiActionCreator(urlProps, mergedOptions));

          abortControllerTracker.abortController = null;
          return response;
        }

        return dispatch(apiActionCreator(payload, globalOptions));
      };
    }

    actionCreator.subActions = {
      start: { type: `${apiName}_${endpoint}_START` },
      reset: { type: `${apiName}_${endpoint}_RESET` },
      success: { type: `${apiName}_${endpoint}_SUCCESS` },
      fail: { type: `${apiName}_${endpoint}_FAIL` }
    };

    return [endpoint, actionCreator];
  })
) as ApiActionCreators;
