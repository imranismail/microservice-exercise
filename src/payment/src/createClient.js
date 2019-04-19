const grpc = require("grpc");
const { requireProto, promisifyClient } = require("helpers");
const { PaymentService } = requireProto("../proto/service.proto");

function createClient(address) {
  const client = new PaymentService(address, grpc.credentials.createInsecure());
  return promisifyClient(client);
}

module.exports = createClient;
