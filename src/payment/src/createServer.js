const grpc = require("grpc");
const { requireProto, implementWith } = require("helpers");
const PaymentService = require("./PaymentService");
const proto = requireProto("../proto/service.proto");

function createServer(address) {
  const server = new grpc.Server();
  const impl = new PaymentService();

  server.addService(
    proto.PaymentService.service,
    implementWith({
      create: impl.create
    })
  );

  server.bind(address, grpc.ServerCredentials.createInsecure());

  return server;
}

module.exports = createServer;
