/*
  Returns a middleware function that protects
  an asyncronous delegate function from blowing
  up the program:)
*/
module.exports = (delegate, defaultStatus) => {
  return (request, response, next) => {
    Promise.resolve()
      .then(() => delegate(request, response, next))
      .catch((error = {}) => {
        const { status = defaultStatus, message = error } = error;
        next({ status, message });
      });
  };
};
