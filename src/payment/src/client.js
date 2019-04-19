const grpc = require("grpc");
const proto = require("./proto");
const util = require("util");

async function main() {
  const client = new proto.PaymentService(
    "0.0.0.0:50051",
    grpc.credentials.createInsecure()
  );

  client.create = util.promisify(client.create);

  try {
    result = await client.create({
      amount: 3000,
      paymentOption: {
        ref: "4111111111111111",
        challenge: "124",
        provider: "visa"
      }
    });

    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

main();
