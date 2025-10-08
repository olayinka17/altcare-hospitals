import { CustomError } from "../utils/CustomError.js";
import "dotenv/config";

const handleDuplicateDb = (err) => {
  const field = err.meta.target.join(", ");
  return new CustomError(`Duplicate value for ${field}`, 409);
};

const handleforeignkeyError = (err) => {
  const field = err.meta.field_name;
  return new CustomError(`Invalid ${field} `);
};

const sendDevError = (err, req, res) => {
    console.log(err)
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err,
    stack: err.stack,
  });
};

const sendProdError = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error(err)
  return res.status(500).json({
    status: "error",
    message: "something went wrong",
  });
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.create(err);
    if (error.code === "P2002") error = handleDuplicateDb(error);
    if (error.code === "P2003") error = handleforeignkeyError(error);
    sendProdError(error, req, res);
  }
};
