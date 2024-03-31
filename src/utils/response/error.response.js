// Function to send error response
exports.sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    error: {
      code: statusCode,
      message: message,
    },
  });
};

