export const routes = {
  root: {
    name: 'root',
    page: 'index',
    analyticsId: 'root_visited',
    path: '/'
  },
  websites: {
    name: 'websites',
    page: 'index',
    analyticsId: 'website_root_visited',
    path: '/website'
  },
  home: {
    name: 'home',
    page: 'home',
    analyticsId: 'home_visited',
    path: '/website/:websiteId'
  }
  // sample: {
  //   name: 'sample',
  //   page: 'index', /** file name in /src/pages/ dir **/
  //   path: '/sample/:urlParam/:url_param__restricted(must-be-this|or-this)/:url_param__optional?'
  // }
};
