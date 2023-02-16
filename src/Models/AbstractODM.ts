import {
  Model,
  models,
  Schema,
  UpdateQuery,
  model,
  isValidObjectId,
} from 'mongoose';
import UnauthorizedError from '../Exceptions/UnauthorizedError';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public validateId(id: string) {
    try {
      const isValid = isValidObjectId(id);
      if (!isValid) throw new UnauthorizedError('Invalid mongo id');
    } catch (error) {
      throw new UnauthorizedError('Invalid mongo id');
    }
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async findByValue(value: string): Promise<T | null> {
    return this.model.findOne({ value });
  }

  public async FindAll(): Promise<T[] | []> {
    return this.model.find({});
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }
}

export default AbstractODM;