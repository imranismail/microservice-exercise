#!/usr/bin/env node

const program = require("commander");
const pkg = require("../package.json");
const { createServer, logger } = require("./");

program.version(pkg.version);

program
  .command("server <address>")
  .description("starts the payment service")
  .action(address => {
    const server = createServer(address);

    logger.info(`starting payment service on address ${address}`);

    server.start();
  });

program.parse(process.argv);
