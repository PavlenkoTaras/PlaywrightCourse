const {test, expect} = require('@playwright/test');

test ('Rahul Shetty First Tast', async ({page}) =>
{
    const registration = page.locator(".text-reset");
    const firstName = page.locator ("#firstName");
    const lastName = page.locator ("#lastName");
    const email = page.locator ("#userEmail");
    const phoneNumber = page.locator ("#userMobile");
    const password = page.locator ("#userPassword");
    const confirPassword = page.locator ("#confirmPassword");
    const registerButton  = page.locator ("#login");
    const gender = page.locator ("[value = 'Female']");
    const confirmAge = page.locator("[type='checkbox']");
    const selectOccupation = page.locator("[formcontrolname='occupation']");
    const login = page.locator("[class='btn btn-primary']")
    const loginMainPage = page.locator("#login");
    const productList = page.locator("//body/app-root[1]/app-dashboard[1]/section[2]/div[1]/div[2]/div[1]");
    


    await page.goto ("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop");
    await registration.click();
    await firstName.type("Taras");
    await lastName.type("Pavle");
    await email.type("randomemail+++++++++++++@gmail.com");
    await phoneNumber.type("1943459874");
    await selectOccupation.selectOption({index : 3});
    await gender.click();
    await password.type("Qwerty1715");
    await confirPassword.type("Qwerty1715");
    await confirmAge.click();
    await registerButton.click();
    await login.click();
    await email.type("randomemail+++++++++++++@gmail.com");
    await password.type("Qwerty1715");
    await loginMainPage.click();
    console.log(await productList.textContent());

});