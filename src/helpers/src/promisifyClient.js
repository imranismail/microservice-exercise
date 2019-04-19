const util = require("util");
const isUndefined = require("lodash/isUndefined");

function promisifyClient(client) {
  for (let key in Object.getPrototypeOf(client)) {
    const fn = client[key];

    if (isUndefined(fn.requestStream) && isUndefined(fn.responseStream)) {
      continue;
    }

    client[key] = util.promisify(fn);
  }

  return client;
}

module.exports = promisifyClient;
