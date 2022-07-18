/* eslint-disable no-process-env, no-console*/
require('@babel/register')({
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
});

const fs = require('fs');
const convert = require('xml-js');
const isNotHealthCheckRequest = require('./lifecycles/utils/isNotHealthCheckRequest');
const appConfig = require('./app.config.js');
const PREFIXES = require('./config/domain-prefixes');
const { routes } = require('./config/routes');

const env = process.env.NODE_ENV || 'local';
const certName = `_.${appConfig.subDomain}.${PREFIXES[env]}godaddy.com`;

/*eslint no-sync: ["error", { allowAtRootLevel: true }]*/
const manifestXml = fs.readFileSync('./manifest.xml', 'utf8');
const {
        Translation: {
          File: {
            _attributes: { Cultures: manifestCultures }
          }
        }
      } = JSON.parse(convert.xml2json(manifestXml, { compact: true }));

module.exports = {
  appName: appConfig.app,
  plugins: {
    presets: ['@godaddy/webapp'],
    add: [
      '@wsb/gasket-plugin-complex-next-routes',
      '@gasket/jest',
      '@wsb/gasket-plugin-shared-header',
      '@gasket/plugin-intl',
      '@wsb/gasket-plugin-thunder-auth'
    ],
    remove: ['@godaddy/uxp']
  },
  redux: {
    makeStore: './src/createStore'
  },
  routes: Object.values(routes),
  nextConfig: {
    distDir: 'dist/.next',
    future: {
      webpack5: true
    }
  },
  helmet: {
    contentSecurityPolicy: false
  },
  pcSharedHeader: {
    params: {
      app: appConfig.app,
      uxcore: '2200',
      react: '4'
    },
    client: {
      options: {}
    },
    shouldAuthenticate: isNotHealthCheckRequest
  },
  auth: {
    appName: appConfig.app
  },
  presentationCentral: {},
  environments: {
    'local': {
      http: null,
      hostname: `local.${appConfig.subDomain}.${PREFIXES[env]}godaddy.com`,
      nextConfig: {
        assetPrefix: ''
      },
      https: {
        port: 8444,
        root: './certs',
        key: `${certName}.key`,
        cert: [`${certName}.crt`]
      }
    },

    'local:test': {
      http: null,
      env: 'test',
      hostname: `local.${appConfig.subDomain}.test-godaddy.com`,
      // http: 8080,
      nextConfig: {
        assetPrefix: ''
      },
      https: {
        port: 443,
        root: './certs',
        key: `_.${appConfig.subDomain}.test-godaddy.com.key`,
        cert: [`_.${appConfig.subDomain}.test-godaddy.com.crt`]
      }
    },

    'local:prod': {
      http: null,
      env: 'production',
      hostname: `local.${appConfig.subDomain}.godaddy.com`,
      // http: 8080,
      next: {
        assetPrefix: ''
      },
      https: {
        port: 443,
        root: './certs',
        key: `_.${appConfig.subDomain}.test-godaddy.com.key`,
        cert: [`_.${appConfig.subDomain}.test-godaddy.com.crt`]
      }
    },

    'development': {
      hostname: `${appConfig.subDomain}.dev-godaddy.com`,
      http: 8080,
      https: null,
      nextConfig: {
        assetPrefix: 'https://blobby.dev-wsimg.com/go'
      }
    },

    'testDocker': {
      hostname: `local.${appConfig.subDomain}.dev-godaddy.com`,
      http: 8080,
      https: null,
      nextConfig: {
        assetPrefix: 'https://blobby.dev-wsimg.com/go'
      }
    },

    'test': {
      hostname: `${appConfig.subDomain}.test-godaddy.com`,
      http: 8080,
      nextConfig: {
        assetPrefix: 'https://blobby.test-wsimg.com/go'
      }
    },

    'production': {
      hostname: `${appConfig.subDomain}.godaddy.com`,
      http: 8080,
      winston: {
        level: 'warning'
      },
      nextConfig: {
        assetPrefix: 'https://img1.wsimg.com/blobby/go'
      }
    }
  },
  assets: {
    namespace: false
  },
  intl: {
    defaultLocale: 'en-US',
    locales: ['en-US', ...manifestCultures.replace(/,/g, '').split(' ')],
    localesMap: {
      en: 'en-US'
    },
    serveStatic: true
  },
  express: {
    /**
     * Regex of the routes to exclude by Express. The reason to add this is because when we
     * load a page, the app requests assets to itself, under "_next" segment. Those requests
     * make certain lifecycles functions (like init-redux-state and shared-header), to
     * execute multiple times when is not necessary. Some items under _next do need
     * to be accessed during start up, such as webpack.
     *
     * @see https://github.secureserver.net/PC/leka-web/pull/191/files <- team that came up with this solution
     */
    // eslint-disable-next-line max-len
    excludedRoutesRegex: /^(?!(\/_next\/static\/css\/)|(\/_next\/static\/chunks\/)|(\/_next\/static\/(development|test|production)\/)|(\/_next\/webpack-hmr)|(\/serviceWorker\.js)|(\/locales)|(\/healthcheck))/
  }
};
