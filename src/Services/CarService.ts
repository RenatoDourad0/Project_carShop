import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';
import CarODM from '../Models/CarODM';
import UnauthorizedError from '../Exceptions/UnauthorizedError';
import NotFoundError from '../Exceptions/NotFoundError';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    try {
      const model = new CarODM();
      const newCar = await model.create(car);
      return this.createCarDomain(newCar);
    } catch (error) {
      throw new UnauthorizedError('Missing required properties');
    }
  }

  public async listAll() {
    const model = new CarODM();
    const cars = await model.FindAll();
    if (cars.length === 0 || !cars) throw new NotFoundError('No cars registered');
    const typedCars = cars.map((e) => this.createCarDomain(e));
    return typedCars;
  }

  public async listById(id: string) {
    const validId = isValidObjectId(id);
    if (!validId) throw new UnauthorizedError('Invalid mongo id');
    const model = new CarODM();
    const car = await model.findById(id);
    if (!car) throw new NotFoundError('Car not found');
    return this.createCarDomain(car);
  }
}