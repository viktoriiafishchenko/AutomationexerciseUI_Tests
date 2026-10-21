import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductElements } from './ProductElements';

export default class ProductPage extends BasePage {
    readonly productElements: ProductElements;

    constructor(page: Page) {
        super(page);
        this.productElements = new ProductElements(page);
    }

    async checkImage() {
        await expect(this.productElements.image).toBeVisible();
    }

    async checkAddToCartButton() {
        await expect(this.productElements.addToCartButton).toBeVisible();
    }

    async fillQuantityInput(quantity: string) {
        await this.productElements.quantity.fill(quantity);
    }

    async clickAddToCartButton() {
        await this.productElements.addToCartButton.click();
    }

    async clickContinueShoppingButton() {
        await this.productElements.continueShoppingButton.click();
    }

    async clickAddToCartAndContinue() {
        await this.productElements.addToCartButton.click();
        await this.productElements.continueShoppingButton.click();
    }

    async clickViewCartButton() {
        await this.productElements.viewCartButton.click();
    }

    async fillNameInput(name: string) {
        await this.productElements.nameInput.fill(name);
    }

    async fillEmailInput(email: string) {
        await this.productElements.emailInput.fill(email);
    }

    async fillReviewInput(review: string) {
        await this.productElements.reviewInput.fill(review);
    }

    async clickSubmitButton() {
        await this.productElements.submitButton.click();
    }
     
    async scrollToSubmitButton() {
    await this.productElements.submitButton.scrollIntoViewIfNeeded();
  }
}