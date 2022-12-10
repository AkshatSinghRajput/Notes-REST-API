const os = require("os");

async function logger(req, res, next) {
  console.log({
    timestamp: Date.now(),
    hostname: os.hostname(),
    ip: req.ip,
    method: req.method,
    url: `${req.baseUrl} ${req.url}`,
  });
  next();
}

module.exports = logger;