/* eslint no-process-env: 0 */
const path = require('path');
const configRules = require('@wsb/core-config-rules');
const PREFIXES = require('./config/domain-prefixes');

let env = process.env.NODE_ENV || 'local';

if (process.argv.length > 3 && process.argv[2] === 'local') {
  switch (process.argv[3]) {
    case '--env=local:test':
      env = 'test';
      break;
    case '--env=local:prod':
      env = 'production';
      break;
    default:
      break;
  }
}

const tlsPath = process.env.TLS_PATH || __dirname || '';
const subDomain = '{{context.host}}';

////
module.exports = {
  app: '{{context.appname}}',  /** id of appconfig.int.godaddy.com **/
  subDomain,
  auth: {
    cert: `${tlsPath}/certs/${subDomain}.authclient.int.${PREFIXES[env]}godaddy.com.crt`,
    key: `${tlsPath}/certs/${subDomain}.authclient.int.${PREFIXES[env]}godaddy.com.key`
  },
  // shared volume for caching is not available for clusters, so use in-memory caching for now
  cache: { path: null },
  env,
  // adds shopper percentage, tla, shopperList and locale rules
  plugins: [configRules],
  environments: {
    'local': {
      auth: {
        cert: path.resolve(__dirname, `./certs/_.${subDomain}.dev-godaddy.com.crt`),
        key: path.resolve(__dirname, `./certs/_.${subDomain}.dev-godaddy.com.key`),
        ca: path.resolve(__dirname, `./certs/_.${subDomain}.dev-godaddy.com_intermediate_chain.crt`)
      },
      env: 'development'
    },

    'local:test': {
      auth: {
        cert: path.resolve(__dirname, `./certs/_.${subDomain}.test-godaddy.com.crt`),
        key: path.resolve(__dirname, `./certs/_.${subDomain}.test-godaddy.com.key`),
        ca: path.resolve(
          __dirname,
          `./certs/_.${subDomain}.test-godaddy.com_intermediate_chain.crt`
        )
      },
      env: 'test'
    },

    ['local:prod']: {
      auth: {
        cert: path.resolve(__dirname, `./certs/_.${subDomain}.godaddy.com.crt`),
        key: path.resolve(__dirname, `./certs/_.${subDomain}.godaddy.com.key`),
        ca: path.resolve(__dirname, `./certs/_.${subDomain}.godaddy.com_intermediate_chain.crt`)
      },
      env: 'production'
    },

    'development': {
    },

    'test': {
    },

    'production': {
    }
  }
};
