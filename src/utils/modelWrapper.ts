import type { RootState } from '../types';

export function modelWrapper<M, T = unknown, S = RootState>(
  entity: T | undefined,
  Model: new (object: T) => M
): M | undefined;

export function modelWrapper<M, T = unknown, S = RootState>(
  entities: T[],
  Model: new (object: T) => M
): M[];

export function modelWrapper<M, T = unknown, S = RootState>(
  entities: T | T[] | undefined,
  Model: new (object: T) => M
): M | M[] | undefined {
  // eslint-disable-next-line no-undefined
  if (!entities) return undefined;
  return Array.isArray(entities) ? entities.map(entity => new Model(entity)) : new Model(entities);
}
