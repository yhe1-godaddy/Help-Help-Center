import type { RootState } from '../RootState';

declare module 'redux' {
  export interface Store {
    state: RootState;
  }
}
