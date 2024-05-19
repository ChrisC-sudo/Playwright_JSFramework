import { test, expect } from '@playwright/test';

test('Login Test', async function({browser}){

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('input#userEmail');
    const userPass = page.locator('input#userPassword');
    const submit = page.locator('input.btn');
    await page.goto(process.env.URL);
    console.log(await page.title());
    await userName.fill(process.env.USERN);
    await userPass.fill(process.env.USERP);
    await submit.click();
});














// input#userEmail //input#userPassword //input.btn



//const {test} = require('@playwright/test')
