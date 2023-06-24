/*
  Sends an error. What can I say?
*/  
module.exports = (error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
};
