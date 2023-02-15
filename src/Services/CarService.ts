import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';
import CarODM from '../Models/CarODM';

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
      throw new Error('missing required properties');
    }
  }
}