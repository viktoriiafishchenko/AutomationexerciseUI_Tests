import { Page, Locator } from "@playwright/test";

export class ProductElements {
    readonly page: Page;
    readonly productElement: Locator;
    readonly image: Locator;
    readonly productInformation: Locator;
    readonly productName: Locator;
    readonly price: Locator;
    readonly quantity: Locator;
    readonly addToCartButton: Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator;
    readonly category: Locator;
    readonly popupElement: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartButton: Locator;
    readonly reviewElement: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly reviewInput: Locator;
    readonly submitButton: Locator;
    readonly reviewSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productElement = page.locator('.product-details');
        this.image = this.productElement.locator('[src="/get_product_picture/1"]');
        this.productInformation = this.productElement.locator('.product-information');
        this.productName = this.productInformation.locator('h2');
        this.category = this.productInformation.getByText('Category:');
        this.price = this.productInformation.getByText('Rs.');
        this.quantity = this.productInformation.locator('[name="quantity"]');
        this.addToCartButton = this.productInformation.locator('.cart');
        this.availability = this.productInformation.locator('p', { hasText: 'Availability:' });
        this.condition = this.productInformation.locator('p', { hasText: 'Condition:' });
        this.brand = this.productInformation.locator('p', { hasText: 'Brand:' });
        this.reviewElement = page.locator('.shop-details-tab');
        this.nameInput = this.reviewElement.locator('#name');
        this.emailInput = this.reviewElement.locator('#email');
        this.reviewInput = this.reviewElement.locator('#review');
        this.submitButton = this.reviewElement.locator('#button-review');
        this.reviewSuccessMessage = this.reviewElement.locator('.alert-success');

        this.popupElement = page.locator('#cartModal');
        this.continueShoppingButton = this.popupElement.locator('.btn-success');
        this.viewCartButton = this.popupElement.getByText('View Cart');
    }
}