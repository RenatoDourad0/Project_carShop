import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.get(
  '/:id',
  (req, res, next) => new CarController(req, res, next).listById(),
);

carRoutes.get(
  '/',
  (req, res, next) => new CarController(req, res, next).listAll(),
);

carRoutes.post(
  '/',
  (req, res, next) => new CarController(req, res, next).create(),
);

carRoutes.put(
  '/:id',
  (req, res, next) => new CarController(req, res, next).updateById(),
);

carRoutes.delete(
  '/:id',
  (req, res, next) => new CarController(req, res, next).deleteById(),
);

export default carRoutes;