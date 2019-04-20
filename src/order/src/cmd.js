#!/usr/bin/env node

const program = require("commander");
const pkg = require("../package.json");
const { createServer, logger } = require("./");
const { createClient: createPaymentClient } = require("payment");

program.version(pkg.version);

program
  .command("server <address>")
  .description("starts the order service")
  .option("-p, --payment-svc-addr [address]", "payment service address")
  .action((address, { paymentSvcAddr: paymentServiceAddress }) => {
    const paymentService = createPaymentClient(paymentServiceAddress);

    const server = createServer(address, {
      paymentService
    });

    logger.info(`using payment service on address ${paymentServiceAddress}`);

    logger.info(`starting order service on address ${address}`);

    server.start();
  });

program.parse(process.argv);
