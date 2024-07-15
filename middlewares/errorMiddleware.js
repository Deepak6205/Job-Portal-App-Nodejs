// error middleware || middleware is nothing but NEXT function

const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultErrors = {
    statusCode: 500,
    message: err,
  };
  // missing field error
  if (err.name === "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  res.status(defaultErrors.statusCode).json({message: defaultErrors.message})
};
export default errorMiddleware;
