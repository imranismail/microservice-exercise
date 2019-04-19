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

function setupPayment() {
  return {
    amount: 3000,
    paymentOption: {
      provider: "visa",
      challenge: "123",
      ref: "4111111111111111"
    }
  };
}

test("service:create with valid payment", async t => {
  const newPayment = setupPayment();

  const createdPayment = await t.context.client.create(newPayment);

  t.truthy(createdPayment.id);
  t.truthy(createdPayment.status);
});

test("service:create with invalid provider", async t => {
  const newPayment = setupPayment();

  newPayment.paymentOption.provider = "master";

  await t.throwsAsync(
    async () => {
      await t.context.client.create(newPayment);
    },
    {
      instanceOf: Error,
      message: /invalid payment provider/
    }
  );
});

test("service:create with invalid challenge", async t => {
  const newPayment = setupPayment();

  newPayment.paymentOption.challenge = "124";

  await t.throwsAsync(
    async () => {
      await t.context.client.create(newPayment);
    },
    {
      instanceOf: Error,
      message: /invalid challenge code/
    }
  );
});
