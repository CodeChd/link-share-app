import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncHandlerType = <T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
) => RequestHandler;

const asyncHandler: AsyncHandlerType = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((e) => next(e));
  };
};

export default asyncHandler;
