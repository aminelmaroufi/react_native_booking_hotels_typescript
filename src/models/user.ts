import {ISecureCard, emptySecureCard} from './card';

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  fullname: string;
  phone: string;
  email: string;
  password: string;
  cards: Array<ISecureCard>;
}

export const emptyUser: IUser = {
  _id: '',
  firstname: '',
  lastname: '',
  fullname: '',
  phone: '',
  email: '',
  password: '',
  cards: [emptySecureCard],
};
