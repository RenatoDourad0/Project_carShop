import { NextFunction, Request, Response } from 'express';
import Iexception from '../Interfaces/IException';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const {
      id, model, year, color, status, buyValue, category, engineCapacity,
    } = this.req.body;

    try {
      const mewMoto = await this.service
        .create({ id, model, year, color, status, buyValue, category, engineCapacity });
      return this.res.status(201).json(mewMoto);
    } catch (error) {
      this.next(error);
    }
  }

  public async listAll() {
    try {
      const motos = await this.service.listAll();
      return this.res.status(200).json(motos);
    } catch (error) {
      this.next(error);
    }
  }

  public async listById() {
    const { id } = this.req.params;
    try {
      const moto = await this.service.listById(id);
      return this.res.status(200).json(moto);
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
      model, year, color, status, buyValue, category, engineCapacity,
    } = this.req.body;

    try {
      const moto = await this.service
        .updateById(id, { model, year, color, status, buyValue, category, engineCapacity });
      return this.res.status(200).json(moto);
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