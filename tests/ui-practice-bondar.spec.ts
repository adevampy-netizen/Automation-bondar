import {test, expect} from '@playwright/test'

test.beforeEach( async ({page})=>{
    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard')
    const logo = page.locator('div[class="logo-container"]').getByText('Playground')      //.textContent()
    await expect(logo).toHaveText('Playground')
    await page.getByText('Forms').click()
    // await page.waitForTimeout(2000)
    await page.getByTitle('Form Layouts').click()

})

test('first Ui element', async({page})=>{

    await page.locator('nb-card',{hasText: 'Using the Grid'})
    .getByLabel('Email')
    .fill('deva@gmail.com')
    
})    

test('reuse locator', async({page})=>{
    const UsingTheGrid = page.locator('nb-card',{hasText: 'Using the Grid'})
    const UsingTheGrideEmailInput = UsingTheGrid.getByLabel('Email')

    await UsingTheGrideEmailInput.fill('2ndround@gmail.com')
    await page.waitForTimeout(4000)
    await UsingTheGrideEmailInput.clear()
    await UsingTheGrideEmailInput.fill('123deva@gmail.com')
    console.log(await UsingTheGrideEmailInput.inputValue())     //prints the inner value which user entered

    await expect(UsingTheGrideEmailInput).toHaveValue('123deva@gmail.com')     

})

test('drop-down', async({page})=>{

    await page.getByRole('link', {name: 'Modal & Overlays'}).click()
    // await page.locator('a[title="Toastr"]', {hasText:"Toastr"}).click()   both are same (this and below line )

    console.log(await page.locator('a[title="Toastr"]').filter({hasText:"Toastr"}).textContent())


})


test('Tool-tip', async({page})=>{

    await page.getByRole('link', {name: 'Modal & Overlays'}).click()
    await page.getByRole('link',{name: 'Tooltip'}).click()
    await page.getByRole('button', {name: 'Default'}).hover()
    // await page.waitForTimeout(3000)
    const tooltipMsg =page.getByRole('tooltip', {name:'This is a tooltip'})
    await expect(tooltipMsg).toHaveText('This is a tooltip')

})


test('dialog box', async({page})=>{
    await page.getByTitle('Tables & Data').click()
    await page.getByRole('link', {name: 'Smart Table'}).click()
    const userJacobFat = page.locator('tbody tr').filter({hasText: 'fat@yandex.ru'})
    await page.waitForTimeout(3000)
    await expect(userJacobFat).toBeVisible()

    
    // listener BEFORE the dialog trigger  //Setup the listener first (resolves immediately when triggered)
    page.on('dialog', async(dialog)=>{
        expect(dialog.type()).toBe('confirm')
        await page.waitForTimeout(3000)
        expect(dialog.message()).toContain('Are you')                  //toBE(''), toHave('')   --> exact text
        await dialog.accept()               // accept to delete user
    })

    // click action to trigger dialog 
    await userJacobFat.locator('.nb-trash').click()
    await expect(userJacobFat).not.toBeVisible()

    // page.on('dialog', (dialog)=>{

    // })
    
}
)


test('webTable', async({page})=>{    

    // 1 how to select row by any visible text
    await page.getByTitle('Tables & Data').click()
    await page.getByRole('link', {name: 'Smart Table'}).click()
    const rowByVisibleText = page.getByRole('row', {name:'snow@gmail.com', exact:true})
    // const rowByVisibleText1 = page.getByRole('row', )   testing purpose 
    // const rowByVisibleText = page.getByRole('row').filter({hasText: 'snow@gmail.com'}) incorrect syntax by default role has filter
    await rowByVisibleText.locator('.nb-edit').click()
    await rowByVisibleText.getByPlaceholder('Age').fill('31')
    
    await rowByVisibleText.locator('.nb-checkmark').click()
    // await expect(rowByVisibleText).toContainText('25')
    await expect(rowByVisibleText.locator('td').last()).toHaveText('31')

    // 2 get row by sepcific column value

    const rowBySpecificCol1 = page.getByRole('cell').nth(1).getByText('10')
    const rowBySpecificCol = page.getByRole('row').filter({has: page.getByRole('cell').nth(1).getByText('10')}) // role filter with locator syntax {has: page.locator()}
    console.log(await rowBySpecificCol.textContent())  //10KarenSevan@karenkaren@yandex.ru33
    console.log(await rowBySpecificCol.allTextContents()) //[ '10KarenSevan@karenkaren@yandex.ru33' ]

    // rowBySpecificCol.locator('.nb-trash').click()
    // await page.waitForTimeout(2000)
    // console.log(await rowBySpecificCol.getByText('Karen', {exact: true}).textContent())
    rowBySpecificCol.locator('.nb-edit').click()
    await page.locator('tbody').getByPlaceholder('E-mail').fill('12dev@gmail.com')
    await page.locator('tbody').locator('.nb-checkmark').click()
    await expect(page.getByRole('row').nth(11).getByRole('cell', {name: '12dev@gmail.com'})).toHaveText('12dev@gmail.com')

    
})


test('dataPicker', async({page})=>{
    await page.getByRole('link',{name: 'Datepicker'}).click()
    await page.waitForTimeout(3000)
    await page.getByPlaceholder('Form Picker').click()
    // const currentMonth = page.locator('nb-calendar-day-cell[class="day-cell ng-star-inserted"]')
    // await currentMonth.getByText('2', {exact: true}).click()

    /*
    When you pass page.locator('.bounding-month') into hasNot, Playwright looks for a child/descendant element inside the day cell that has the class .bounding-month. Since .bounding-month is a class on the day cell itself (not a child inside it), the filter doesn't work the way you expect.
    */
    // const currentMonth = page.locator('nb-calendar-day-cell').filter({hasNot: page.locator('.bounding-month')})
    // await expect(currentMonth.first()).toBeVisible()
    // console.log(await currentMonth.allTextContents())
    // // await currentMonth.getByText('2', {exact: true}).click()

    
    const currentMonth = page.locator('.day-cell:not(.bounding-month)')
    await expect(currentMonth.first()).toBeVisible()
    //bcoz dropdown takes some msec to render number and stying 
    console.log(await currentMonth.allTextContents())
    await currentMonth.getByText('2', {exact:true}).click()







})


