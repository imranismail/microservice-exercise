const test = require("ava");
const { createServer, createClient } = require("./");
const {
  createClient: createPaymentClient,
  createServer: createPaymentServer
} = require("payment");

test.serial.before("start server", t => {
  t.context.paymentServer = createPaymentServer("0.0.0.0:3000");

  t.context.server = createServer("0.0.0.0:1337", {
    paymentService: createPaymentClient("0.0.0.0:3000")
  });

  t.context.paymentServer.start();

  t.context.server.start();
});

test.serial.before("start client", t => {
  t.context.client = createClient("0.0.0.0:1337");
});

test.after("cleanup", t => {
  t.context.server.forceShutdown();

  t.context.paymentServer.forceShutdown();
});

function buildOrder() {
  return {
    items: [
      {
        title: "Playstation 4",
        description: "Piano Black (120GB)",
        identity: "12345",
        amount: 90000
      }
    ]
  };
}

test("create and pay order", async t => {
  const order = buildOrder();

  const createdOrder = await t.context.client.create(order);

  t.truthy(createdOrder.id);
  t.is(createdOrder.status, "created");

  const paidOrder = await t.context.client.pay({
    orderId: createdOrder.id,
    option: {
      provider: "visa",
      challenge: "123",
      identity: "4111111111111111"
    }
  });

  t.assert(["confirmed", "void"].includes(paidOrder.status));
});
