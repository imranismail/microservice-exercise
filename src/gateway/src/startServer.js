const express = require("express");
const order = require("order");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./logger");

const app = express();

app.use(morgan("combined", { stream: logger.stream }));

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.post("/order-cancellations", async (req, res, next) => {
  try {
    const orderService = req.app.get("orderService");

    const order = await orderService.cancel(req.body);

    res.json(order);
  } catch (error) {
    next(error);
  }
});

app.post("/order-payments", async (req, res, next) => {
  try {
    const orderService = req.app.get("orderService");

    const order = await orderService.pay(req.body);

    res.json(order);
  } catch (error) {
    next(error);
  }
});

app.post("/orders", async (req, res, next) => {
  try {
    const orderService = req.app.get("orderService");

    const order = await orderService.create(req.body);

    res.json(order);
  } catch (error) {
    next(error);
  }
});

app.get("/orders/:id", async (req, res, next) => {
  try {
    const orderService = req.app.get("orderService");

    const order = await orderService.get({ id: req.params.id });

    res.json(order);
  } catch (error) {
    next(error);
  }
});

function startServer(address, { orderServiceAddress }) {
  app.set("orderService", order.createClient(orderServiceAddress));

  const [host, port] = address.split(":");

  app.listen(port, host, () => console.log(`gateway running on ${address}`));
}

module.exports = startServer;
