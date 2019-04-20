const { createLogger, format, transports } = require("winston");
const grpc = require("grpc");

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "payment" },
  transports: [new transports.Console()]
});

grpc.setLogger(logger);

module.exports = logger;
