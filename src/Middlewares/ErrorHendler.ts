import { NextFunction, Request, Response } from 'express';
import Iexception from '../Interfaces/IException';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    switch (((error as any) as Iexception).status) {
      case 404:
        return res.status(404).json({ message: ((error as any) as Iexception).message });
      case 422:
        return res.status(422).json({ message: ((error as any) as Iexception).message });
      default:
        res.status(500).json({ message: error.message });
    }
    next();
  }
}

export default ErrorHandler;