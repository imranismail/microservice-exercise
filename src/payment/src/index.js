const grpc = require("grpc");
const proto = require("./proto");
const uuid = require("uuid/v4");
const sample = require("lodash/sample");

const PAYMENT_PROVIDERS = ["visa"];

const PAYMENT_STATUS = ["pending", "void", "processing", "success"];

class PaymentServiceImpl {
  constructor() {
    this.payments = [];
  }

  create(payment) {
    this._assertValidPaymentOption(payment.paymentOption);

    payment.id = uuid();
    payment.status = sample(PAYMENT_STATUS);

    this.payments.push(payment);

    return payment;
  }

  _assertValidPaymentOption(paymentOption) {
    if (!paymentOption) throw new Error("payment option must be specified");
    if (!PAYMENT_PROVIDERS.includes(paymentOption.provider))
      throw new Error(`invalid payment provider: ${paymentOption.provider}`);
    if (
      paymentOption.ref === "4111111111111111" &&
      paymentOption.challenge !== "123"
    )
      throw new Error("invalid challenge code");
  }
}

function main() {
  const server = new grpc.Server();
  const impl = new PaymentServiceImpl();

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

  server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());

  server.start();
}

main();
