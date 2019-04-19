const grpc = require("grpc");
const util = require("util");
const { requireProto } = require("helpers");
const proto = requireProto("../proto/service.proto");

function createClient(address) {
  const client = new proto.PaymentService(
    address,
    grpc.credentials.createInsecure()
  );

  client.create = util.promisify(client.create);

  return client;
}

module.exports = createClient;
