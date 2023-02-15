import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const {
      id, model, year, color, status, buyValue, doorsQty, seatsQty,
    } = this.req.body;

    try {
      const newCar = await this.service
        .create({ id, model, year, color, status, buyValue, doorsQty, seatsQty });
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }
}