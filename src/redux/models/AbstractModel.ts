import type { RootState } from '../../types';

export class AbstractModel<T extends Record<string | symbol, unknown>> {
  object: T;
  static _getState: () => RootState = () => ({} as RootState);

  static setStateGetter(getState: () => RootState): void {
    AbstractModel._getState = getState;
  }

  constructor(object: T) {
    this.object = object;

    const handler = {
      get: (target: this, prop: keyof T, receiver: any) => {
        if (prop in target.object) {
          return target.object[prop];
        }

        return Reflect.get(target, prop, receiver);
      },
      set: (target: this, prop: keyof T, value: any) => {
        if (prop in target.object) {
          target.object[prop] = value;
          return true;
        }

        return Reflect.set(target, prop, value);
      }
    };

    return new Proxy(this, handler);
  }

  get isProxyModel(): true {
    return true;
  }

  getState(): RootState {
    return AbstractModel._getState();
  }
}

export function extendAbstractModel<T extends Record<string | symbol, unknown>>(): new (object: T) => Pick<T, keyof T> & AbstractModel<T> {
  return AbstractModel as any;
}
