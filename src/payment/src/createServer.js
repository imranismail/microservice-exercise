const grpc = require("grpc");
const { requireProto, unary } = require("helpers");
const PaymentService = require("./PaymentService");
const proto = requireProto("../proto/service.proto");

function createServer(address) {
  const server = new grpc.Server();
  const service = new PaymentService();

  server.addService(proto.PaymentService.service, {
    create: unary(service.create),
    list: unary(service.list)
  });

  server.bind(address, grpc.ServerCredentials.createInsecure());

  return server;
}

module.exports = createServer;
