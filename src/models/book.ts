import {IHotel, IRoom} from '.';

export interface IBook {
  hotel: IHotel;
  room: IRoom;
  price: number;
  check_in_date: Date | null;
  check_out_date: Date | null;
  night_numbers: number;
}
