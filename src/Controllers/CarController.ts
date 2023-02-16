import { NextFunction, Request, Response } from 'express';
import Iexception from '../Interfaces/IException';
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
      const car = await this.service.listById(id);
      return this.res.status(200).json(car);
    } catch (error) {
      switch ((error as Iexception).status) {
        case 404:
          return this.res.status(404).json({ message: (error as Iexception).message });
        case 422:
          return this.res.status(422).json({ message: (error as Iexception).message });
        default:
          this.next(error);
      }
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
      switch ((error as Iexception).status) {
        case 404:
          return this.res.status(404).json({ message: (error as Iexception).message });
        case 422:
          return this.res.status(422).json({ message: (error as Iexception).message });
        default:
          this.next(error);
      }
    }
  }
}