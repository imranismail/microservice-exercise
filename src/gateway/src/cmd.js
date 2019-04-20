#!/usr/bin/env node

const program = require("commander");
const pkg = require("../package.json");
const { startServer } = require("./");

program.version(pkg.version);

program
  .command("server <address>")
  .description("starts the order service")
  .option("-o, --order-svc-addr [address]", "order service address")
  .action((address, { orderSvcAddr: orderServiceAddress }) => {
    startServer(address, {
      orderServiceAddress
    });
  });

program.parse(process.argv);
