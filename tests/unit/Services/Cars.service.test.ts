import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('testes do serviço cars', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('cria um novo car com sucesso', async function () {
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

  it('lança exessão ao tentar criar um car inválido', async function () {
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
      expect((error as Error).message).to.be.equal('missing required properties');
    }
  });
});