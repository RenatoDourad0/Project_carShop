import IMotorcycle from '../Interfaces/IMotorcycle';
import Motorcycle from '../Domains/Motorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import UnauthorizedError from '../Exceptions/UnauthorizedError';
import NotFoundError from '../Exceptions/NotFoundError';

export default class MotorcycleService {
  private createMotorcycleDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle(moto);
    }
    return null;
  }

  public async create(car: IMotorcycle) {
    try {
      const model = new MotorcycleODM();
      const mewMoto = await model.create(car);
      return this.createMotorcycleDomain(mewMoto);
    } catch (error) {
      throw new UnauthorizedError('Missing required properties');
    }
  }

  public async listAll() {
    const model = new MotorcycleODM();
    const motos = await model.FindAll();
    if (motos.length === 0 || !motos) throw new NotFoundError('No motorcycles registered');
    return motos.map((e) => this.createMotorcycleDomain(e));
  }

  public async listById(id: string) {
    const model = new MotorcycleODM();
    model.validateId(id);
    const moto = await model.validateExists(id);
    return this.createMotorcycleDomain(moto);
  }

  public async updateById(id: string, moto: IMotorcycle) {
    const model = new MotorcycleODM();
    model.validateId(id);
    await model.validateExists(id);
    const updatedCar = await model.update(id, { ...moto });
    return this.createMotorcycleDomain(updatedCar);
  }

  public async deleteById(id: string) {
    const model = new MotorcycleODM();
    model.validateId(id);
    await model.validateExists(id);
    return model.delete(id);
  }
}