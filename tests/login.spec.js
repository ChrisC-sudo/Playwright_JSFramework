import { test, expect } from '@playwright/test';
require('dotenv').config();

async function locate(){
    const selectors= {
        USERN:'input#userEmail',
        USERP:'input#userPassword',
        SUBMIT:'input.btn'
    }
    return selectors;
}

test('Login Test', async function({browser}){

    const context = await browser.newContext();
    const page = await context.newPage();
    const selectors = await locate();
    await page.goto("https://courses.ultimateqa.com/users/sign_in");
    console.log(await page.title());
    await page.fill(selectors.USERN,process.env.USERN);
    await page.fill(selectors.USERP,process.env.USERP);
    await page.click(selectors.SUBMIT);
});














// input#userEmail //input#userPassword //input.btn



//const {test} = require('@playwright/test')
