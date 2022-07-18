import { createSlice } from '@reduxjs/toolkit';
import { createEntityAdapter } from './helper';
import { apiActions } from '../api';
import type { RootState, Website } from '../../types';
import type {
  ActionWithPayload,
  WebsiteReduxState,
  FetchWebsiteResponse,
  FetchWebsitesResponse
} from '../../types';

const {
  getInitialState,
  getSelectors,
  addOne,
  addMany,
  removeAll,
  removeMany,
  removeOne,
  setAll,
  updateMany,
  updateOne,
  upsertMany,
  upsertOne
} = createEntityAdapter<Website, WebsiteReduxState>();

export const websiteEntity = {
  ...createSlice({
    name: 'website',
    initialState: getInitialState(),
    reducers: {
      addOne,
      addMany,
      removeAll,
      removeMany,
      removeOne,
      setAll,
      updateMany,
      updateOne,
      upsertMany,
      upsertOne
    },
    extraReducers: {
      [apiActions.fetchWebsites.subActions.success.type]: (
        state,
        { payload: websites }: ActionWithPayload<FetchWebsitesResponse>
      ) => {
        setAll(state, websites);
      },
      [apiActions.fetchWebsite.subActions.success.type]: (
        state,
        { payload: website }: ActionWithPayload<FetchWebsiteResponse>
      ) => {
        addOne(state, website);
      }
    }
  }),
  selectors: getSelectors((state: RootState) => state.website)
};
