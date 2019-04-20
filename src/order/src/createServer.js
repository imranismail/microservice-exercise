const grpc = require("grpc");
const { requireProto, unary } = require("helper");
const OrderService = require("./OrderService");
const proto = requireProto("../proto/service.proto");

function createServer(address, { paymentService }) {
  const server = new grpc.Server();
  const service = new OrderService({
    paymentService
  });

  server.addService(proto.OrderService.service, {
    create: unary(service.create),
    cancel: unary(service.cancel),
    get: unary(service.get)
  });

  server.bind(address, grpc.ServerCredentials.createInsecure());

  return server;
}

module.exports = createServer;
