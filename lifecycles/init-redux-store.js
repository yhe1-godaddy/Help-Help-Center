import { apiGlobalHeaders } from '../src/redux/api';

module.exports = async function initReduxStore(gasket, store, req) {
  apiGlobalHeaders.addHeader('Cookie', req.headers.cookie);

  /**
   *
   * Pre-load data to state by calling apis and adding to promise
   */
  const promises = [];

  const currentRoute = req.route;
  if (currentRoute && currentRoute.valid) {
  }

  await Promise.all(promises);
};
