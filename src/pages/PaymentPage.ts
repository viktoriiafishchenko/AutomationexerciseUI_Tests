import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { PaymentElements } from './PaymentElements';

export default class PaymentPage extends BasePage {
    readonly paymentElements: PaymentElements;
    paymentDoneElements: any;

    constructor(page: Page) {
        super(page);
        this.paymentElements = new PaymentElements(page);
    }

    async clickPayAndConfirmButton() {
        await this.paymentElements.payAndConfirmOrderButton.click();
    }

    async fillNameOnCardInput(name: string) {
        await this.paymentElements.nameOnCardInput.fill(name);
    }

    async fillCardNumberInput(cardNumber: string) {
        await this.paymentElements.cardNumberInput.fill(cardNumber);
    }

    async fillCvcInput(cvc: string) {
        await this.paymentElements.cvcInput.fill(cvc);
    }

    async fillExpirationMonthInput(expirationMonth: string) {
        await this.paymentElements.expirationMonthInput.fill(expirationMonth);
    }

    async fillExpirationYearInput(expirationYear: string) {
        await this.paymentElements.expirationYearInput.fill(expirationYear);
    }
}