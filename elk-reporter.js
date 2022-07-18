/* eslint-disable */
module.exports = {
  applicationName: 'websitebuilder.pnc.tests_gum',
  elasticSearchHost: 'pcdata.int.godaddy.com:9200',
  elasticSearchIndex: 'pnc.tests_gum',
  elasticSearchLogLevel: 'error',
  extraParams: {
    gridNode: process.env.GRID_NODE,
    allTags: process.env.TEST_TAGS,
    locale: process.env.LOCALE || 'en-US',
    pullUrl: process.env.PULL_URL,
    buildCommiter: process.env.BUILD_COMMITTER,
    apiVersion: process.env.API_VERSION
  }
};
