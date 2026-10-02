import { Page, Locator } from "@playwright/test";

export class AccountDeletedElements {
    readonly page: Page;
    readonly accountDeletedText: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountDeletedText = page.getByTestId('account-deleted');
        this.continueButton = page.getByTestId('continue-button');
    }
}