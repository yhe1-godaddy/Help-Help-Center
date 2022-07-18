/* eslint max-statements: 0 */

module.exports = async function sharedHeader(gasket, req) {
  try {
    return {
      websiteId: req?.route?.data?.websiteId,
      options: {
        params: {
          // Will define the header uxcore and react intl versions from hydra
          'header_options[include]': 'website,entitlements',
          'header_options[uxcore]': gasket.config.pcSharedHeader.params.uxcore,
          'header_options[react]': gasket.config.pcSharedHeader.params.uxcore
        },
        headers: {
          cookie: req.headers.cookie
        }
      }
    };
  } catch (e) {
    gasket.logger.error(`Error ${e.message}`);
  }
};
