import { test, expect } from '@playwright/test';
require('dotenv').config();

async function locate() {
    const selectors = {
        USERN: 'input[name="user[email]"]', 
        USERP: 'input[name="user[password]"]', 
        SUBMIT: 'button[type="submit"]' 
    };
    return selectors;
}

test('Login Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const selectors = await locate();
    await page.goto(process.env.URL);
    console.log(await page.title());
    await page.fill(selectors.USERN, process.env.USERN);
    await page.fill(selectors.USERP, process.env.USERP);
    await page.click(selectors.SUBMIT);
});
