const grpc = require("grpc");
const path = require("path");
const callsite = require("callsite");
const proto = require("@grpc/proto-loader");

const cache = new Map();

function requireProto(protoPath) {
  const stack = callsite();
  const resolvedProtoPath = path.resolve(
    path.dirname(stack[1].getFileName()),
    protoPath
  );

  if (cache.has(resolvedProtoPath)) return cache.get(resolvedProtoPath);

  const pkgDefs = proto.loadSync(resolvedProtoPath, {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: false,
    oneofs: true
  });

  const loadedProto = grpc.loadPackageDefinition(pkgDefs);

  cache.set(resolvedProtoPath, loadedProto);

  return loadedProto;
}

module.exports = requireProto;
