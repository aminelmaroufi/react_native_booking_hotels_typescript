import {IRoom} from '.';

export interface IHotel {
  _id: string;
  name: string;
  short_address: string;
  address: string;
  rating: number;
  location: string;
  type: string;
  main_picture: string;
  second_picture: string;
  rooms: Array<IRoom>;
}
