const grpc = require("grpc");
const { requireProto, promisifyClient } = require("helper");
const { OrderService } = requireProto("../proto/service.proto");

function createClient(address) {
  const client = new OrderService(address, grpc.credentials.createInsecure());
  return promisifyClient(client);
}

module.exports = createClient;
