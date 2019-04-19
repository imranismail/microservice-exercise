const uuid = require("uuid/v4");
const sample = require("lodash/sample");

const PAYMENT_PROVIDERS = ["visa"];

const PAYMENT_STATUS = ["pending", "void", "processing", "success"];

class PaymentService {
  constructor() {
    this.payments = new Map();
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
  }

  create(payment) {
    this._assertValidPaymentOption(payment.paymentOption);

    payment.id = uuid();
    payment.status = sample(PAYMENT_STATUS);

    this.payments.set(payment.id, payment);

    return payment;
  }

  list() {
    return {
      payments: [...this.payments.values()]
    };
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

module.exports = PaymentService;
