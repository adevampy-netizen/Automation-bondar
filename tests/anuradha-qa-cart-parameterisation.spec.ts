import {test, expect} from '@playwright/test'
import searchData from '../data/datausedParameterize.json'
import testData from '../data/dataused.json'

const data = testData[0];



test.beforeEach( async ({page})=>{

    await page.goto(data.BaseURL)
    await page.getByRole('textbox', {name: 'Username or email address'}).fill(data.Username)
    await page.getByRole('textbox', {name: 'Password'}).fill(data.Password)
    await page.waitForTimeout(2000)
    await page.getByRole('button', {name: 'Log in'}).click()
    await page.getByRole('link', { name: 'DemoShop' }).click();

})


searchData.forEach((search)=>{

test(`search product by orgainic ${search.keyword}`, async({page})=>{
    
    // await page.getByRole('textbox', {name: 'Username or email address'}).fill('deva.aaru@gmail.com')
    // await page.getByRole('textbox', {name: 'Password'}).fill('mpypassword@123')
    // await page.getByRole('button', {name: 'Log in'}).click()

    // await page.pause()
    await expect(page.locator('header h1').filter({hasText:'DemoShop'})).toBeVisible()
    await page.waitForTimeout(2000)
    await page.getByPlaceholder('Search products…').fill(search.keyword)
    await page.waitForTimeout(2000)
    await page.getByRole('button', { name: 'Search' }).click()
    await expect(page.getByRole('heading', { name: `${search.productname}` })).toBeVisible()
    await page.waitForTimeout(2000)

})

}
)


test('search product by Hand', async({page})=>{
    
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





