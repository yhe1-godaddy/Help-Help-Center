import { EntityId, EntityState } from '@reduxjs/toolkit';
import { AbstractModel } from '../../src/redux/models';

export function buildEntityState<T extends { id: EntityId }>(
  entityModels: AbstractModel<T>[]
): EntityState<T>;

export function buildEntityState<T extends { id: EntityId }>(
  entityModel: AbstractModel<T>
): EntityState<T>;

export function buildEntityState<T extends { id: EntityId }>(entities: T[]): EntityState<T>;

export function buildEntityState<T extends { id: EntityId }>(entity: T): EntityState<T>;

export function buildEntityState<T extends { id: EntityId }>(
  entity: T | T[] | AbstractModel<T> | AbstractModel<T>[]
) {
  const entities = (Array.isArray(entity) ? entity : [entity]).map(model =>
    'isProxyModel' in model ? model.object : model
  );

  return {
    ids: entities.map(entity => entity.id),
    entities: entities.reduce(
      (acc, entity) => ({
        ...acc,
        [entity.id]: entity
      }),
      {}
    )
  };
}
