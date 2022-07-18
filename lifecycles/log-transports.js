import { transports } from 'winston';
import WinstonLogStash from 'winston3-logstash-transport';

/**
 * Define additional log transports
 * @param {Gasket} gasket The gasket API
 * @returns {Transport|Transport[]} winston Transports to consume
 */
module.exports = function logTransports(gasket) {
  return [
    new transports.Console(),
    new WinstonLogStash({
      mode: 'udp',
      host: 'wsbmonitor.int.godaddy.com',
      port: 9999,
      meta: {
        '@application_name': gasket.config.appName,
        'environment': gasket.config.env
      },
      silent: false
    })
  ];
};
