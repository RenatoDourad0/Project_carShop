import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRoutes = Router();

motorcycleRoutes.get(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).listById(),
);

motorcycleRoutes.get(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).listAll(),
);

motorcycleRoutes.post(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

motorcycleRoutes.put(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).updateById(),
);

motorcycleRoutes.delete(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).deleteById(),
);

export default motorcycleRoutes;