import { test, expect } from '@playwright/test';
import exp from 'constants';
require('dotenv').config();

function locate() {
    const selectors = {
        SIGN_IN :"[href*='login']",
        WEBSITE_NAME : "a[class='logo'] img",
        WELCOME : '.page__heading',
        USERN: '#email', 
        USERP: "[title='Password']", 
        SUBMIT: ' #send2',
        FORGOT_PASS:"div a[class='action remind']",
        FORGOT_PASS_EMAIL :'input#email_address',
        FORGOT_PASS_SUBMIT:"button[class='action submit primary']",
        RESET_PASSWORD_HEADING :"//div[@data-bind='html: $parent.prepareMessageForHtml(message.text)']",
        //"div[data-bind*='html: $parent.prepareMessageForHtml(message.text)']",
        REMEMBER_ME :"input[type='checkbox']",
        LOGO :"a.logo",
        LOGGED_IN:"div[class='panel header'] span[class='logged-in']"
    };
    return selectors;
}

test('Login Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const selectors = locate();
    await page.goto(process.env.URL);
    console.log(await page.title());
    await page.click(selectors.SIGN_IN);
    console.log(await page.title());
    // const WEBURL = page.locator(selectors.WEBSITE_NAME);
    // const WebName = await WEBURL.textContent();
    // expect(WebName.trim()).toEqual("Customer Login")
    // page.pause()
    // const welcomeElement = page.locator(selectors.WELCOME);
    // const textContent = await welcomeElement.textContent();
    // expect(textContent.trim()).toContain("Welcome"); 
    await page.fill(selectors.USERN, process.env.USERN);
    await page.fill(selectors.USERP, process.env.USERP);
    await page.click(selectors.SUBMIT);
    const log_in = page.locator(selectors.LOGGED_IN);
    const logged_in = await log_in.waitFor()
    await expect(log_in).toHaveText('Welcome, John Don!');
    page.pause();
});

test.only('Forgot password test', async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const selectors = locate();
    await page.goto(process.env.URL);
    await page.click(selectors.SIGN_IN);
    await page.click(selectors.FORGOT_PASS);
    await page.fill(selectors.FORGOT_PASS_EMAIL, process.env.USERN);
    const click = await page.locator(selectors.FORGOT_PASS_SUBMIT).waitFor;
    const onclick = await click.click();
    const ResetPassword = page.locator(selectors.RESET_PASSWORD_HEADING);
    const Reset = await ResetPassword.waitFor();
    await expect(ResetPassword).toHaveText("If there is an account associated with John.don@email.com you will receive an email with a link to reset your password.")
    page.pause();

});