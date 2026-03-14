import { test, expect } from '@playwright/test';
import { Helper } from '../utils/helper';
import { CredentialSetupPage } from '../pages/CredentialSetupPage';
import { generateAccountDetails } from '../utils/testAccountInfoData';
import bankFormData from "../fixtures/bankFormData.json";
import { LoginPage } from '../pages/LoginPage';


import dotenv from 'dotenv';

dotenv.config();

test.describe('Positive Cases :: Credential Setup - Serial Execution', () => {

    test.beforeEach(async ({ page }) => {
        const helper = new Helper(page);
        const login = new LoginPage(page);

        const pgBaseUrl = process.env.PG_BASEURL;
        const loginUrl = `${pgBaseUrl}#/auth/login`;

        const pgUsername = process.env.PG_USERNAME;
        const pgPassword = process.env.PG_PASSWORD;

        if (!pgBaseUrl || !pgUsername || !pgPassword) {
            throw new Error('Environment variables PG_BASEURL, PG_USERNAME, or PG_PASSWORD are not defined!');
        }

        const context = page.context();
        await context.clearCookies();

        await helper.visitPage(loginUrl);

        const dashboardUrl = `${pgBaseUrl}/#/gateway/dashboard`;

        await login.loginCredentials(pgUsername, pgPassword);

        await helper.assertURL(dashboardUrl);
        await login.assertUsername(pgUsername);
        await login.assertDashboardText("Dashboard");
        await page.waitForTimeout(1000);
    });

    test('TC_01:Positive::Should create the new bank account and assert their bank info', async ({ page }) => {
        const credentialsetup = new CredentialSetupPage(page);
        const helper = new Helper(page);
        const { accountName, accountNumber } = generateAccountDetails();


        const pgBaseUrl = process.env.PG_BASEURL;


        await credentialsetup.openMenu("Credential Setup");

        const credentialsetupUrl = `${pgBaseUrl}/#/gateway/credential-setup`;
        await helper.assertURL(credentialsetupUrl);
        await credentialsetup.assertCredentialSetupPageText("Credential Setup");


        await credentialsetup.assertCreateBUttonText("Create");
        await credentialsetup.clickCreateButton();

        const credentialsetupCreateUrl = `${pgBaseUrl}/#/gateway/credential-setup/create`;
        await helper.assertURL(credentialsetupCreateUrl);


        await credentialsetup.assertBankNameLabel("Bank Name *");
        await credentialsetup.assertBankURLLabel("Bank URL *");
        await credentialsetup.assertUsernameLabel("Username *");
        await credentialsetup.assertPasswordLabel("Password *");

        await credentialsetup.clickBankNameSearchIcon();

        await credentialsetup.assertBankListLabel("Bank List");
        await credentialsetup.assertBankName("Bank Name");

        await credentialsetup.clickBankNameSearchInput();
        await credentialsetup.SearchNClickBank("NIC ASIA BANK LTD.");

        await credentialsetup.assertnClickBank("NIC ASIA BANK LTD.");
        await page.waitForTimeout(500);

        await credentialsetup.assertSelectedBankNamePlaceholder("NIC ASIA BANK LTD.");


        await credentialsetup.fillBankInfo("https://nicasia.com.np/login", "NIC_USER_NO:1", "Password1!");

        await expect(page.locator('h5', { hasText: 'Bank Account Details' })).toHaveText('Bank Account Details');


        await credentialsetup.assertAddAccountLabel("Add Account");
        await credentialsetup.clickAddAccountButton();

        await credentialsetup.assertAccountNameLabel("Account Name *");
        await credentialsetup.assertAccountNumberLabel("Account Number *");
        await credentialsetup.assertPrimaryLabel("Primary");

        await credentialsetup.fillAccountName(accountName);
        await credentialsetup.fillAccountNumber(accountNumber);

        // *************** This method is not working as expected *************
        // await credentialsetup.fillAccountDetails(accountName, accountNumber);


        await credentialsetup.assertPrimaryLevelCheckBox();
        await credentialsetup.assertRemoveButtonLabel("Remove");
        await credentialsetup.assertSaveButtonLabel("Save");
        await credentialsetup.clickSaveButton();


        // await credentialsetup.assertModalLabels("Are you sure you want to save changes?", "Cancel", "Confirm");
        // await credentialsetup.clickConfirmButton();
        // await credentialsetup.assertSuccessfulMessage(" Client Bank Credential Setup has been saved successfully ");


        await credentialsetup.confirmAndAssertSuccess();

        await page.waitForTimeout(1000);
        await helper.assertURL(credentialsetupUrl);

        await credentialsetup.SearchNClickByBankName("NIC ASIA BANK LTD.");
        await credentialsetup.assertBankDetails('NIC ASIA BANK LTD.', 'https://nicasia.com.np/login', 'NIC_USER_NO:1', 'View Account Details');

        await credentialsetup.assertAccountDetailsLabel("Account Details List");
        await credentialsetup.searchByAccountNumber(accountNumber);
        await credentialsetup.assertBankAccountDetails(accountName, accountNumber);

        await page.waitForTimeout(5000);


    });

    test("TC_02:Positive:: Should edit the bank account by updating the already existing bank info", async ({ page }) => {
        const credentialsetup = new CredentialSetupPage(page);
        const helper = new Helper(page);
        const { accountName, accountNumber } = generateAccountDetails();


        const pgBaseUrl = process.env.PG_BASEURL;


        await credentialsetup.openMenu("Credential Setup");

        const credentialsetupUrl = `${pgBaseUrl}/#/gateway/credential-setup`;
        await helper.assertURL(credentialsetupUrl);
        await credentialsetup.assertCredentialSetupPageText("Credential Setup");
        await credentialsetup.SearchNClickByBankName("NIC ASIA BANK LTD.");
        // await credentialsetup.assertBankDetails('NIC ASIA BANK LTD.','https://nicasia.com.np/login','NIC_USER_NO:1','View Account Details');

        await credentialsetup.clickEditIconButton();
        const bankIdURl = `${pgBaseUrl}/#/gateway/credential-setup/edit/14`;
        await helper.assertURL(bankIdURl);

        await credentialsetup.assertSelectedBankNamePlaceholder("NIC ASIA BANK LTD.");
        await credentialsetup.assertBankUrlOnEditPage("https://nicasia.com.np/login");
        await credentialsetup.assertBankUsernameOnEditPage("NIC_USER_NO:1");

        await credentialsetup.fillAccountName(accountName);
        await credentialsetup.fillAccountNumber(accountNumber);

        await credentialsetup.clickUpdateButton();

        // await credentialsetup.assertModalLabels("Are you sure you want to save changes?", "Cancel", "Confirm");
        // await credentialsetup.clickConfirmButton();
        // await credentialsetup.assertSuccessfulMessage(" Client Bank Credential Setup has been saved successfully ");

        await credentialsetup.confirmAndAssertSuccess();
        await page.waitForTimeout(1000);

        const credentialsetupCreateUrl = `${pgBaseUrl}/#/gateway/credential-setup`;
        await helper.assertURL(credentialsetupCreateUrl);

        await page.waitForTimeout(1000);

        await credentialsetup.SearchNClickByBankName("NIC ASIA BANK LTD.");
        await credentialsetup.assertBankDetails('NIC ASIA BANK LTD.', 'https://nicasia.com.np/login', 'NIC_USER_NO:1', 'View Account Details');

        await credentialsetup.searchByAccountNumber(accountNumber);
        await credentialsetup.assertBankAccountDetails(accountName, accountNumber);

        await page.waitForTimeout(5000);

    });

    test("TC_03: Positive:: Should edit the bank account by creating new bank account ", async ({ page }) => {
        const credentialsetup = new CredentialSetupPage(page);
        const helper = new Helper(page);
        const { accountName, accountNumber } = generateAccountDetails();


        const pgBaseUrl = process.env.PG_BASEURL;


        await credentialsetup.openMenu("Credential Setup");

        const credentialsetupUrl = `${pgBaseUrl}/#/gateway/credential-setup`;
        await helper.assertURL(credentialsetupUrl);
        await credentialsetup.assertCredentialSetupPageText("Credential Setup");
        await credentialsetup.SearchNClickByBankName("NIC ASIA BANK LTD.");
        // await credentialsetup.assertBankDetails('NIC ASIA BANK LTD.','https://nicasia.com.np/login','NIC_USER_NO:1','View Account Details');

        await page.waitForTimeout(1000);
        await credentialsetup.clickEditIconButton();
        const bankIdURl = `${pgBaseUrl}/#/gateway/credential-setup/edit/14`;
        await helper.assertURL(bankIdURl);

        await credentialsetup.assertSelectedBankNamePlaceholder("NIC ASIA BANK LTD.");
        await credentialsetup.assertBankUrlOnEditPage("https://nicasia.com.np/login");
        await credentialsetup.assertBankUsernameOnEditPage("NIC_USER_NO:1");

        await credentialsetup.clickAddAccountButton();
        await credentialsetup.fillAccountName(accountName);
        await credentialsetup.fillAccountNumber(accountNumber);

        await credentialsetup.assertUpdateButtonLabel("Update");
        await credentialsetup.clickUpdateButton();

        await credentialsetup.confirmAndAssertSuccess();
        await page.waitForTimeout(1000);

        const credentialsetupCreateUrl = `${pgBaseUrl}/#/gateway/credential-setup`;
        await helper.assertURL(credentialsetupCreateUrl);

        await page.waitForTimeout(1000);

        await credentialsetup.SearchNClickByBankName("NIC ASIA BANK LTD.");
        await credentialsetup.assertBankDetails('NIC ASIA BANK LTD.', 'https://nicasia.com.np/login', 'NIC_USER_NO:1', 'View Account Details');

        await credentialsetup.searchByAccountNumber(accountNumber);
        await credentialsetup.assertBankAccountDetails(accountName, accountNumber);
        await page.waitForTimeout(5000);

    });

    test("TC_04: Positive:: Should delete the bank account details info", async ({ page }) => {
        const credentialsetup = new CredentialSetupPage(page);
        const helper = new Helper(page);

        const pgBaseUrl = process.env.PG_BASEURL;

        await credentialsetup.openMenu("Credential Setup");

        const credentialsetupUrl = `${pgBaseUrl}/#/gateway/credential-setup`;
        await helper.assertURL(credentialsetupUrl);
        await credentialsetup.assertCredentialSetupPageText("Credential Setup");
        await credentialsetup.SearchNClickByBankName("NIC ASIA BANK LTD.");
        // await credentialsetup.assertBankDetails('NIC ASIA BANK LTD.','https://nicasia.com.np/login','NIC_USER_NO:1','View Account Details');

        await page.waitForTimeout(1000);
        await credentialsetup.clickEditIconButton();
        const bankIdURl = `${pgBaseUrl}/#/gateway/credential-setup/edit/14`;
        await helper.assertURL(bankIdURl);

        await credentialsetup.assertSelectedBankNamePlaceholder("NIC ASIA BANK LTD.");
        await credentialsetup.assertBankUrlOnEditPage("https://nicasia.com.np/login");
        await credentialsetup.assertBankUsernameOnEditPage("NIC_USER_NO:1");

        const deletedAccountNumber = await credentialsetup.getLastAccountNumber();
        console.log("TO BE DELETED ACCOUNT NUMBER :: ", deletedAccountNumber);

        await credentialsetup.assertAndClickRemoveButtonLast("Remove");
        await credentialsetup.confirmAndAssertProceedAnyway();

        await credentialsetup.clickUpdateButton();
        await credentialsetup.confirmAndAssertSuccess();

        await page.waitForTimeout(1000);

        const credentialsetupCreateUrl = `${pgBaseUrl}/#/gateway/credential-setup`;
        await helper.assertURL(credentialsetupCreateUrl);

        await page.waitForTimeout(1000);

        await credentialsetup.SearchNClickByBankName("NIC ASIA BANK LTD.");
        await credentialsetup.assertBankDetails('NIC ASIA BANK LTD.', 'https://nicasia.com.np/login', 'NIC_USER_NO:1', 'View Account Details');
        await credentialsetup.searchByAccountNumber(deletedAccountNumber);
        await page.waitForTimeout(2000);

        await credentialsetup.assertNoRowDataLabel();

        await page.waitForTimeout(5000);
    });

    test("TC_05: Positive : Should asert the table columns in Credentials Setup Page", async ({ page }) => {
        const credentialsetup = new CredentialSetupPage(page);
        const helper = new Helper(page);

        const pgBaseUrl = process.env.PG_BASEURL;


        await credentialsetup.openMenu("Credential Setup");

        const credentialsetupUrl = `${pgBaseUrl}/#/gateway/credential-setup`;
        await helper.assertURL(credentialsetupUrl);
        await credentialsetup.assertCredentialSetupPageText("Credential Setup");

        await helper.assertTableCoulmnHeaders("Bank Name", "Bank URL", "User Name", "Account Detail", "Action");

        await page.waitForTimeout(2000);
    });

    test("TC_06: Positive : Should asert the table columns in Bank Setup Page", async ({ page }) => {
        const credentialsetup = new CredentialSetupPage(page);
        const helper = new Helper(page);

        const pgBaseUrl = process.env.PG_BASEURL;


        await credentialsetup.openMenu("Bank Setup");

        const credentialsetupUrl = `${pgBaseUrl}/#/gateway/bank-transfer/bank-list`;
        await helper.assertURL(credentialsetupUrl);
        await credentialsetup.assertCredentialSetupPageText("Bank List");

        await helper.assertTableCoulmnHeaders("Bank Name", "eSewa Bank Code", "NCHL Bank Code", "Entry Date", "Is Active", "Action");

        await page.waitForTimeout(2000);
    });


});


test.describe('Negative Cases :: Credential Setup - Serial Execution', () => {

    test.beforeEach(async ({ page }) => {
        const helper = new Helper(page);
        const login = new LoginPage(page);

        const pgBaseUrl = process.env.PG_BASEURL;
        const loginUrl = `${pgBaseUrl}#/auth/login`;

        const pgUsername = process.env.PG_USERNAME;
        const pgPassword = process.env.PG_PASSWORD;

        if (!pgBaseUrl || !pgUsername || !pgPassword) {
            throw new Error('Environment variables PG_BASEURL, PG_USERNAME, or PG_PASSWORD are not defined!');
        }

        const context = page.context();
        await context.clearCookies();

        await helper.visitPage(loginUrl);

        const dashboardUrl = `${pgBaseUrl}/#/gateway/dashboard`;

        await login.loginCredentials(pgUsername, pgPassword);

        await helper.assertURL(dashboardUrl);
        await login.assertUsername(pgUsername);
        await login.assertDashboardText("Dashboard");
        await page.waitForTimeout(1000);
    });


    test("TC_05: Negative:: Should Assert 'Cannot Delete the Primary Bank Account'", async ({ page }) => {
        const credentialsetup = new CredentialSetupPage(page);
        const helper = new Helper(page);

        const pgBaseUrl = process.env.PG_BASEURL;

        await credentialsetup.openMenu("Credential Setup");

        const credentialsetupUrl = `${pgBaseUrl}/#/gateway/credential-setup`;
        await helper.assertURL(credentialsetupUrl);
        await credentialsetup.assertCredentialSetupPageText("Credential Setup");
        await credentialsetup.SearchNClickByBankName("NIC ASIA BANK LTD.");

        await page.waitForTimeout(1000);
        await credentialsetup.clickEditIconButton();
        const bankIdURl = `${pgBaseUrl}/#/gateway/credential-setup/edit/14`;
        await helper.assertURL(bankIdURl);

        await credentialsetup.assertSelectedBankNamePlaceholder("NIC ASIA BANK LTD.");
        await credentialsetup.assertBankUrlOnEditPage("https://nicasia.com.np/login");
        await credentialsetup.assertBankUsernameOnEditPage("NIC_USER_NO:1");

        await credentialsetup.clickRemoveFirstBankDetail();
        await credentialsetup.assertPrimaryAccountDeletionText(" Primary Account cannot be removed ");

        await page.waitForTimeout(5000);
    });

    test("TC_06 : Negative :: Should assert empty form validation", async ({ page }) => {
        const credentialsetup = new CredentialSetupPage(page);
        const helper = new Helper(page);

        const pgBaseUrl = process.env.PG_BASEURL;


        await credentialsetup.openMenu("Credential Setup");

        const credentialsetupUrl = `${pgBaseUrl}/#/gateway/credential-setup`;
        await helper.assertURL(credentialsetupUrl);
        await credentialsetup.assertCredentialSetupPageText("Credential Setup");


        await credentialsetup.assertCreateBUttonText("Create");
        await credentialsetup.clickCreateButton();

        const credentialsetupCreateUrl = `${pgBaseUrl}/#/gateway/credential-setup/create`;
        await helper.assertURL(credentialsetupCreateUrl);

        await credentialsetup.clickSaveButton();

        await credentialsetup.assertErrorMessage(bankFormData[0].expectedErrors);

    });

    test("TC_07 : Negative :: Should assert for no account added", async ({ page }) => {
        const credentialsetup = new CredentialSetupPage(page);
        const helper = new Helper(page);

        const pgBaseUrl = process.env.PG_BASEURL;


        await credentialsetup.openMenu("Credential Setup");

        const credentialsetupUrl = `${pgBaseUrl}/#/gateway/credential-setup`;
        await helper.assertURL(credentialsetupUrl);
        await credentialsetup.assertCredentialSetupPageText("Credential Setup");


        await credentialsetup.assertCreateBUttonText("Create");
        await credentialsetup.clickCreateButton();

        const credentialsetupCreateUrl = `${pgBaseUrl}/#/gateway/credential-setup/create`;
        await helper.assertURL(credentialsetupCreateUrl);
        await credentialsetup.fillBankInfo("https://nicasia.com.np/login", "NIC_USER_NO:1", "Password1!");

        await credentialsetup.clickSaveButton();
        await credentialsetup.assertAtLeastOneAccountLabel(" Please add at least one account. ");



    });

    test("TC_08 : Negative :: Should assert for  bank account details fields empty", async ({ page }) => {
        const credentialsetup = new CredentialSetupPage(page);
        const helper = new Helper(page);

        const pgBaseUrl = process.env.PG_BASEURL;


        await credentialsetup.openMenu("Credential Setup");

        const credentialsetupUrl = `${pgBaseUrl}/#/gateway/credential-setup`;
        await helper.assertURL(credentialsetupUrl);
        await credentialsetup.assertCredentialSetupPageText("Credential Setup");


        await credentialsetup.assertCreateBUttonText("Create");
        await credentialsetup.clickCreateButton();

        const credentialsetupCreateUrl = `${pgBaseUrl}/#/gateway/credential-setup/create`;
        await helper.assertURL(credentialsetupCreateUrl);
        await credentialsetup.fillBankInfo("https://nicasia.com.np/login", "NIC_USER_NO:1", "Password1!");
        await credentialsetup.clickAddAccountButton();


        await credentialsetup.clickSaveButton();
        await credentialsetup.assertBankDetailsErrorMessage(bankFormData[2].expectedErrors);



    });

    test("TC_09 : Negative :: Should assert for  no BankID", async ({ page }) => {
        const credentialsetup = new CredentialSetupPage(page);
        const helper = new Helper(page);
        const { accountName, accountNumber } = generateAccountDetails();


        const pgBaseUrl = process.env.PG_BASEURL;


        await credentialsetup.openMenu("Credential Setup");

        const credentialsetupUrl = `${pgBaseUrl}/#/gateway/credential-setup`;
        await helper.assertURL(credentialsetupUrl);
        await credentialsetup.assertCredentialSetupPageText("Credential Setup");


        await credentialsetup.assertCreateBUttonText("Create");
        await credentialsetup.clickCreateButton();

        const credentialsetupCreateUrl = `${pgBaseUrl}/#/gateway/credential-setup/create`;
        await helper.assertURL(credentialsetupCreateUrl);
        await credentialsetup.fillBankInfo("https://nicasia.com.np/login", "NIC_USER_NO:1", "Password1!");
        await credentialsetup.clickAddAccountButton();

        await credentialsetup.fillAccountName(accountName);
        await credentialsetup.fillAccountNumber(accountNumber);


        await credentialsetup.clickSaveButton();
        await credentialsetup.confirmAndAssertFailure();
    });


});
