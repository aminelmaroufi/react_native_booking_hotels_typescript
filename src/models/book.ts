import {ISecureCard, IHotel, IRoom} from '.';

export interface IBook {
  _id: string;
  hotel: IHotel;
  room: IRoom;
  price: number;
  check_in_date: Date | null;
  check_out_date: Date | null;
  night_numbers: number;
  card: ISecureCard;
}
