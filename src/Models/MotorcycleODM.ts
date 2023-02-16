import { Schema } from 'mongoose';
import NotFoundError from '../Exceptions/NotFoundError';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

class MotorcycleODM extends AbstractODM<IMotorcycle> { 
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
      status: { type: Boolean, required: false, default: false },
    });
    super(schema, 'Motorcycle');
  }

  public async validateExists(id: string) {
    const element = await this.model.findById(id);
    if (!element) throw new NotFoundError('Motorcycle not found');
    return element;
  }
}

export default MotorcycleODM;