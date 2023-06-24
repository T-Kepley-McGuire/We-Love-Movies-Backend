/*
  What are you trying to request? 
  Try a request supported by the api
*/
module.exports = (req, res, next) => {
  next({
    status: 404,
    error: `The route ${req.path} does not exist!`,
  });
};
