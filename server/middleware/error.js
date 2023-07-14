// == Error handling ==
const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  // Set an appropriate status code based on the error
  const statusCode = err.statusCode || 500;

  // Send an error response to the client
  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};

module.exports = {
  errorHandler,
};
