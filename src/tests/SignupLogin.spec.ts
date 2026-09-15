import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { URLS } from '../data/Urls';
import SignupLoginPage  from '../pages/SignupLoginPage';
import SignupPage from '../pages/SignupPage';
import { Users } from '../data/Users';
import HomePage from '../pages/HomePage';
import AccountCreatedPage from '../pages/AccountCreatedPage';

test('Signup user with valid data', async ({ page }) => {
  await page.goto(URLS.LOGIN);
  const signupLoginPage = new SignupLoginPage(page);
  await signupLoginPage.fillSignupName(faker.person.firstName());
  await signupLoginPage.fillSignupEmail(faker.internet.email());
  await signupLoginPage.clickSignupButton();
  await expect(page).toHaveURL(URLS.SIGNUP);

  const signupPage = new SignupPage(page);
  await signupPage.fillPassword(faker.internet.password());
  await signupPage.selectDayBirth('1');
  await signupPage.selectMonthBirth('January');
  await signupPage.selectYearBirth('1990');
  await signupPage.fillFirstName(faker.person.firstName());
  await signupPage.fillLastName(faker.person.lastName());
  await signupPage.fillAddress1(faker.location.streetAddress());
  await signupPage.selectCountry('United States');
  await signupPage.fillState(faker.location.state());
  await signupPage.fillCity(faker.location.city());
  await signupPage.fillZipcode(faker.location.zipCode());
  await signupPage.fillMobileNumber(faker.phone.number());
  await signupPage.clickCreateAccountButton();
  await expect(page).toHaveURL(URLS.ACCOUNT_CREATED);
});

test('Login User with correct email and password', async ({ page }) => {
  await page.goto(URLS.LOGIN);
  const signupLoginPage = new SignupLoginPage(page);
  const user = Users.validUser;

  await signupLoginPage.fillLoginEmail(user.email);
  await signupLoginPage.fillLoginPassword(user.password);
  await signupLoginPage.clickLoginButton();
  await expect(page).toHaveURL(URLS.HOME);
  const homePage = new HomePage(page);
  await homePage.waitLogoutTextVisible();
});

test('Login User with incorrect email and password', async ({ page }) => {
  await page.goto(URLS.LOGIN);
  const signupLoginPage = new SignupLoginPage(page);

  await signupLoginPage.fillLoginEmail(faker.internet.email());
  await signupLoginPage.fillLoginPassword(faker.internet.password());
  await signupLoginPage.clickLoginButton();
  await expect(page).toHaveURL(URLS.LOGIN);
  await signupLoginPage.waitForErrorMessage();
});

test('Register User with existing email', async ({ page }) => {
  await page.goto(URLS.LOGIN);
  const signupLoginPage = new SignupLoginPage(page);
  const user = Users.validUser;

  await signupLoginPage.fillSignupName(faker.person.firstName());
  await signupLoginPage.fillSignupEmail(user.email);
  await signupLoginPage.clickSignupButton();
  await expect(page).toHaveURL(URLS.SIGNUP);
  await signupLoginPage.waitForExistingUserErrorMessage();
});

test('Delete User Account', async ({ page }) => {
  await page.goto(URLS.LOGIN);
  const signupLoginPage = new SignupLoginPage(page);
  await signupLoginPage.fillSignupName(faker.person.firstName());
  await signupLoginPage.fillSignupEmail(faker.internet.email());
  await signupLoginPage.clickSignupButton();
  await expect(page).toHaveURL(URLS.SIGNUP);

  const signupPage = new SignupPage(page);
  await signupPage.fillPassword(faker.internet.password());
  await signupPage.selectDayBirth('1');
  await signupPage.selectMonthBirth('January');
  await signupPage.selectYearBirth('1990');
  await signupPage.fillFirstName(faker.person.firstName());
  await signupPage.fillLastName(faker.person.lastName());
  await signupPage.fillAddress1(faker.location.streetAddress());
  await signupPage.selectCountry('United States');
  await signupPage.fillState(faker.location.state());
  await signupPage.fillCity(faker.location.city());
  await signupPage.fillZipcode(faker.location.zipCode());
  await signupPage.fillMobileNumber(faker.phone.number());
  await signupPage.clickCreateAccountButton();
  await expect(page).toHaveURL(URLS.ACCOUNT_CREATED);
  const accountCreatedPage = new AccountCreatedPage(page);
  await accountCreatedPage.clickContinueButton();
  await expect(page).toHaveURL(URLS.HOME);
  const homePage = new HomePage(page);
  await homePage.clickDeleteAccountButton();
  await expect(page).toHaveURL(URLS.ACCOUNT_DELETED);
});