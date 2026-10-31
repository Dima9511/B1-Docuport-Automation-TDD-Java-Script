import { test as testBase } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage.js";
import { HomePage } from "../pages/HomePage.js";

testBase.describe("Login - describe - beforeEach", function () {

    testBase("Client Login", { tag: "@smoke" }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAs("client");

        const homePage = new HomePage(page);
        await homePage.validatePageFor("client");
    });

    testBase("Advisor Login", { tag: "@smoke" }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAs("advisor");

        const homePage = new HomePage(page);
        await homePage.validatePageFor("advisor");
    });

});