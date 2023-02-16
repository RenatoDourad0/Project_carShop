import express, { NextFunction, Request, Response } from 'express';
import ErrorHandler from './Middlewares/ErrorHendler';
import carRoutes from './Routes/CarRoute';
import motorcycleRoutes from './Routes/MotorcycleRoute';

const app = express();
app.use(express.json());
app.use('/cars', carRoutes);
app.use('/motorcycles', motorcycleRoutes);

app.use((
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => ErrorHandler.handle(err, req, res, next));

export default app;
