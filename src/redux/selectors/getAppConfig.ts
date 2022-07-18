import type { RootState } from '../../types';

export const getAppConfig = ({ appConfig }: RootState) => appConfig || {};
