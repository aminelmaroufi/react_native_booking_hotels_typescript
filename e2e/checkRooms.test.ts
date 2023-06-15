import {device, element, expect, by} from 'detox';
import {selectHotel, selectDates, clickSelectRoomButton} from './helpers';

describe('Hotel details page', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await selectHotel();
    await selectDates();
    await clickSelectRoomButton();
  });

  it('should display rooms page', async () => {
    await expect(element(by.id('checkRooms'))).toBeVisible();
    await expect(element(by.id('roomList'))).toBeVisible();
  });

  it('should display the suggested room details', async () => {
    const roomList = await element(by.id('roomList'));
    // Get the first element of the FlatList
    const firstRoom = roomList.atIndex(0);

    await expect(firstRoom).toBeVisible();
  });

  it('should navigate to create account page after choosing a room', async () => {
    const selectButton = element(by.id('item0-selectBtn'));
    await expect(selectButton).toBeVisible();
    await selectButton.tap();
    await expect(element(by.id('accountView'))).toBeVisible();
  });
});
