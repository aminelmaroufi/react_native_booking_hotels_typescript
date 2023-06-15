import {device, element, expect, by} from 'detox';
import {
  selectHotel,
  selectDates,
  clickSelectRoomButton,
  clickSelectRoom,
  getRandomEmail,
} from './helpers';

describe('Create Account page', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await selectHotel();
    await selectDates();
    await clickSelectRoomButton();
    await clickSelectRoom();
  });

  it('should display create account page and all its elements', async () => {
    await device.pressBack();
    await expect(element(by.id('accountView'))).toBeVisible();
    await expect(element(by.id('@firstname/input'))).toBeVisible();
    await expect(element(by.id('@lastname/input'))).toBeVisible();
    await expect(element(by.id('@email/input'))).toBeVisible();
    await expect(element(by.id('@password/input'))).toBeVisible();
    await expect(element(by.id('@phone/input'))).toBeVisible();

    // await element(by.id('@phone/input')).atIndex(0).tap({x: 5, y: 5});
    await expect(element(by.id('nextStepBtn'))).toBeVisible();
    await expect(element(by.id('loginBtn'))).toBeVisible();
  });

  it("should navigate to login page after clicking 'already have an account' link", async () => {
    // Tap outside of any active input fields to hide the keyboard
    // await element(by.id('@phone/input')).atIndex(0).tap({x: 5, y: 5});
    await device.pressBack();
    const loginBtn = element(by.id('loginBtn'));
    await expect(loginBtn).toBeVisible();
    await loginBtn.tap();
    await expect(element(by.id('Login'))).toBeVisible();
  });

  it('should create account successfully and navigate to next step page', async () => {
    await element(by.id('@firstname/input')).typeText('Test FN');
    await element(by.id('@lastname/input')).typeText('Test LN');
    await element(by.id('@email/input')).typeText(getRandomEmail());
    const passwordInput = element(by.id('@password/input'));
    await passwordInput.typeText('Azerty123@@');
    await passwordInput.tapReturnKey();

    const phoneInput = element(by.id('@phone/input'));

    await phoneInput.typeText('0654566545');
    await phoneInput.tapReturnKey();

    // await element(by.id('nextStepBtn')).tap();
    await waitFor(element(by.id('dropdownAlert')))
      .toBeVisible()
      .withTimeout(10000);

    await waitFor(element(by.id('Login')))
      .toBeVisible()
      .withTimeout(12000);
  });
});
