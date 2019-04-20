class OrderService {
  constructor({ paymentService }) {
    if (!paymentService)
      throw new Error(
        `paymentService must be injected. got: ${paymentService}`
      );

    this.orders = new Map();
    this.paymentService = paymentService;
  }

  async create() {}

  async cancel() {}

  async get() {}
}

module.exports = OrderService;
