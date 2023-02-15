import IVehicle from './IVehicle.ts';

export default interface ICar extends IVehicle {
  doorsQty: number,
  seatsQty: number,
}