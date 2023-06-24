/*
  If you got here, you shouldn't be here
  if you're a function that is
*/
module.exports = (req, res, next) => {
  next({
    status: 405,
    message: `${req.method} not allowed for ${req.originalUrl}`,
  });
};
