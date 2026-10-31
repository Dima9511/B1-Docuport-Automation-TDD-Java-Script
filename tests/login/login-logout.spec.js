import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { testBase, CommonUI } from '../../utilities/docuport-ui-utilities';


test ('Test 1 - Login with hard coded values without POM', {tag: '@test1'}, async ({page}) => {
    await page.goto('https://beta.docuport.app/login');
    await page.locator("//label[text()='Username or email']").fill("b1g2_client@gmail.com");
    await page.locator("//label[text()='Password']").fill("Group2");
    await page.locator("//button[@type='submit']").click(); 
    await page.locator("//span[text()=' Continue ']").click(); 
    await expect(page.locator("//div[@class='v-avatar primary']")).toBeVisible();
    //await page.waitForTimeout(3000);
})


test ('Test 2 - Login with hard coded values with POM', {tag: '@test2'}, async ({page}) => {
    // Create a login page object to be able to use members (variables, methods) of that page
    const loginPage = new LoginPage(page); 
    const homePage = new HomePage(page);

    await page.goto('https://beta.docuport.app/login');
    await loginPage.enterUsername("b1g2_client@gmail.com"); 
    await loginPage.enterPassword("Group2");
    await loginPage.clickLoginButton(); 
    await homePage.clickContinueButton(); 
    await expect(homePage.profileIconButton).toBeVisible(); 
    //await page.waitForTimeout(4000);

})


test ('Test 3 - Login with hard coded values with POM with single login method ', {tag: '@test3'}, async ({page}) => {   
    // Create a login page object to be able to use members (variables, methods) of that page
    const loginPage = new LoginPage(page); 
    const homePage = new HomePage(page);

    await page.goto('https://beta.docuport.app/login');
    await loginPage.login("b1g2_client@gmail.com", "Group2"); 
    await homePage.clickContinueButton(); 
    await expect(homePage.profileIconButton).toBeVisible(); 
    //await page.waitForTimeout(4000);

})


// Storing data in JS object - works with KEY and VALUE
const credentials = {
    // KEY:   "VALUE"
    username: "b1g2_client@gmail.com",
    password: "Group2"
}

test ('Test 4 - Login with data from a JS Object ', {tag: '@test4'}, async ({page}) => {   
    // Create a login page object to be able to use members (variables, methods) of that page
    const loginPage = new LoginPage(page); 
    const homePage = new HomePage(page);

    await page.goto('https://beta.docuport.app/login');
    await loginPage.login(credentials.username, credentials.password); 
    await homePage.clickContinueButton(); 
    await expect(homePage.profileIconButton).toBeVisible(); 
    //await page.waitForTimeout(4000);

})


test ('Test 5 - Login as given user type', {tag: '@test5'}, async ({page}) => {   
    // Create a login page object to be able to use members (variables, methods) of that page
    const loginPage = new LoginPage(page); 
    const homePage = new HomePage(page);

    //await page.goto('https://beta.docuport.app/login');
    await loginPage.navigateToLoginPage(); 

    //await loginPage.login(credentials.username, credentials.password); 
    loginPage.loginAs("employee");
    //await homePage.clickContinueButton(); 
    await expect(homePage.profileIconButton).toBeVisible(); 
    await page.waitForTimeout(2000);
    await homePage.validatePageFor("employee");
})


// In terms of ROLE: what is my test data - Advisor, Client, Supervisor, Employee
test ('Test 6 - Login as any given user type', {tag: '@test6'}, async ({page}) => {   
    // Create a login page object to be able to use members (variables, methods) of that page
    const loginPage = new LoginPage(page); 
    const homePage = new HomePage(page);

    //await page.goto('https://beta.docuport.app/login');
    await loginPage.navigateToLoginPage(); 

    //await loginPage.login(credentials.username, credentials.password);                                                                                                
    await loginPage.loginAs("Manager");
    await homePage.clickContinueButton(); 
    await expect(homePage.profileIconButton).toBeVisible(); 
    await page.waitForTimeout(2000);
})



test ('Test 7 - Login as any given user type', {tag: '@test7'}, async ({page}) => {   
    await page.waitForTimeout(2000);
})


testBase ('Test 8 - Login as any given user type', {tag: '@test8'}, async ({page}) => {   
    await page.waitForTimeout(2000);

    await CommonUI.loginAs(page, "client");
    const actualUimenuitems = await homePage.getLetMenuItems(); // comes from actual UI
    const expectedmenuItems = CommonUI.getLeftMenuFor("client"); // comes from tst data
    console.log(expectedmenuItems);
    expect(actualUiMenuItems).toEqual(expectedMenuItems);
})

export const testLoggedIn = testBase.extend ({         // OUR testLoggedIn = OUR testbase + extras
    role: ["client", { option: true }],                // be default client + other roles

    loggedInPage: async ({ page, role }, use) => {       // new fixture
        await CommonUI.loginAs(page, role);
        await use(page);
    },


});

testLoggedIn.describe("Advisor role releted tests", () => {
    // this follolwing line of a code, has to be declered only ONE time.
    testLoggedIn.use({rple: "advisor"});

    
    
    testLoggedIn('Test 10 - Advisor starts already logged in....',{tag: '@test10'}, async ({loggedInPage}) => {

    });

    // * Miltiple different test can be created inside of this describe but all of the test will be loggin in as ADVISOR
    
});

/*
username | password  | message
invalid  | invalid   | Username or password incorrect
""       | invalid   | Please enter your username or email address
invalid  | ""        | Please enter your password
""       | ""        | Please enter your username or email address
*/

//DATA - one array that holds multipl objects which each of the objects hold 3 KEY : VALUE
const invalidLoggins = [
    {username: "invalid@gmail.com", password: "invalid123!", message "Username or password is incorrect",},
    {username: "",                  password: "invalid123!", message "Please enter your username or email address",},
    {username: "invalid@gmail.com", password: "",            message "Please enter your password",},
    {username: "",                  password: "",            message "Please enter your username or email address",}

    for (const eachRow of invalidLoggins) {

        testBase (`Test 12 - Invalid login for ${eachRow.username} and password`, {tag: '@test12'}, async ({page}) => {
            const loginPage = new LoginPage(page);
            loginPage.login(eachRow.username, eachRow.password);
            await page.waitForTimeout(2000);
            await loginPage.verifyInvalidLoginMessage(eachRow.message);

        })





    }



];