function AppError(name, statusCode, description, isOperational) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.name = name;
  this.statusCode = statusCode;
  this.description = description;
  this.isOperational = isOperational;
}

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

function errorHandler(error, req, res, next) {
  const name = error.name ?? "Internal Server Error";
  const statusCode = error.statusCode ?? 500;
  const description = error.description ?? "Something went wrong";
  const isOperational = error.isOperational ?? false;

  return res.status(statusCode).json({
    name,
    statusCode,
    description,
    isOperational,
  });
}

module.exports = {
  errorHandler,
  AppError,
};
