class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const notFound = (req, res, next) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
};

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID';
  } else if (err.code === 11000) {
    statusCode = 409;
    message = 'SKU already exists';
  } else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({ message });
};

module.exports = { AppError, notFound, errorHandler };
