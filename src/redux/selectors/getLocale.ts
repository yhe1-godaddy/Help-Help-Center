import type { RootState } from '../../types';

export const getLocale = ({ req }: RootState) => req?.locale;
