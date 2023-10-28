import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Not found!");
  res.status(404);
  next(err);
};

interface CustomError extends Error {
  kind?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found!";
  }

  res.status(statusCode).json({
    message,
    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : "Something went wrong!",
  });
};
