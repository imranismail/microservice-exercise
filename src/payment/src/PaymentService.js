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
    this._assertValidOption(payment.option);

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

  _assertValidOption(option) {
    if (!option) throw new Error("payment option must be specified");
    if (!PAYMENT_PROVIDERS.includes(option.provider))
      throw new Error(`invalid payment provider: ${option.provider}`);
    if (option.ref === "4111111111111111" && option.challenge !== "123")
      throw new Error("invalid challenge code");
  }
}

module.exports = PaymentService;
