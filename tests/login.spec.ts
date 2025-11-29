import { test, expect } from '@playwright/test';
import { Helper } from '../utils/helper';
import { LoginPage } from '../pages/LoginPage';



import dotenv from 'dotenv';

dotenv.config();

test.describe.serial("Login Module:", () => {

        test("TC_01: Positive:: Should asserts all the visible Texts in the Login Page..", async({ page }) => {

                const pgBaseUrl = process.env.PG_BASEURL;
                const loginUrl = `${pgBaseUrl}#/auth/login`;
                const helper = new Helper(page);
                const login = new LoginPage(page);

                await helper.visitPage(loginUrl);
                await login.assertWelcomeText("Welcome to");
                await login.assertPaymentGateWayText("Payment Gateway");
                await login.assertLoginTitleText("Login");
                await login.assertUsernameText("Username");
                await login.assertUsernamePlaceholderText("Username");
                await login.assertPasswordText("Password");
                await login.assertPasswordPlaceholderText("Password");       
                await login.assertLoginButtonText("Login");
                await login.assertForgetPasswordText("Forgot Password?");
                await login.assertForgetPasswordURL("#/auth/forgot-password")

        
                await page.waitForTimeout(5000);
        });

        test("TC_02:Positive: Should Login successfully and redirect to Dashboard..", async ({page}) =>{
                const pgBaseUrl = process.env.PG_BASEURL;
                const loginUrl = `${pgBaseUrl}#/auth/login`;

                const pgUsername = process.env.PG_USERNAME;
                const pgPassword = process.env.PG_PASSWORD;

                const helper = new Helper(page);
                const login = new LoginPage(page);

                const dashboardUrl = `${pgBaseUrl}/#/gateway/dashboard`;

                await helper.visitPage(loginUrl);
                await login.loginCredentials(pgUsername,pgPassword);
                await helper.assertURL(dashboardUrl);
                await login.assertUsername(pgUsername);
                await login.assertDashboardText("Dashboard");
                await page.waitForTimeout(1000);
        });

        test("TC_01: Positive:: Should toggle password type view", async({ page }) => {

                const pgBaseUrl = process.env.PG_BASEURL;
                const loginUrl = `${pgBaseUrl}#/auth/login`;
                const helper = new Helper(page);
                const login = new LoginPage(page);

                await helper.visitPage(loginUrl);
                await login.fillUsername("test user");
                await login.fillPassword("test password");
                await login.assertAttributePasswordType();
                await login.clickEyeIcon();
                await login.assertAttributeTextType();
        
                await page.waitForTimeout(5000);
        });

        test("TC_04 : Negative : Verify error message scenerios",  async ({ page }) => {
                const pgBaseUrl = process.env.PG_BASEURL;
                const loginUrl = `${pgBaseUrl}#/auth/login`;

                const helper = new Helper(page);
                const login = new LoginPage(page);

                await helper.visitPage(loginUrl);
                await login.clickLoginButton();
                await login.assertErrorFirstMessage("Username is required"); 

                await login.clickLoginButton();
                await login.assertErrorLastMessage("Password is required"); 

                await login.fillUsername("Victor");
                await login.clickLoginButton();
                await login.assertErrorLastMessage("Password is required"); 

                await login.fillPassword("Password12345");
                await login.clickLoginButton();
                await login.assertModalErrorMessage(" Username or password wrong ");


                await page.waitForTimeout(1000);
        });

});



