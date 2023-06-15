import {device, element, expect, by} from 'detox';

describe('Home Page', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display home page', async () => {
    await expect(element(by.id('Home'))).toBeVisible();
    await expect(element(by.id('@search-box/input'))).toBeVisible();
    await expect(element(by.id('hotels-list'))).toBeVisible();
  });

  it('should allow entering search criteria', async () => {
    const searchBox = element(by.id('@search-box/input'));
    await searchBox.tap();
    await searchBox.typeText('New York');
    await expect(searchBox).toHaveText('New York');
  });

  it('should display search results based on the search criteria', async () => {
    const searchBox = element(by.id('@search-box/input'));
    await searchBox.tap();
    await searchBox.typeText('Paris');
    await expect(element(by.text('Paris'))).toBeVisible();
  });

  it('should load more items when scrolling to the bottom', async () => {
    const flatList = element(by.id('hotels-list'));

    await expect(element(by.id('item0'))).toBeVisible();
    await flatList.scrollTo('bottom');

    await expect(element(by.id('item10'))).toExist();
  });

  it('should navigate to hotel details after taping in the first hotels item', async () => {
    const flatList = await element(by.id('hotels-list'));
    const firstElement = await flatList.atIndex(0);

    await expect(firstElement).toBeVisible();
    await firstElement.tap();
    await expect(element(by.id('hotelDetails'))).toBeVisible();
  });
});
