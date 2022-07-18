module.exports = function isNotHealthCheckRequest(req) {
  return !req.path.startsWith('/healthcheck');
};
