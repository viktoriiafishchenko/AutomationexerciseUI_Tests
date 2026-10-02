import { test, expect } from '@playwright/test';
import { URLS } from '../data/Urls';
import ProductsPage from '../pages/ProductsPage';
import ProductPage from '../pages/ProductPage';
import { ProductsElements } from '../pages/ProductsElements';   
import { ProductElements } from '../pages/ProductElements';


test('Verify All Products and product detail page', async ({ page }) => {
    await page.goto(URLS.PRODUCTS);
    const productsPage = new ProductsPage(page);
    await productsPage.waitForProductsPage();
    const productsElements = new ProductsElements(page);
    await expect(productsElements.titleText).toHaveText('All Products');    
    await productsPage.clickViewProductButton(0);
    await expect(page).toHaveURL(URLS.FIRST_PRODUCT);
    const productPage = new ProductPage(page);
    await productPage.checkImage();
    await expect(productPage.productElements.productName).toHaveText('Blue Top');
    await expect(productPage.productElements.category).toHaveText('Category: Women > Tops');
    await expect(productPage.productElements.price).toHaveText('Rs. 500');
    const productElements = new ProductElements(page);
    await expect(productElements.availability).toContainText('In Stock');    
    await expect(productElements.condition).toHaveText('Condition: New');
    await expect(productElements.brand).toHaveText('Brand: Polo');
    await expect(productElements.quantity).toHaveValue('1');
    await productPage.checkAddToCartButton();
});

test('Search Product', async({page}) => {
    await page.goto(URLS.PRODUCTS)
    const productsPage = new ProductsPage(page);
    const productsElements = new ProductsElements(page);
    await productsPage.fillSearchInput('Fancy Green Top');
    await productsPage.clickSearchButton();
    await expect(productsElements.productItem).toHaveCount(1);
    await expect(productsElements.productItem).toContainText('Fancy Green Top');
});
