import Int from '../../public/locales/en-US.json';

type IntKeys = keyof typeof Int;

export const IntlKeys = [...Object.keys(Int)].reduce((o, k) => ({ ...o, [k]: k }), {}) as {
  [P in IntKeys]: P;
};
