const grpc = require("grpc");
const util = require("util");
const proto = require("./proto");

function createClient(address) {
  const client = new proto.PaymentService(
    address,
    grpc.credentials.createInsecure()
  );

  client.create = util.promisify(client.create);

  return client;
}

module.exports = createClient;
