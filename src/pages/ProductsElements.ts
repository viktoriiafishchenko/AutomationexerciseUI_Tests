import { Page, Locator } from "@playwright/test";

export class ProductsElements {
  readonly page: Page;
    readonly itemsElement: Locator;
    readonly titleText: Locator;
    readonly productItem: Locator;
    readonly viewProductButton: Locator;
    readonly advertisementElement: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly addToCartButton: Locator;
    readonly popupElement: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemsElement = page.locator('.features_items');
    this.titleText = this.itemsElement.locator('.title');
    this.productItem = this.itemsElement.locator('.col-sm-4');
    this.viewProductButton = this.productItem.locator('.choose');
    this.advertisementElement = page.locator('#advertisement');
    this.searchInput = this.advertisementElement.locator('#search_product');
    this.searchButton = this.advertisementElement.locator('#submit_search');
    this.addToCartButton = this.itemsElement.locator('.add-to-cart');

    this.popupElement = page.locator('.modal-content');
    this.continueShoppingButton = this.popupElement.locator('[data-dismiss="modal"]');
    this.viewCartButton = this.popupElement.getByText('View Cart');
  }
}