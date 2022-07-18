import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { AbstractModel } from '../../src/redux/models';

export const withStore = (store: Store) => (Component: React.ComponentType) => {
  return (props: any) => {
    AbstractModel.setStateGetter(store.getState);
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
};
