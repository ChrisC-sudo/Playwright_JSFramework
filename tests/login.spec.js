import { test, expect } from '@playwright/test';
import exp from 'constants';
require('dotenv').config();

function locate() {
    const selectors = {
        WELCOME : '.page__heading',
        USERN: 'input[name="user[email]"]', 
        USERP: 'input[name="user[password]"]', 
        SUBMIT: 'button[type="submit"]',
        FORGOT_PASS:'.form__forgot-password',
        FORGOT_PASS_SUBMIT :'input[value="Submit"]',
        RESET_PASSWORD_HEADING :'.password-reset__heading',
        REMEMBER_ME :"input[type='checkbox']",
        WEBSITE_NAME : 'h1.sr-only'
    };
    return selectors;
}

test('Login Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const selectors = await locate();
    await page.goto(process.env.URL);

    const WEBURL = await page.locator(selectors.WEBSITE_NAME);
    const WebName = await WEBURL.textContent();
    expect(WebName.trim()).toEqual("UltimateQA")
    console.log(await page.title());

    const welcomeElement = await page.locator(selectors.WELCOME);
    const textContent = await welcomeElement.textContent();
    expect(textContent.trim()).toContain("Welcome"); 

    await page.fill(selectors.USERN, process.env.USERN);
    await page.fill(selectors.USERP, process.env.USERP);
    await page.click(selectors.REMEMBER_ME);
    await page.click(selectors.SUBMIT);
});

test('Forgot password test', async ({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const selectors = await locate();
    await page.goto(process.env.URL);

    await page.click(selectors.FORGOT_PASS);
    await page.fill(selectors.USERN, process.env.USERN);
    await page.click(selectors.FORGOT_PASS_SUBMIT);

    const ResetPassword =await page.locator(selectors.RESET_PASSWORD_HEADING)
    const textContent = await ResetPassword.textContent();
    expect(textContent.trim()).toContain("Help")
    page.pause();

});