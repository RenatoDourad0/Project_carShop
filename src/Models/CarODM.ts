import { Schema } from 'mongoose';
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

  public async findByValue(value: string): Promise<ICar | null> {
    return this.model.findOne({ value });
  }

  public async FindAll(): Promise<ICar[] | []> {
    return this.model.find({});
  }

  public async findById(id: string): Promise<ICar | null> {
    return this.model.findById(id);
  }
}

export default CarODM;