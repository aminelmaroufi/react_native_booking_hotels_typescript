export interface ICard {
  name: string;
  number: string;
  expire_date: string;
  cvc: string;
}

export interface ISecureCard {
  id: string;
  number: string;
  brand: string;
}

export const emptyCard: ICard = {
  name: '',
  number: '',
  expire_date: '',
  cvc: '',
};

export const emptySecureCard: ISecureCard = {
  id: '',
  number: '',
  brand: '',
};
