import { test as base, expect } from "@playwright/test";    // Playwright's test (renamed base) + expect
import path from "path";                                    // build file paths — screenshots folder
import fs from "fs";                                        // create that folder on disk
import { appInfo } from "./beta-data-reader.js";            // data from beta_data.json
import { LoginPage } from "../pages/LoginPage.js";          // used by CommonUI (next slide)
import { HomePage } from "../pages/HomePage.js";            // used by CommonUI (next slide)
​
export const testBase = base.extend({                       // OUR testBase = Playwright’s test + extras
  page: async ({ page }, use, testInfo) => {                // replace the built-in page
    await page.goto(process.env.DOCUPORT_BASE_URL);         // ① BEFORE — open Docuport (.env.beta)
    await expect(page).toHaveTitle(appInfo.loginPageTitle); // ① check the title is "Docuport"
    await use(page);                                        // ② the test itself runs here
    await takeScreenshotIfFailed(page, testInfo);           // ③ AFTER — screenshot if it failed
  },
});
​
export { expect };    