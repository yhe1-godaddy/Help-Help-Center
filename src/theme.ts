export const theme = {};

export type Theme = { [P in keyof typeof theme]: typeof theme[P] };
