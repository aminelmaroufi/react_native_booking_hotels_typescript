import {IHotel, IRoom} from '.';

export interface IBook {
  hotel: IHotel;
  room: IRoom;
  price: number;
  check_in_date: Date;
  check_out_date: Date;
  night_numbers: number;
}
