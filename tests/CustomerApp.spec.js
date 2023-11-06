const {test, expect} = require('@playwright/test');

test.only('Login and checkout', async ({page}) =>
{
    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const productList = page.locator(".card-body");  

    const desiredProductName = 'iphone 13 pro';
    const cartPage = page.locator('[routerlink*="cart"]');


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
    

    await cartPage.click();
    await page.locator("div li").first().waitFor();
    const cartChecking = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(cartChecking).toBeTruthy();
    await page.pause();

});
