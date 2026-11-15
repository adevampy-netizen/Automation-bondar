import {test, expect} from '@playwright/test'
import testdata from '../data/dataused.json'

const data = testdata[0];


test.beforeEach( async ({page})=>{
    await page.goto(data.BaseURL)
    await page.getByRole('textbox', {name: 'Username or email address'}).fill(data.Username)
    await page.getByRole('textbox', {name: 'Password'}).fill(data.Password)
    await page.waitForTimeout(2000)
    await page.getByRole('button', {name: 'Log in'}).click()
    await page.getByRole('link', { name: 'DemoShop' }).click();

})

test('filter product by orgainic', async({page})=>{
    
    // await page.getByRole('textbox', {name: 'Username or email address'}).fill('deva.aaru@gmail.com')
    // await page.getByRole('textbox', {name: 'Password'}).fill('mpypassword@123')
    // await page.getByRole('button', {name: 'Log in'}).click()

    // await page.pause()
    await expect(page.locator('header h1').filter({hasText:'DemoShop'})).toBeVisible()
    await page.waitForTimeout(2000)
    await page.getByPlaceholder('Search products…').fill(data.keyword1)
    await page.getByRole('button', { name: 'Search' }).click()
    await expect(page.getByRole('heading', { name: 'Organic Face Scrub' })).toBeVisible()
    await page.waitForTimeout(2000)

})

test('filter product by Hand', async({page})=>{
    
    // await page.getByRole('textbox', {name: 'Username or email address'}).fill('deva.aaru@gmail.com')
    // await page.getByRole('textbox', {name: 'Password'}).fill('mpypassword@123')
    // await page.getByRole('button', {name: 'Log in'}).click()

    // await page.pause()
    await expect(page.locator('header h1').filter({hasText:'DemoShop'})).toBeVisible()
    await page.waitForTimeout(2000)
    await page.getByPlaceholder('Search products…').fill(data.keyword2)
    await page.getByRole('button', { name: 'Search' }).click()
    await expect(page.getByRole('heading', { name: 'Hand Sanitizer' })).toBeVisible()

})





