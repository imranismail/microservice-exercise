const uuid = require("uuid/v4");
const sample = require("lodash/sample");

const PROVIDERS = ["visa"];

const STATUSES = {
  pending: ["declined", "confirmed"],
  "*": ["pending", "declined", "confirmed"]
};

class PaymentService {
  constructor() {
    this.payments = new Map();
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.get = this.get.bind(this);
  }

  create(payment) {
    this._assertValidOption(payment.option);

    payment.id = uuid();
    payment.status = "pending";
    payment.status = sample(STATUSES[payment.status]);

    this.payments.set(payment.id, payment);

    return payment;
  }

  list() {
    return {
      payments: [...this.payments.values()]
    };
  }

  get(payment) {
    this._assertPaymentExist(payment);
    return this.payments.get(payment.id);
  }

  _assertPaymentExist(payment) {
    if (!this.payments.has(payment.id))
      throw new Error(`couldn't find payment with ID: ${payment.id}`);
  }

  _assertValidOption(option) {
    if (!option) throw new Error("payment option must be specified");
    if (!PROVIDERS.includes(option.provider))
      throw new Error(`invalid payment provider: ${option.provider}`);
    if (option.identity === "4111111111111111" && option.challenge !== "123")
      throw new Error("invalid challenge code");
  }
}

module.exports = PaymentService;
