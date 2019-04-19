function unary(impl) {
  return async (call, callback) => {
    try {
      const result = await impl(call.request);
      callback(null, result);
    } catch (error) {
      callback(error, null);
    }
  };
}

module.exports = unary;
