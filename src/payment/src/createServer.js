const grpc = require("grpc");
const PaymentService = require("./PaymentService");
const proto = require("./proto");

function createServer(address) {
  const server = new grpc.Server();
  const impl = new PaymentService();

  server.addService(proto.PaymentService.service, {
    create: async (call, callback) => {
      try {
        const payment = await impl.create(call.request);
        callback(null, payment);
      } catch (err) {
        callback(err, null);
      }
    }
  });

  server.bind(address, grpc.ServerCredentials.createInsecure());

  return server;
}

module.exports = createServer;
