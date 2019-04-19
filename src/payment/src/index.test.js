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

function buildPayment() {
  return {
    amount: 3000,
    option: {
      provider: "visa",
      challenge: "123",
      ref: "4111111111111111"
    }
  };
}

test("create valid payment", async t => {
  const payment = buildPayment();

  const createdPayment = await t.context.client.create(payment);

  t.truthy(createdPayment.id);
  t.truthy(createdPayment.status);
});

test("create payment with invalid provider", async t => {
  const payment = buildPayment();

  payment.option.provider = "master";

  await t.throwsAsync(
    async () => {
      await t.context.client.create(payment);
    },
    {
      instanceOf: Error,
      message: /invalid payment provider/
    }
  );
});

test("create payment with invalid challenge", async t => {
  const payment = buildPayment();

  payment.option.challenge = "124";

  await t.throwsAsync(
    async () => {
      await t.context.client.create(payment);
    },
    {
      instanceOf: Error,
      message: /invalid challenge code/
    }
  );
});

test("get payment", async t => {
  const payment = buildPayment();

  const createdPayment = await t.context.client.create(payment);
  const retrievedPayment = await t.context.client.get({
    id: createdPayment.id
  });

  t.is(createdPayment.id, retrievedPayment.id);
});

test("list payments", async t => {
  const payment = buildPayment();

  await t.context.client.create(payment);

  const list = await t.context.client.list({});

  t.assert(list.payments.length > 0);
});
