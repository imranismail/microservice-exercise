const path = require("path");
const grpc = require("grpc");
const proto = require("@grpc/proto-loader");

const PROTO_PATH = path.resolve(__dirname, "../proto/service.proto");

const pkgDefs = proto.loadSync(PROTO_PATH, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: false,
  oneofs: true
});

module.exports = grpc.loadPackageDefinition(pkgDefs);
