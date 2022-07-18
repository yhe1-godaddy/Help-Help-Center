/* eslint no-process-env:0 */
import analyticsConfig from '../config/analytics.config';

module.exports = async function initReduxState(gasket, state, req) {
  const rootDomain = req.hostname.split('.').reverse().splice(0, 2).reverse().join('.');
  const { shopperId } = req?.gdAuth?.jwt?.idp?.getShopperPayload() || {};
  const websiteId = req.route?.data?.websiteId;

  return {
    ...state,
    appConfig: req.config.appConfig,
    req: {
      rootDomain,
      cid: req.gdAuth?.jwt?.idp?.cid,
      shopperId: req.gdAuth?.jwt?.idp?.shopperId,
      plid: req.gdAuth?.jwt?.idp?.plid,
      locale: req.locale
    },
    analytics: analyticsConfig(gasket.config, shopperId),
    websiteId: websiteId
  };
};
