function implementedBy(map) {
  const implementation = {};

  for (let key in map) {
    implementation[key] = async (call, callback) => {
      try {
        const result = await map[key](call.request);
        callback(null, result);
      } catch (error) {
        callback(error, null);
      }
    };
  }

  return implementation;
}

module.exports = implementedBy;
