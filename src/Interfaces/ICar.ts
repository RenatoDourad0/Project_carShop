import IVehicle from './Ivehicle';

export default interface ICar extends IVehicle {
  doorsQty: number,
  seatsQty: number,
}