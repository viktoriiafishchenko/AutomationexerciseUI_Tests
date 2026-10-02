import { Page, Locator } from '@playwright/test';

export class HomeElements {
  readonly page: Page;
  readonly carouselElement: Locator;
  readonly signupLoginButton: Locator;
  readonly navigateBar: Locator;
  readonly signupLoginText: Locator;
  readonly logoutText: Locator;
  readonly contactUsButton: Locator;
  readonly testCasesButton: Locator;
  readonly productsButton: Locator;
  readonly footerElement: Locator;
  readonly subscriptionSection: Locator;
  readonly emailInput: Locator;
  readonly subscribeButton: Locator;
  readonly succsessMessage: Locator;
  readonly cartButton: Locator;
  readonly deleteAccountButton: Locator;
  readonly logoutAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.carouselElement = page.locator('[data-ride="carousel"]');
    this.signupLoginButton = page.getByText('Signup / Login');

    // create a new instance of Navigate bar
    this.navigateBar = page.locator('.navbar-nav');
    this.signupLoginText = this.navigateBar.getByText('Signup/Login');
    this.logoutText = this.navigateBar.getByText('Logout');
    this.contactUsButton = this.navigateBar.getByText('Contact us');
    this.testCasesButton = this.navigateBar.getByText('Test Cases');
    this.productsButton = this.navigateBar.getByText('Products');
    this.footerElement = page.locator('#footer');
    this.subscriptionSection = this.footerElement.locator('.single-widget');
    this.emailInput = this.subscriptionSection.locator('#susbscribe_email');
    this.subscribeButton = this.subscriptionSection.locator('#subscribe');
    this.succsessMessage = this.subscriptionSection.locator('.alert-success');
    this.cartButton = this.navigateBar.getByText('Cart');
    this.deleteAccountButton = this.navigateBar.getByText('Delete Account');
    this.logoutAccountButton = this.navigateBar.getByText('Logout');
  }
}
