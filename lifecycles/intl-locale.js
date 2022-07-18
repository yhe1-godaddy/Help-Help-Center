module.exports = async function intlLocale(gasket, locale, { req, res }) {
  req.locale = locale;

  if (req?.cookies?.market) {
    req.locale = req?.cookies?.market;
  }
  return req.locale;
};
