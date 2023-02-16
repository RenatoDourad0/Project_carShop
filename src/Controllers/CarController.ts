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

  public async listAll() {
    try {
      const cars = await this.service.listAll();
      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async listById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.listById(String(id));
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateById() {
    const { id } = this.req.params;
    const {
      model, year, color, status, buyValue, doorsQty, seatsQty,
    } = this.req.body;

    try {
      const car = await this.service
        .updateById(id, { model, year, color, status, buyValue, doorsQty, seatsQty });
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteById() {
    const { id } = this.req.params;
    try {
      await this.service.deleteById(id);
      this.res.status(200).end();
    } catch (error) {
      this.next(error);
    }
  }
}