import {test, expect} from '@playwright/test'
import dataused from '../data/dataused.json'

test.beforeEach( async ({page})=>{
    await page.goto(process.env.BASE_URL!)
    await page.getByRole('textbox', {name: 'Username or email address'}).fill(process.env.DEMO_USER!)
    await page.getByRole('textbox', {name: 'Password'}).fill(process.env.DEMO_PASS!)
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
    await page.getByPlaceholder('Search products…').fill('organic')
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
    await page.getByPlaceholder('Search products…').fill('Hand')
    await page.getByRole('button', { name: 'Search' }).click()
    await expect(page.getByRole('heading', { name: 'Hand Sanitizer' })).toBeVisible()

})





