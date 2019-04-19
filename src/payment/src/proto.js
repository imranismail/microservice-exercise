const path = require('path')
const grpc = require('grpc')
const proto = require('@grpc/proto-loader')

const PROTO_PATH = path.resolve(__dirname, "../proto/service.proto")

const pkgDefs = proto.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

module.exports = grpc.loadPackageDefinition(pkgDefs)