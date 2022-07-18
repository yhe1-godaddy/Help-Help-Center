import { DefaultRootState, useSelector } from 'react-redux';
import { modelWrapper } from '../utils/modelWrapper';

export function useModelSelector<M, S = DefaultRootState, T = unknown>(
  selector: (state: S) => T | undefined,
  Model: new (object: T) => M,
  equalityFn?: (left: T, right: T) => boolean
): M | undefined;

export function useModelSelector<M, S = DefaultRootState, T = unknown>(
  selector: (state: S) => T[],
  Model: new (object: T) => M,
  equalityFn?: (left: T, right: T) => boolean
): M[];

export function useModelSelector<M, S = DefaultRootState, T = unknown>(
  selector: (state: S) => T,
  Model: new (object: T) => M,
  equalityFn?: (left: T, right: T) => boolean
): M | M[] | undefined {
  const entities = useSelector(selector, equalityFn);
  return modelWrapper(entities, Model);
}
