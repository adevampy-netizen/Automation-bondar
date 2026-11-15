import {test} from '@playwright/test'

test.beforeEach(async ({page})=>{
    await page.goto('https://playground.bondaracademy.com/')
    await page.getByText('Forms',{exact:true}).click()
    await page.getByText('Form Layouts', {exact:true}).click()
    // await page.waitForTimeout(10000)

})

/*  once check this 
test.afterEach(async({page})=>{
    await page.close()

})

*/


test('user-visible locators', async ({page})=>{
    
    await page.getByRole('textbox',).first().fill('deva@gmail.com')  //how to specific tag? its not filtering ->thats why given first to select 
    await page.getByRole('button', {name:'Sign in'}).first().click()
    await page.getByLabel('Email',{exact:true}).first().fill('logi@gmail.com')
    await page.getByPlaceholder('Jane Doe',{exact:true}).fill('harsha@gmail.com')
    await page.getByText('Submit', {exact:true}).first().click()
    await page.getByTestId('inputEmail1').fill('new@gmail.com')
    await page.getByTitle('IoT Dashboard',{exact:true}).first().click()
    await page.getByRole('button',{exact:true}).click()
    
    // await page.getByRole('textbox',)

})


test ('parent-child locators', async({page})=>{

    await page.locator('nb-card nb-card-body form label[for="inputEmail1"]').fill('deva@gmail')
    // await page.waitForTimeout(10000)
    await page.locator('nb-card', {hasText: 'Using the Grid'}).locator('#inputEmail1').fill('logi@gmail')
    // await page.locator('nb-card', {has: page.locator('#inputEmail1')}).fill('harsha@gmail.com') 
    //thanks gemini // error is we found container and not an actual element
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).locator('#inputEmail1').fill('harsha@gmail.com')
  

} )

/*

 test ('pavan practice', async({page})=>{
    await page.goto('https://sdetqa.vercel.app/')
    await page.locator('div[class="card-body"] ul li')
    .filter({hasText: 'Practice getByRole'})
    .getByTestId('delete-task-2').click()
    //page.locator('div[class="card-body"] ul li').filter({hasText: 'Practice getByRole'}).getByTestId('delete-task-2')
    //selectors hub matched exactly 1 element //imp hint for confirmation of combined locator
    // like css -->filters-->playwright inbuild locators
    //page.getByRole('textbox', {name: 'Username')}   verified in sel hub
} )

*/


test ('parent-child locators1', async({page})=>{
    
    await page.locator('nb-card').filter({hasText: 'Block form'}).getByRole('button').click() 

} )

    
