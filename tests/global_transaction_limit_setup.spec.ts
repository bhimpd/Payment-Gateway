import { test, BrowserContext, Page } from '@playwright/test';
import { Helper } from '../utils/helper';
import { LoginPage } from '../pages/LoginPage';
import dotenv from 'dotenv';
import { GlobalTransactionLimitSetupPage } from '../pages/GlobalTransactionLimitSetupPage';
import { BasePage } from '../pages/Basepage';
import { BankLoginPage } from '../pages/BankLoginPage';
import { BankBasePage } from '../pages/BankBasePage';
import { BankGlobalTransactionLimitPage } from '../pages/BankGlobalTransactionLimitPage';

let context: BrowserContext;
let page: Page;
dotenv.config();

test.describe('Positive Cases :: Global Transaction Limit SetUp', () => {

    test.beforeAll(async ({ browser }) => {

        context = await browser.newContext();
        page = await context.newPage();
        const helper = new Helper(page);
        const login = new LoginPage(page);

        const pgBaseUrl = process.env.PG_BASEURL;
        const loginUrl = `${pgBaseUrl}#/auth/login`;;

        const pgUsername = process.env.PG_USERNAME;
        const pgPassword = process.env.PG_PASSWORD;

        if (!pgBaseUrl || !pgUsername || !pgPassword) {
            throw new Error('Environment variables PG_BASEURL, PG_USERNAME, or PG_PASSWORD are not defined!');
        }

        await context.clearCookies();

        await helper.visitPage(loginUrl);

        const dashboardUrl = `${pgBaseUrl}/#/gateway/dashboard`;

        await login.loginCredentials(pgUsername, pgPassword);

        await helper.assertURL(dashboardUrl);
        await login.assertUsername(pgUsername);
        await login.assertDashboardText("Dashboard");
        await page.waitForTimeout(1000);
    });



    test("TC_01: Positive:: Should Assert Global Transaction Limit SetUp Page All UI Fields", async () => {
        const globaltransactionlimitsetup = new GlobalTransactionLimitSetupPage(page);
        const helper = new Helper(page);
        const basepage = new BasePage(page);

        const pgBaseUrl = process.env.PG_BASEURL;
        await basepage.openMenu("Global Transaction Limit Setup");

        const globaltransactionlimitsetupUrl = `${pgBaseUrl}/#/gateway/global-transaction-limit-setup`;
        await helper.assertURL(globaltransactionlimitsetupUrl);
        await globaltransactionlimitsetup.assertGlobalTransactionLimitSetupPageAllUILabels();
        await basepage.assertSuccessfulMessage("DFS Setup has been successfully retrieved");
        await page.waitForTimeout(1000);

        await basepage.clickDashboardPaymentGatewayText();
        const dashboardPageUrl = `${pgBaseUrl}/#/gateway/dashboard`;
        await helper.assertURL(dashboardPageUrl);

        await page.waitForTimeout(5000);
    });

    test("TC_02: verify Selecting the Nagarik Client and Setting Up the Limit and Validating in the Banking Portal As well", async () => {
        const perTransactionMinAmount = "10";
        const perTransactionMaxAmount = "100000";
        const InOutDailyAmount = "999999";
        const InOutWeeklyAmount = "99999999";
        const InOutMonthlyAmount = "9999999999";
        const InOutDailyCount = "999";
        const InOutWeeklyCount = "9999";
        const InOutMonthlyCount = "99999";

        const globaltransactionlimitsetup = new GlobalTransactionLimitSetupPage(page);
        const helper = new Helper(page);
        const basepage = new BasePage(page);

        const pgBaseUrl = process.env.PG_BASEURL;
        await basepage.openMenu("Global Transaction Limit Setup");

        const globaltransactionlimitsetupUrl = `${pgBaseUrl}/#/gateway/global-transaction-limit-setup`;
        await helper.assertURL(globaltransactionlimitsetupUrl);
        await basepage.assertSuccessfulMessage("DFS Setup has been successfully retrieved");
        await basepage.clickClientNameSearch();
        await basepage.clickCntrlBackSpaceEnter();
        await basepage.fillClientId("535");
        await basepage.assertClientId("535");
        await basepage.assertClientName("1. Nagarik Saving And Credit Co-Operative l.t.d");
        await globaltransactionlimitsetup.clickSelectedClient();
        await page.waitForTimeout(1000);

        await globaltransactionlimitsetup.fillPerTransactionMinAmount(perTransactionMinAmount);
        await globaltransactionlimitsetup.fillPerTransactionMaxAmount(perTransactionMaxAmount);

        await globaltransactionlimitsetup.fillInwardDailyAmount(InOutDailyAmount);
        await globaltransactionlimitsetup.fillInwardWeeklyAmount(InOutWeeklyAmount);
        await globaltransactionlimitsetup.fillInwardMonthlyAmount(InOutMonthlyAmount);
        await globaltransactionlimitsetup.fillOutwardDailyAmount(InOutDailyAmount);
        await globaltransactionlimitsetup.fillOutwardWeeklyAmount(InOutWeeklyAmount);
        await globaltransactionlimitsetup.fillOutwardMonthlyAmount(InOutMonthlyAmount);
        await globaltransactionlimitsetup.fillInwardDailyCount(InOutDailyCount);
        await globaltransactionlimitsetup.fillInwardWeeklyCount(InOutWeeklyCount);
        await globaltransactionlimitsetup.fillInwardMonthlyCount(InOutMonthlyCount);
        await globaltransactionlimitsetup.fillOutwardDailyCount(InOutDailyCount);
        await globaltransactionlimitsetup.fillOutwardWeeklyCount(InOutWeeklyCount);
        await globaltransactionlimitsetup.fillOutwardMonthlyCount(InOutMonthlyCount);

        await basepage.clickSubmitButton();
        await basepage.assertAndClickConfirmButton();
        await basepage.assertSuccessfulMessage("DFS Setup has been successfully saved");
        await basepage.clickDashboardPaymentGatewayText();
        const dashboardPageUrl = `${pgBaseUrl}/#/gateway/dashboard`;
        await helper.assertURL(dashboardPageUrl);

        await page.waitForTimeout(2000);

        const bankingPage = await context.newPage();
        const banklogin = new BankLoginPage(bankingPage);
        const bankingHelper = new Helper(bankingPage);

        const bankBaseUrl = process.env.BANK_BASEURL;
        const bankLoginUrl = `${bankBaseUrl}#/auth/login`;

        const bankUsername = process.env.BANK_USERNAME;
        const bankPassword = process.env.BANK_PASSWORD;

        if (!bankBaseUrl || !bankUsername || !bankPassword) {
            throw new Error('Environment variables BANK_BASEURL, BANK_USERNAME, or BANK_PASSWORD are not defined!');
        }

        await bankingHelper.visitPage(bankLoginUrl);

        await banklogin.loginCredentials(bankUsername, bankPassword);
        await bankingPage.waitForTimeout(2000);
        // await bankingPage.reload({ waitUntil: 'networkidle' });

        const dashboardUrl = `${bankBaseUrl}/#/mDabali/dashboard`;
        await bankingHelper.assertURL(dashboardUrl);
        await banklogin.assertUsername(bankUsername);


        const bankBasePage = new BankBasePage(bankingPage);
        const bankGlobalTransactionLimitPage = new BankGlobalTransactionLimitPage(bankingPage);

        await bankBasePage.searchMenu("Global Transaction Limit Setup");
        await bankBasePage.clickSetupText();
        await bankGlobalTransactionLimitPage.clickGlobalTransactionLimitText();

        await bankGlobalTransactionLimitPage.assertDFSGlobalTransactionLimitPageAllUILabels();
        await bankGlobalTransactionLimitPage.assertPerTransactionMinAmountValue(perTransactionMinAmount);
        await bankGlobalTransactionLimitPage.assertPerTransactionMaxAmountValue(perTransactionMaxAmount);
        await bankGlobalTransactionLimitPage.assertInwardDailyAmountValue(InOutDailyAmount);
        await bankGlobalTransactionLimitPage.assertInwardWeeklyAmountValue(InOutWeeklyAmount);
        await bankGlobalTransactionLimitPage.assertInwardMonthlyAmountValue(InOutMonthlyAmount);
        await bankGlobalTransactionLimitPage.assertOutwardDailyAmountValue(InOutDailyAmount);
        await bankGlobalTransactionLimitPage.assertOutwardWeeklyAmountValue(InOutWeeklyAmount);
        await bankGlobalTransactionLimitPage.assertOutwardMonthlyAmountValue(InOutMonthlyAmount);
        await bankGlobalTransactionLimitPage.assertInwardDailyCountValue(InOutDailyCount);
        await bankGlobalTransactionLimitPage.assertInwardWeeklyCountValue(InOutWeeklyCount);
        await bankGlobalTransactionLimitPage.assertInwardMonthlyCountValue(InOutMonthlyCount);
        await bankGlobalTransactionLimitPage.assertOutwardDailyCountValue(InOutDailyCount);
        await bankGlobalTransactionLimitPage.assertOutwardWeeklyCountValue(InOutWeeklyCount);
        await bankGlobalTransactionLimitPage.assertOutwardMonthlyCountValue(InOutMonthlyCount);

        await bankingPage.waitForTimeout(2000);

    });

    test.afterAll(async () => {
        await context.close();
    });


});
