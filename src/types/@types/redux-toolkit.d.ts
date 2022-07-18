import {
  Comparer,
  Dictionary,
  EntityId,
  EntityState,
  EntityStateAdapter,
  IdSelector
} from '@reduxjs/toolkit';

export type EntityAdapterGetSelectorsParam<T, V> = (state: V & EntityState<T>) => EntityState<T>;

export interface EntityAdapter<T> extends EntityStateAdapter<T> {
  selectId: IdSelector<T>;
  sortComparer: false | Comparer<T>;

  getInitialState(): EntityState<T>;

  // eslint-disable-next-line @typescript-eslint/ban-types
  getInitialState<S extends object>(state: S): EntityState<T> & S;

  getSelectors(): EntitySelectors<T, EntityState<T>>;

  getSelectors<V>(selectState: (state: V) => EntityState<T>): EntitySelectors<T, V>;
}

export interface EntitySelectors<T, V> {
  selectIds: (state: V) => EntityId[];
  selectEntities: (state: V) => Dictionary<T>;
  selectAll: (state: V) => T[];
  selectTotal: (state: V) => number;
  selectById: (id: EntityId) => (state: V) => T | undefined;
}
