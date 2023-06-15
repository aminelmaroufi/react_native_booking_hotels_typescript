import {by, element} from 'detox';
import moment from 'moment';

export const selectHotel = async () => {
  const firstElement = element(by.id('item0'));

  await firstElement.tap();
};

export const selectDates = async () => {
  await element(by.id('checkInDateComponent')).tap();
  let date = moment();
  date.add(2, 'days');
  const checkInDay = parseInt(date.format('D'), 10);
  await element(by.text(`${checkInDay}`)).tap();

  await element(by.id('checkOutDateComponent')).tap();
  date.add(2, 'days');
  const checkOutDay = parseInt(date.format('D'), 10);
  await element(by.text(`${checkOutDay}`)).tap();
};

export const clickSelectRoomButton = async () => {
  await element(by.id('hotelDetails')).scrollTo('bottom');
  await element(by.id('selectRoomBtn')).tap();
};

export const clickSelectRoom = async () => {
  await element(by.id('item0-selectBtn')).tap();
};

export const getRandomEmail = () => {
  const randomString = Math.random().toString(36).substring(2, 10);
  const emailDomain = 'example.com';
  return `${randomString}@${emailDomain}`;
};
