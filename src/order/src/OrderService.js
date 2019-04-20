const uuid = require("uuid/v4");

class OrderService {
  constructor({ paymentService }) {
    if (!paymentService)
      throw new Error(
        `paymentService must be injected. got: ${paymentService}`
      );

    this.orders = new Map();
    this.paymentService = paymentService;
    this.create = this.create.bind(this);
    this.cancel = this.cancel.bind(this);
    this.get = this.get.bind(this);
  }

  async create(order) {
    order.id = uuid();
    order.status = "created";

    const payment = await this.paymentService.create({
      amount: this._calculateTotalAmount(order),
      option: {
        provider: "visa",
        challenge: "123",
        identity: "4111111111111111"
      }
    });

    switch (payment.status) {
      case "declined":
        order.status = "cancelled";
        break;
      case "confirmed":
        order.status = "confirmed";
        break;
      default:
        throw new Error(`unknown state: ${payment.status}`);
    }

    this.orders.set(order.id, order);

    return order;
  }

  cancel(order) {
    this._assertOrderExist(order);
    this._assertCancellable(order);

    order = this.orders.get(order.id);
    order.status = "cancelled";

    return order;
  }

  get(order) {
    this._assertOrderExist(order);
    return this.orders.get(order.id);
  }

  _assertOrderExist(order) {
    if (!this.orders.has(order.id))
      throw new Error(`couldn't find order with ID: ${order.id}`);
  }

  _assertCancellable(order) {
    const order = this.orders.get(order.id);
    const status = order.status;

    if (status !== "success")
      throw new Error(`non cancellable order with status: ${status}`);
  }

  _calculateTotalAmount(order) {
    return order.items.reduce((prevState, i) => prevState + i.amount, 0);
  }
}

module.exports = OrderService;
