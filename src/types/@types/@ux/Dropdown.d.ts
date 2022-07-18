declare module '@ux/Dropdown' {
  type DropdownComponentProps = {
    name?: string;
    children?: React.ReactNode;
    open?: boolean;
    show?(...args: unknown[]): unknown;
    hide?(...args: unknown[]): unknown;
    onChange?(...args: unknown[]): unknown;
    onToggle?(...args: unknown[]): unknown;
    content?: React.ReactElement | string;
    disabled?: boolean;
    placeholder?: React.ReactNode;
    label?: React.ReactNode;
    toggleIcon?: 'clock' | 'dropdown';
    selected?: number | unknown[];
    defaultSelected?: number | unknown[];
    tabIndex?: -1 | 0;
    id?: string;
    type?: 'button' | 'select' | 'multiselect' | 'tripledot' | 'custom';
    elementType?: string;
    alignment?: 'left' | 'right' | 'preferLeft' | 'preferRight';
    enableFullscreen?: boolean;
    ariaLabels?: {
      close?: string;
    };
  };

  type DropdownControlProps = {
    'type'?: string;
    'split'?: boolean;
    'disabled'?: boolean;
    'toggleIcon'?: 'clock' | 'dropdown';
    'hasPlaceholder'?: boolean;
    'merch'?: boolean;
    'aria-labelledby'?: string;
    'content'?: React.ReactNode;
    'tabIndex'?: -1 | 0;
  };

  type DropdownHeaderProps = {
    children: React.ReactNode;
  };

  type DropdownItemProps = {
    disabled?: boolean;
    active?: boolean;
    type?: string;
    href?: string;
    isSelected?: boolean;
    tabIndex?: -1 | 0;
  };

  class Dropdown extends React.Component<DropdownComponentProps, any> {
    public toggleBackground(isOpen: boolean): void;

    public toggle(): void;

    public selectItem(itemProps: { itemIndex: number }, event: unknown, callback: () => void): void;

    public state: {
      error: boolean;
      open: boolean;
      selected: any[];
      keyboardSelectionIndex: number;
    };
  }

  export class DropdownControl extends React.Component<DropdownControlProps, any> {}

  export class DropdownDivider extends React.Component<Record<never, any>, any> {}

  export class DropdownHeader extends React.Component<DropdownHeaderProps, any> {}

  export class DropdownItem extends React.Component<DropdownItemProps, any> {}

  // eslint-disable-next-line import/no-default-export
  export default Dropdown;
}
