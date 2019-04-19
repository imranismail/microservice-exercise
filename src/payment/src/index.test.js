const test = require("ava");
const createServer = require("./createServer");
const createClient = require("./createClient");

test.serial.before("start server", t => {
  t.context.server = createServer("0.0.0.0:1337");
  t.context.server.start();
});

test.serial.before("start client", t => {
  t.context.client = createClient("0.0.0.0:1337");
});

test.after("stop server", t => {
  t.context.server.forceShutdown();
});

test("foo", async t => {
  const newPayment = {
    amount: 3000,
    paymentOption: {
      provider: "visa",
      challenge: "123",
      ref: "4111111111111111"
    }
  };

  const createdPayment = await t.context.client.create(newPayment);

  t.truthy(createdPayment.id);
  t.truthy(createdPayment.status);
});
