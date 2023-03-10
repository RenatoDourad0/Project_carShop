import { Schema } from 'mongoose';
import NotFoundError from '../Exceptions/NotFoundError';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> { 
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
      status: { type: Boolean, required: false, default: false },
    });
    super(schema, 'Car');
  }

  public async validateExists(id: string) {
    const element = await this.model.findById(id);
    if (!element) throw new NotFoundError('Car not found');
    return element;
  }
}

export default CarODM;