const grpc = require("grpc");
const { requireProto, unary } = require("helpers");
const proto = requireProto("../proto/service.proto");

class OrderService {
  constructor() {
    this.orders = new Map();
  }

  async create() {}

  async cancel() {}

  async get() {}
}

function createServer(address) {
  const server = new grpc.Server();
  const impl = new OrderService();

  server.addService(proto.OrderService.service, {
    create: unary(impl.create),
    cancel: unary(impl.cancel),
    get: unary(impl.get)
  });

  server.bind(address, grpc.ServerCredentials.createInsecure());

  return server;
}

module.exports = createServer;
