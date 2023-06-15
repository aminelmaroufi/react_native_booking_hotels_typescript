import {device, element, expect, by} from 'detox';
import moment from 'moment';
import {selectHotel} from './helpers';

describe('Hotel details page', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await selectHotel();
  });

  it('Should display hotel details page', async () => {
    await expect(element(by.id('hotelDetails'))).toBeVisible();
    await expect(element(by.id('mainImage'))).toBeVisible();
    await expect(element(by.id('hotelName'))).toBeVisible();
    await expect(element(by.id('hotelComponent'))).toBeVisible();

    await expect(element(by.id('hotelAddress'))).toBeVisible();
    await expect(element(by.id('hotelLocation'))).toBeVisible();

    await expect(element(by.id('checkInDateComponent'))).toBeVisible();
    await expect(element(by.id('checkOutDateComponent'))).toBeVisible();
    //scroll to bottom
    await element(by.id('hotelDetails')).scrollTo('bottom');

    await expect(element(by.id('hotelReviews'))).toBeVisible();
    await expect(element(by.id('selectRoomBtn'))).toBeVisible();
  });

  it('should display Alert if the user tried to click select room button withount choosing the check-in and check-out date', async () => {
    //scroll to bottom
    await element(by.id('hotelDetails')).scrollTo('bottom');
    await element(by.id('selectRoomBtn')).tap();
    await expect(element(by.text('Reservation Date'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('should navigate to check room page after choosing a valid check-in and cgeck-out date', async () => {
    await element(by.id('checkInDateComponent')).tap();
    let date = moment();
    date.add(2, 'days');
    const checkInDay = parseInt(date.format('D'), 10);
    await element(by.text(`${checkInDay}`)).tap();

    const checkInDate = moment(date).format('DD/MM/YYYY');
    await expect(element(by.text(checkInDate))).toBeVisible();

    await element(by.id('checkOutDateComponent')).tap();
    date.add(2, 'days');
    const checkOutDay = parseInt(date.format('D'), 10);
    await element(by.text(`${checkOutDay}`)).tap();

    const checkOutDate = moment(date).format('DD/MM/YYYY');
    await expect(element(by.text(checkOutDate))).toBeVisible();
    await expect(element(by.id('hotelPrice'))).toBeVisible();

    //Scroll to selec Room button
    await element(by.id('hotelDetails')).scrollTo('bottom');
    await element(by.id('selectRoomBtn')).tap();
    await expect(element(by.id('checkRooms'))).toBeVisible();
  });
});
