const uuid = require("uuid/v4");

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

    payment.status =
      payment.option.id === "4111111111111111" &&
      payment.option.challenge === "123"
        ? "confirmed"
        : "declined";

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
    if (!["visa"].includes(option.provider))
      throw new Error(`invalid payment provider: ${option.provider}`);
  }
}

module.exports = PaymentService;
