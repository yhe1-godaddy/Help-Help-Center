import ConfigClient from '@wsb/config-api-client';

const client = {};

async function fetchData({ shopperId, plid, locale }, params, logger) {
  const { app: appName } = params || {};

  // eslint-disable-next-line no-prototype-builtins
  if (!client.hasOwnProperty(appName)) {
    client[appName] = new ConfigClient(params)
      .on('error', ({ event, payload }) => {
        logger.error('Config client error: ', payload, { event });
      })
      .on('warning', ({ event, payload }) => {
        logger.warning(
          `Config client warning for ${appName} (${event}): ${payload.stack || payload}`
        );
      });
  }

  try {
    return await client[appName].get({
      shopperId,
      plid,
      locale
    });
  } catch (err) {
    logger.warning('Get from config API service failed:', err);
    return null;
  }
}

module.exports = {
  getAppConfigData: async function getAppConfigData(appConfigParams, requestParams, logger) {
    const params = {
      ...appConfigParams,
      plugins: [require('@wsb/core-config-rules')]
    };
    const appConfigData = await fetchData(requestParams, params, logger);

    return {
      appConfig: {
        ...(appConfigData || {})
      }
    };
  }
};
