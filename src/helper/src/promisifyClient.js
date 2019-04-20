const util = require("util");

function promisifyClient(client) {
  for (let key in Object.getPrototypeOf(client)) {
    const fn = client[key];

    if (
      !fn.hasOwnProperty("requestStream") &&
      !fn.hasOwnProperty("responseStream")
    ) {
      continue;
    }

    if (fn.responseStream && fn.requestStream) {
      // bi-directional stream
      continue;
    }

    if (fn.responseStream) {
      // response stream
      continue;
    }

    if (fn.requestStream) {
      // request stream
      continue;
    }

    client[key] = util.promisify(fn);
  }

  return client;
}

module.exports = promisifyClient;
