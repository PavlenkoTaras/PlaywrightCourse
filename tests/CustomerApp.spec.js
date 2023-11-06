const {test, expect} = require('@playwright/test');

test.only('Login and checkout', async ({page}) =>
{
    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const productList = page.locator('.card-body');
    const count = productList.count();
    const desiredProductName = 'iphone 13 pro';


    await page.goto('https://rahulshettyacademy.com/client');
    await userEmail.type('tpavlenko@mail.com');
    await userPassword.type('Qwerty1715');
    await loginButton.click();

    //looping for finding desired items which will be added to the cart    
    for (i = 0; i <= count; i++)
    {
        if(await productList.nth(i).locator('b').textContent() === desiredProductName)
        {
            //adding to the cart
            await productList.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

});