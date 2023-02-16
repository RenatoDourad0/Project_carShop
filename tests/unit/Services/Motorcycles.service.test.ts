import { expect } from 'chai';
import sinon from 'sinon';
import { Model, Mongoose } from 'mongoose';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import NotFoundError from '../../../src/Exceptions/NotFoundError';
import UnauthorizedError from '../../../src/Exceptions/UnauthorizedError';

const motorcycleModel = 'Honda Cb 600f Hornet';

describe('Testa se no serviço Motorcycles', function () {
  describe('uma nova Motorcycle', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('é criada com sucesso', async function () {
      const input: IMotorcycle = {
        model: motorcycleModel,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
      const output: Motorcycle = new Motorcycle({
        id: '6348513f34c397abcad040b2',
        model: motorcycleModel,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      });
  
      sinon.stub(Model, 'create').resolves(output);
  
      const service = new MotorcycleService();
      const newMoto = await service.create(input);
      expect(newMoto).to.be.deep.equal(output);
    });
  
    it('lança exessão ao passar input inválido', async function () {
      // sem propriedade year
      const input = {
        model: 'Honda Cb 600f Hornet',
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      } as any as IMotorcycle;
  
      try {
        const service = new MotorcycleService();
        await service.create(input);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Missing required properties');
      }
    });
  });

  describe('é possivel listar motorcycles', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('com sucesso', async function () {
      const input: IMotorcycle[] = [{
        id: '6348513f34c397abcad040b2',
        model: motorcycleModel,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      }];
      const output: Motorcycle[] = [new Motorcycle({
        id: '6348513f34c397abcad040b2',
        model: motorcycleModel,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      })];
  
      sinon.stub(Model, 'find').resolves(input);
  
      const service = new MotorcycleService();
      const motos = await service.listAll();
      expect(motos).to.be.deep.equal(output);
    });
  
    it('por id com sucesso', async function () {
      const input: IMotorcycle = {
        id: '6348513f34c397abcad040b2',
        model: motorcycleModel,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
      const output: Motorcycle = new Motorcycle({
        id: '6348513f34c397abcad040b2',
        model: motorcycleModel,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      });
  
      sinon.stub(Model, 'findById').resolves(input);
  
      const service = new MotorcycleService();
      const moto = await service.listById('6348513f34c397abcad040b2');
      expect(moto).to.be.deep.equal(output);
    });

    it('lança exessão ao passar um id inexistente', async function () {
      const output = null;
  
      sinon.stub(Model, 'findOne').resolves(output);
  
      try {
        const service = new MotorcycleService();
        await service.listById('6348513f34c397abcad040b2');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Motorcycle not found');
      }
    });
  
    it('lança exessão ao passar um id inválido', async function () {
      const mongoose = new Mongoose();
      sinon.stub(mongoose, 'isValidObjectId').resolves(false);
  
      try {
        const service = new MotorcycleService();
        await service.listById('6348513f34c397abcad04***');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });
  });

  describe('atualizar Motorcycles por id', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('com sucesso', async function () {
      const id = '6348513f34c397abcad040b2';
      const input: IMotorcycle = {
        id: '6348513f34c397abcad040b2',
        model: motorcycleModel,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      const mongoose = new Mongoose();
      sinon.stub(mongoose, 'isValidObjectId').resolves(true);
      sinon.stub(Model, 'findOne').resolves(true);
      sinon.stub(Model, 'findByIdAndUpdate').resolves({ id, ...input });

      const service = new MotorcycleService();
      const updated = await service.updateById(id, input);
      expect(updated).to.be.deep.equal(new Motorcycle({ id, ...input }));
    });

    it('lança exessão caso id inválido', async function () {
      const id = '6348513f34c397abcad04***';
      const input = {
        id: '6348513f34c397abcad040b2',
        model: motorcycleModel,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      const mongoose = new Mongoose();
      sinon.stub(mongoose, 'isValidObjectId').resolves(false);

      try {
        const service = new MotorcycleService();
        await service.updateById(id, input);
      } catch (error) {
        expect((error as UnauthorizedError).message).to.equal('Invalid mongo id');
        expect((error as UnauthorizedError).status).to.equal(422);
      }
    });

    it('lança exessão caso id inexistente', async function () {
      const id = '6348513f34c397abcad040b2';
      const input: IMotorcycle = {
        id: '6348513f34c397abcad040b2',
        model: motorcycleModel,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      const mongoose = new Mongoose();
      sinon.stub(mongoose, 'isValidObjectId').resolves(true);
      sinon.stub(Model, 'findOne').resolves(undefined);

      try {
        const service = new MotorcycleService();
        await service.updateById(id, input);
      } catch (error) {
        expect((error as NotFoundError).message).to.equal('Motorcycle not found');
        expect((error as NotFoundError).status).to.equal(404);
      }
    });
  });
});