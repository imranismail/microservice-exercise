const grpc = require('grpc')
const { PaymentService } = require('./proto');

const server = new grpc.Server();

server.addService(PaymentService.service, {
  Create(call, callback) {
    console.log(call.request);
    callback(null, call.request);
  }
})

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())

server.start()