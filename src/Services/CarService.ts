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
    return cars.map((e) => this.createCarDomain(e));
  }

  public async listById(id: string) {
    const model = new CarODM();
    model.validateId(id);   
    const car = await model.validateExists(id);
    return this.createCarDomain(car);
  }

  public async updateById(id: string, car: ICar) {
    const model = new CarODM();
    model.validateId(id);
    await model.validateExists(id);
    const updatedCar = await model.update(id, { ...car });
    return this.createCarDomain(updatedCar);
  }

  public async deleteById(id: string) {
    const model = new CarODM();
    model.validateId(id);
    await model.validateExists(id);
    model.delete(id);
  }
}