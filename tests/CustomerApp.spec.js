const {test, expect} = require('@playwright/test');

test.only('Login and checkout', async ({page}) =>
{
    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const productList = page.locator(".card-body");  
    const checkoutPage = page.locator("text=Checkout")
    const selectCountryField = page.locator("[placeholder*= 'Country']")
    const drowdown = page.locator(".ta-results");
    const desiredProductName = 'iphone 13 pro';
    const cartPage = page.locator('[routerlink*="cart"]');
    const emailLabel = page.locator ('.user__name [type="text"]');
    const placeOrderButton = page.locator ('[class*="submit"]');

//Login into system, add Iphone 13 to the cart
    await page.goto('https://rahulshettyacademy.com/client');
    await userEmail.type('tpavlenko@mail.com');
    await userPassword.type('Qwerty1715');
    await loginButton.click();
    await page.waitForLoadState('networkidle');     
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await productList.count();  

    for (let i = 0; i < count; ++i) {
        if (await productList.nth(i).locator("b").textContent() === desiredProductName) {
//adding to the cart
            await productList.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    
//Check that Iphone 13 product has been added to the Cart
    await cartPage.click();
    await page.locator("div li").first().waitFor();
    const cartChecking = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(cartChecking).toBeTruthy();
    await checkoutPage.click();
    await selectCountryField.type('ukr', {delay:100});
    await drowdown.waitFor();
    await drowdown.locator("button").click();
    

//Verify that the label in Shipping Information section contain correct user email and user is able checkout sucessfull
    expect(page.locator(".user__name [type='text']").first()).toHaveText('tpavlenko@mail.com');
    await placeOrderButton.click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    console.log(await page.locator('.em-spacer-1 .ng-star-inserted').textContent());
    

});
