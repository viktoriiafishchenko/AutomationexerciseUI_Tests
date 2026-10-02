import { Page, Locator } from "@playwright/test";

export class PaymentElements {
    readonly page: Page;
    readonly cartElement: Locator;
    readonly payAndConfirmOrderButton: Locator;
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expirationMonthInput: Locator;
    readonly expirationYearInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartElement = page.locator('#cart_items');
        this.nameOnCardInput = this.cartElement.getByTestId('name-on-card');
        this.cardNumberInput = this.cartElement.getByTestId('card-number');
        this.cvcInput = this.cartElement.getByTestId('cvc');
        this.expirationMonthInput = this.cartElement.getByTestId('expiry-month');
        this.expirationYearInput = this.cartElement.getByTestId('expiry-year');
        this.payAndConfirmOrderButton = this.cartElement.getByTestId('pay-button');
    }
}