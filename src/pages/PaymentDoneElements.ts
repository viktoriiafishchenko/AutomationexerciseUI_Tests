import { Page, Locator } from "@playwright/test";

export class PaymentDoneElements {
    readonly page: Page
    readonly titleText: Locator;
    readonly downloadInvoiceButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleText = page.getByTestId('order-placed');
        this.downloadInvoiceButton = page.locator('.check_out');
        this.continueButton = page.getByTestId('continue-button');
    }
}