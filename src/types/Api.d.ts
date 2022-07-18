import * as endpoints from '../redux/endpoints';
import {
  ActionCreatorFn,
  ActionCreatorThunkFn,
  OptionsFn,
  ReduxfulProps as OriginalReduxful,
  RequestDescription
} from 'reduxful';
import type { ActionWithPayload } from './redux';
import { apiQueueType } from '../constants/apiQueueType';
import type { RootState } from './RootState';

export type ApiEndpointNames = keyof typeof endpoints;

// Reduxful has a bad typeing that is missing the name property
interface Reduxful extends OriginalReduxful {
  name: string;
  actions: Record<ApiEndpointNames, ApiResource>;
  actionCreators: Record<ApiEndpointNames, ApiResource>;
}

export type ApiRequestDescriptionQueueType = typeof apiQueueType[keyof typeof apiQueueType];

export interface ApiAction<A = any, R = any> extends ActionWithPayload {
  type: string;
  onComplete?: (result: A) => R;
  payload: unknown;
}

export type ApiResponse<Response = any> = ActionWithPayload<Response>;

export interface ApiActionCreator<A = any, R = any> extends ApiAction<A, R> {
  (payload?: any): Promise<ApiResponse<R>>;

  subActions: {
    reset: { type: string };
    start: { type: string };
    success: { type: string };
    fail: { type: string };
  };
}

export type ApiActionCreators = Record<ApiEndpointNames | string, ApiActionCreator>;

export interface ApiResource {
  (
    params: { [paramName: string]: any },
    options?: Options | OptionsFn<Options>
  ): ActionCreatorThunkFn;

  reset: ActionCreatorFn;
  start: ActionCreatorFn;
  success: ActionCreatorFn;
  fail: ActionCreatorFn;
  subActions: {
    reset: (payload?: any) => ActionWithPayload;
    start: (payload?: any) => ActionWithPayload;
    success: (payload?: any) => ActionWithPayload;
    fail: (payload?: any) => ActionWithPayload;
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface ApiRequestDescription<Options = { body?: string; headers?: Record<any, any> }>
  extends RequestDescription {
  queueType?: ApiRequestDescriptionQueueType;
  options?: Options | OptionsFn<Options>;
  requestTransform?: (
    payload: any,
    getState: () => RootState
  ) => {
    urlProps?: Record<string, any>;
    options?: Options;
  };
  dataTransform?: (
    response: any,
    context: { params: Record<string, string>; options: { requestPayload: any } }
  ) => any;
}

export type ApiResources = Record<ApiEndpointNames, ApiResource>;
