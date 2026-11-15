import {test} from '@playwright/test'

test('inbuilt-playwright_locators', async ({page})=>{

    await page.goto('https://www.google.com/')
    const gmail_link = page.getByText('Gmail', {exact: true})
    await gmail_link.click()
    await page.waitForTimeout(10000)      //youtube video for playwright locators, will add link// i think senthil

})

test('inbuilt-playwright_locators1', async ({page})=>{

    await page.goto('https://playground.bondaracademy.com/')
    await page.getByText('Forms',{exact:true}).click()
    await page.getByText('Form Layouts', {exact:true}).click()
    // await page.getByRole('textbox', {name : 'Email address'}).fill('deva@yahoo.com')
    await page.locator('nb-card', {hasText:'Basic form'}).getByRole('textbox', {name : 'Email address'}).fill('deva1@yahoo.com')

})
