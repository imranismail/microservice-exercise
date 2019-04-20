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
    this.pay = this.pay.bind(this);
  }

  create(order) {
    order.id = uuid();
    order.status = "created";

    this.orders.set(order.id, order);

    return order;
  }

  async pay(orderPayment) {
    this._assertOrderExist(orderPayment.orderId);

    const order = this.orders.get(orderPayment.orderId);

    const totalAmount = this._calculateTotalAmount(order.items);

    const payment = await this.paymentService.create({
      amount: totalAmount,
      option: orderPayment.option
    });

    switch (payment.status) {
      case "declined":
        order.status = "void";
        break;
      case "confirmed":
        order.status = "confirmed";
        break;
    }

    return order;
  }

  cancel(order) {
    this._assertOrderExist(order.id);

    order = this.orders.get(order.id);

    this._assertCancellable(order.status);

    order.status = "cancelled";

    return order;
  }

  get(order) {
    this._assertOrderExist(order.id);
    return this.orders.get(order.id);
  }

  _assertOrderExist(id) {
    if (!this.orders.has(id))
      throw new Error(`couldn't find order with ID: ${id}`);
  }

  _assertCancellable(status) {
    if (status !== "success")
      throw new Error(`non cancellable order with status: ${status}`);
  }

  _calculateTotalAmount(items) {
    return items.reduce((prevState, i) => prevState + i.amount, 0);
  }
}

module.exports = OrderService;
