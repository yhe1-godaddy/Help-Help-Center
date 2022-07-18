declare module '@ux/uxcore2';
declare module '@ux/button';
declare module '@ux/button-set';
declare module '@ux/icon';

declare module '@ux/icon/*' {
  import { Component } from 'react';

  // eslint-disable-next-line import/no-default-export
  export default class Icon extends Component {}
}

declare module '@ux/icon/cart';
