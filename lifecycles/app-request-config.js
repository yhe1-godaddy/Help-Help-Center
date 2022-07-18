import appConfigModule from './utils/fetch-appconfig';

const getAuth = async (req, logger) => {
  let auth;
  try {
    const { valid, details } = await req.checkAuth({ realm: 'idp' });
    if (valid) {
      auth = details;
    }
  } catch (err) {
    logger.warning('Unable to validate request authentication', err);
  }

  return auth;
};

module.exports = async function appRequestConfig(gasket, config, req) {
  const auth = await getAuth(req, gasket.logger);
  if (!auth) {
    return config;
  }
  const { plid = 1, shopperId } = auth;
  const { locale } = req;

  // Need to return next here to proceed through order of operations
  try {
    const configApi = await appConfigModule.getAppConfigData(
      config,
      { shopperId, plid, locale },
      gasket.logger
    );
    return { ...config, ...configApi };
  } catch (e) {
    // Do not want to throw here as it would not allow express hook to process
    gasket.logger.error(`config api error: ${e.message}`);
  }
};
