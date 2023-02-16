import { expect } from 'chai';
import sinon from 'sinon';
import { Model, Mongoose } from 'mongoose';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import NotFoundError from '../../../src/Exceptions/NotFoundError';
import UnauthorizedError from '../../../src/Exceptions/UnauthorizedError';

describe('Testa se no serviço Cars', function () {
  describe('um novo Car', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('é criado com sucesso', async function () {
      const input: ICar = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };
      const output: Car = new Car({
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      });
  
      sinon.stub(Model, 'create').resolves(output);
  
      const service = new CarService();
      const newCar = await service.create(input);
      expect(newCar).to.be.deep.equal(output);
    });
  
    it('lança exessão ao passar input inválido', async function () {
      // sem propriedade year
      const input = {
        model: 'Marea',
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      } as any as ICar;
  
      try {
        const service = new CarService();
        await service.create(input);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Missing required properties');
      }
    });
  });

  describe('é possivel listar cars', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('com  sucesso', async function () {
      const input = [{
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      }];
      const output: Car[] = [new Car({
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      })];
  
      sinon.stub(Model, 'find').resolves(input);
  
      const service = new CarService();
      const cars = await service.listAll();
      expect(cars).to.be.deep.equal(output);
    });
  
    it('por id com sucesso', async function () {
      const input: ICar = {
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };
      const output: Car = new Car({
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      });
  
      sinon.stub(Model, 'findById').resolves(input);
  
      const service = new CarService();
      const cars = await service.listById('6348513f34c397abcad040b2');
      expect(cars).to.be.deep.equal(output);
    });

    it('lança exessão ao passar um id inexistente', async function () {
      const output = null;
  
      sinon.stub(Model, 'findOne').resolves(output);
  
      try {
        const service = new CarService();
        await service.listById('6348513f34c397abcad040b2');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Car not found');
      }
    });
  
    it('lança exessão ao passar um id inválido', async function () {
      const mongoose = new Mongoose();
      sinon.stub(mongoose, 'isValidObjectId').resolves(false);
  
      try {
        const service = new CarService();
        await service.listById('6348513f34c397abcad04***');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });
  });

  describe('atualizar Cars por id', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('com sucesso', async function () {
      const id = '6348513f34c397abcad040b2';
      const input: ICar = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };

      const mongoose = new Mongoose();
      sinon.stub(mongoose, 'isValidObjectId').resolves(true);
      sinon.stub(Model, 'findOne').resolves(true);
      sinon.stub(Model, 'findByIdAndUpdate').resolves({ id, ...input });

      const service = new CarService();
      const updated = await service.updateById(id, input);
      expect(updated).to.be.deep.equal(new Car({ id, ...input }));
    });

    it('lança exessão caso id inválido', async function () {
      const id = '6348513f34c397abcad04***';
      const input = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };

      const mongoose = new Mongoose();
      sinon.stub(mongoose, 'isValidObjectId').resolves(false);

      try {
        const service = new CarService();
        await service.updateById(id, input);
      } catch (error) {
        expect((error as UnauthorizedError).message).to.equal('Invalid mongo id');
        expect((error as UnauthorizedError).status).to.equal(422);
      }
    });

    it('lança exessão caso id inexistente', async function () {
      const id = '6348513f34c397abcad040b2';
      const input: ICar = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };

      const mongoose = new Mongoose();
      sinon.stub(mongoose, 'isValidObjectId').resolves(true);
      sinon.stub(Model, 'findOne').resolves(undefined);

      try {
        const service = new CarService();
        await service.updateById(id, input);
      } catch (error) {
        expect((error as NotFoundError).message).to.equal('Car not found');
        expect((error as NotFoundError).status).to.equal(404);
      }
    });
  });

  describe('deleta Cars por id', function () {
    it('com sucesso', async function () {
      const id = '6348513f34c397abcad040b2';

      const mongoose = new Mongoose();
      sinon.stub(mongoose, 'isValidObjectId').resolves(true);
      sinon.stub(Model, 'deleteOne')
        .resolves({ deletedCount: 1 } as any);

      try {
        const service = new CarService();
        await service.deleteById(id);
      } catch (error) {
        expect(error).to.be.equal(undefined);
      }
    });
  });
});