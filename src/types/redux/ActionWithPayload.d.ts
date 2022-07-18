import { Action } from 'redux';

export interface ActionWithPayload<P> extends Action {
  payload: P;
}
