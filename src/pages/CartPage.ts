import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartElements } from './CartElements';

export default class CartPage extends BasePage {
    readonly cartElements: CartElements;

    constructor(page: Page) {
        super(page);
        this.cartElements = new CartElements(page);
    }

    async checkCartProductsCount(expectedCount: number) {
        await expect(this.cartElements.cartProducts).toHaveCount(expectedCount);
    }

    async clickProceedToCheckoutButton() {
        await this.cartElements.proceedToCheckoutButton.click();
    }

    async clickContinueOnCartButton() {
        await this.cartElements.continueOnCartButton.click();
    }

    async clickRegisterLoginButton() {
        await this.cartElements.registerLoginButton.click();
    }

    async clickDeleteProductButton() {
        await this.cartElements.deleteProductButton.click();
    }

    // Getters for assertions in tests
    get cartProducts() {
        return this.cartElements.cartProducts;
    }

    get productDescription() {
        return this.cartElements.productDescription;
    }

    get productPrice() {
        return this.cartElements.productPrice;
    }

    get productQuantity() {
        return this.cartElements.productQuantity;
    }

    get productTotal() {
        return this.cartElements.productTotal;
    }

    get emptyCartElement() {
        return this.cartElements.emptyCartElement;
    }

    get cartIsEmptyText() {
        return this.cartElements.cartIsEmptyText;
    }
}
