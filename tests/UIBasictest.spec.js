const {test, expect} = require('@playwright/test');

test ('First Playwright test', async ({browser, page})=>
{
        await page.goto ("https://integration.usaid.mykhailov.dev/authorization/login");
        console.log(await page.title());
        await expect(page).toHaveTitle("Вхід");
        await page.locator('#username').type("cdpadmin@moz.gov.ua");
        await page.locator('#password').type("cdpadm1nPasswod");
        await page.locator('.main-button').click();
        console.log(await page.locator('.form-error').textContent());
        await expect(page.locator('.form-error')).toContainText('Невірний Email');

});