import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const errorHandler: ErrorRequestHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {
  return res.status(500).send(error?.message || 'Something went wrong.')
}

