exports.validate = (schema, object) => {
  return schema.validate(object).catch(function (e) {
    return e.errors;
  });
};
