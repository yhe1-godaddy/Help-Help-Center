module.exports = {
  timing: { after: ['@gasket/redux'] },
  handler: function (_gasket, _app) {
    return async function (req, res, next) {
      const currentRoute = req.route;

      if (currentRoute && currentRoute.valid) {
        // great place to do redirects and validate access. Within our defined
        // routes since nextJs makes several calls to the backend that we
        // dont need to worry about

        req.withLocaleRequired('/locales');
      }

      next();
    };
  }
};
