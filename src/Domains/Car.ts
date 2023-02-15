import ICar from '../Interfaces/ICar';
import AbstractVehicle from './AbstractVehicle';

export default class Car extends AbstractVehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    super(car);
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }

  public setDoorsQty(doorsQty: number) {
    this.doorsQty = doorsQty;
  }
  public getDoorsQty() {
    return this.doorsQty;
  }

  public setseatsQty(seatsQty: number) {
    this.seatsQty = seatsQty;
  }
  public getseatsQty() {
    return this.seatsQty;
  }
}