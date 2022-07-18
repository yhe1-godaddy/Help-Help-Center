declare module '@ux/FormElement' {
  import { FormEvent } from 'react';

  type FormElementProps = {
    label?: string;
    maxLength?: number;
    name?: string;
    onChange: (e: FormEvent) => void;
    onKeyDown: (e: FormEvent) => void;
    size: string;
  };

  export class FormElement extends React.Component<FormElementProps, any> {
    public clear(): void;

    public onChange(): void;

    public state: { hadInput: boolean };
    public elements: { input: HTMLInputElement };
  }

  export class Validation extends React.Component<unknown, any> {}

  export class Fieldset extends React.Component<unknown, any> {}

  export class Textual extends React.Component<unknown, any> {}

  export class Flip extends React.Component<unknown, any> {}

  // eslint-disable-next-line import/no-default-export
  export default FormElement;
}
