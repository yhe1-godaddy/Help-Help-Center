import {
  Comparer,
  createEntityAdapter as toolKitCreateEntityAdapter,
  EntityId,
  EntityState,
  EntityStateAdapter,
  IdSelector
} from '@reduxjs/toolkit';
import type { EntitySelectors as ToolkitEntitySelectors } from '../../../types/@types/redux-toolkit';

interface EntitySelectors<T, V, S> extends ToolkitEntitySelectors<T, V> {
  getState: (state: V) => S;
}

interface EntityAdapter<T, S> extends EntityStateAdapter<T> {
  selectId: IdSelector<T>;
  sortComparer: false | Comparer<T>;

  getInitialState(): EntityState<T>;

  getInitialState<S extends Record<any, any>>(defaultEntities: Array<T>): EntityState<T> & S;

  getSelectors(): EntitySelectors<T, EntityState<T>, S>;

  getSelectors<V>(selectState: (state: V) => EntityState<T>): EntitySelectors<T, V, S>;
}

type createEntityAdapterOptions<T> = {
  selectId?: IdSelector<T>;
  sortComparer?: false | Comparer<T>;
};

export const createEntityAdapter = <T extends { id: EntityId }, S>(
  options?: createEntityAdapterOptions<T>
): EntityAdapter<T, S> => {
  const adapter = toolKitCreateEntityAdapter<T>(options);

  return {
    ...adapter,
    getInitialState(defaultEntities?: Array<T>): EntityState<T> {
      return adapter.getInitialState(
        defaultEntities && defaultEntities.length > 0
          ? defaultEntities.reduce(
            (acc, entite) => ({
              ...acc,
              ids: [...acc.ids, entite.id],
              entities: {
                ...acc.entities,
                [entite.id]: entite
              }
            }),
            { ids: [], entities: {} } as EntityState<T>
          )
          : {}
      );
    },
    getSelectors: <V>(selectState?: (state: V) => EntityState<T>) => {
      const selectors = selectState ? adapter.getSelectors(selectState) : adapter.getSelectors();
      return {
        ...selectors,
        getState: (state: V) => (selectState ? ((selectState(state) as unknown) as S) : state),
        selectById: (id: EntityId) => (state: V & EntityState<T>) => selectors.selectById(state, id)
      } as EntitySelectors<T, V, S>;
    }
  };
};
