import { test, expect } from '@playwright/test';
import { URLS } from '../data/Urls';
import ProductsPage from '../pages/ProductsPage';
import ProductPage from '../pages/ProductPage';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import SignupLoginPage from '../pages/SignupLoginPage';
import { faker } from '@faker-js/faker';
import SignupPage from '../pages/SignupPage';
import CheckoutPage from '../pages/CheckoutPage';
import PaymentPage from '../pages/PaymentPage';
import ApiClient from '../api/actions/apiClient';
import AccountCreatedPage from '../pages/AccountCreatedPage';
import { HomeElements } from '../pages/HomeElements';
import { PaymentDoneElements } from '../pages/PaymentDoneElements';

test('Add Products in Cart', async ({ page }) => {
    await page.goto(URLS.PRODUCTS);
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartAndContinue(2);
    await productsPage.addToCartAndContinue(2);

    const homePage = new HomePage(page);
    await homePage.clickCartButton();
    await expect(page).toHaveURL(URLS.CART);
    
    const cartPage = new CartPage(page);
    await expect(cartPage.cartProducts).toHaveCount(1);
    await expect(cartPage.productDescription).toHaveText('Men Tshirt\nMen > Tshirts');
    await expect(cartPage.productPrice).toHaveText('Rs. 400');
    await expect(cartPage.productQuantity).toHaveText('2');
    await expect(cartPage.productTotal).toHaveText('Rs. 800');
});

test('Verify Product Quantity in Cart', async ({ page }) => {
    await page.goto(URLS.FIRST_PRODUCT);
    const productPage = new ProductPage(page);
    await productPage.fillQuantityInput('4');
    await productPage.clickAddToCartButton();
    await productPage.clickContinueShoppingButton();

    const homePage = new HomePage(page);
    await homePage.clickCartButton();
    await expect(page).toHaveURL(URLS.CART);
    
    const cartPage = new CartPage(page);
    await expect(cartPage.productQuantity).toHaveText('4');
});

test('Register while Checkout and check Card', async ({ request, page }) => {
    await page.goto(URLS.FIRST_PRODUCT);
    const productPage = new ProductPage(page);
    await productPage.clickAddToCartButton();
    await productPage.clickContinueShoppingButton();
    
    const homePage = new HomePage(page);
    await homePage.clickCartButton();
    await expect(page).toHaveURL(URLS.CART);
    
    const cartPage = new CartPage(page);
    await cartPage.clickProceedToCheckoutButton();
    await cartPage.clickRegisterLoginButton();
    await expect(page).toHaveURL(URLS.LOGIN);
    
    const signupLoginPage = new SignupLoginPage(page);
    const email = faker.internet.email();
    const password = faker.internet.password();
    await signupLoginPage.fillSignupName(faker.person.firstName());
    await signupLoginPage.fillSignupEmail(email);
    await signupLoginPage.clickSignupButton();
    await expect(page).toHaveURL(URLS.SIGNUP);

    const signupPage = new SignupPage(page);
    await signupPage.fillPassword(password);
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
    const homeElements = new HomeElements(page);
    await expect(homeElements.logoutAccountButton).toBeVisible();
    await expect(homeElements.deleteAccountButton).toBeVisible();
    await expect(page).toHaveURL(URLS.HOME);
    await homePage.clickCartButton();
    await expect(page).toHaveURL(URLS.CART);
    await expect(cartPage.cartProducts).toHaveCount(1);
    await expect(cartPage.productPrice).toHaveText('Rs. 500');
    await expect(cartPage.productQuantity).toHaveText('1');
    await expect(cartPage.productTotal).toHaveText('Rs. 500');

    const apiClient = new ApiClient(request);
    await apiClient.loginUserAccount(email, password);
    const token = await apiClient.getToken();
    await apiClient.deleteUserAccount(token);
});

test('Remove Products From Cart', async ({ page }) => {
    await page.goto(URLS.PRODUCTS);
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartAndViewCart(2);
    await expect(page).toHaveURL(URLS.CART);
    
    const cartPage = new CartPage(page);
    await expect(cartPage.cartProducts).toHaveCount(1);
    await cartPage.clickDeleteProductButton();
    await expect(cartPage.emptyCartElement).toBeVisible();
    await expect(cartPage.cartIsEmptyText).toContainText('Cart is empty! Click here to buy products.');
});

test('Pay and Finish order', async ({ page, request }) => {
    const apiClient = new ApiClient(request);
    const token = await apiClient.getToken();
    const firstName = faker.person.firstName();
    const password = faker.internet.password();
    const email = faker.internet.email();
    await apiClient.setUserInfo(firstName, email, token);
    await apiClient.setAllUserInfo(firstName, email, password, faker.person.firstName(), faker.person.lastName(), token);
    await apiClient.loginUser(email, password);
    const state = await request.storageState();
    await page.context().addCookies(state.cookies);

    await page.goto(URLS.FIRST_PRODUCT)
    const productPage = new ProductPage(page);
    await productPage.clickAddToCartButton();
    await productPage.clickViewCartButton();
    await expect(page).toHaveURL(URLS.CART);
    const cartPage = new CartPage(page);
    await cartPage.clickProceedToCheckoutButton();
    await expect(page).toHaveURL(URLS.CHECKOUT);
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.clickPleaseOrderButton();
    await expect(page).toHaveURL(URLS.PAYMENT);
    const paymentPage = new PaymentPage(page);
    await paymentPage.fillNameOnCardInput(faker.person.fullName());
    await paymentPage.fillCardNumberInput(faker.finance.creditCardNumber());
    await paymentPage.fillCvcInput(faker.finance.creditCardCVV());
    await paymentPage.fillExpirationMonthInput(faker.date.month({ abbreviated: true }));
    await paymentPage.fillExpirationYearInput(faker.date.future().getFullYear().toString());
    await paymentPage.clickPayAndConfirmButton();
    await expect(page).toHaveURL(URLS.PAYMENT_DONE);

    const paymentDoneElements = new PaymentDoneElements(page);
    await expect(paymentDoneElements.titleText).toContainText('Order Placed!');
    await expect(paymentDoneElements.continueButton).toBeEnabled();
    await expect(paymentDoneElements.downloadInvoiceButton).toBeEnabled();

    await apiClient.loginUserAccount(email, password);
    await apiClient.deleteUserAccount(token);
});
