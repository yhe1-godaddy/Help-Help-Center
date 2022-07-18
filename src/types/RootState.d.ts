import type { WebsiteReduxState, InitialReduxState } from './redux';

export interface RootState extends InitialReduxState {
  website: WebsiteReduxState;
}
