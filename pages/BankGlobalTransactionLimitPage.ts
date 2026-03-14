import { Page, Locator, expect } from "@playwright/test";
import { Helper } from "../utils/helper";


export class BankGlobalTransactionLimitPage {

    readonly page: Page;
    readonly helper: Helper;
    readonly globalTransactionLimitTextSelector: Locator;
    readonly dfsGlobalTransactionLimitHeaderSelector: Locator;
    readonly perTransactionMinimumAmountLabelSelector: Locator;
    readonly perTransactionMaximumAmountLabelSelector: Locator;
    readonly titleHeaderSelector: Locator;
    readonly inwardTransactionHeaderSelector: Locator;
    readonly outwardTransactionHeaderSelector: Locator;
    readonly optionsLabelSelector: Locator;
    readonly inwardDailyLabelSelector: Locator;
    readonly inwardWeeklyLabelSelector: Locator;
    readonly inwardMonthlyLabelSelector: Locator;
    readonly outwardDailyLabelSelector: Locator;
    readonly outwardWeeklyLabelSelector: Locator;
    readonly outwardMonthlyLabelSelector: Locator;
    readonly transactionAmountLabelSelector: Locator;
    readonly countLabelSelector: Locator;

    readonly perTransactionMinAmountInputSelector: Locator;
    readonly perTransactionMaxAmountInputSelector: Locator;

    readonly inwardDailyAmountInputSelector: Locator;
    readonly inwardWeeklyAmountInputSelector: Locator;
    readonly inwardMonthlyAmountInputSelector: Locator;
    readonly outwardDailyAmountInputSelector: Locator;
    readonly outwardWeeklyAmountInputSelector: Locator;
    readonly outwardMonthlyAmountInputSelector: Locator;

    readonly inwardDailyCountInputSelector: Locator;
    readonly inwardWeeklyCountInputSelector: Locator;
    readonly inwardMonthlyCountInputSelector: Locator;
    readonly outwardDailyCountInputSelector: Locator;
    readonly outwardWeeklyCountInputSelector: Locator;
    readonly outwardMonthlyCountInputSelector: Locator;

    // Common menu selectors



    constructor(page: Page) {

        this.page = page;
        this.helper = new Helper(page);
        this.globalTransactionLimitTextSelector = page.getByRole('link', { name: 'Global Transaction Limit Setup' });
        this.dfsGlobalTransactionLimitHeaderSelector = page.locator("h6.text-dark.font-weight-bold");
        this.perTransactionMinimumAmountLabelSelector = page.locator("label").filter({ hasText: "Per Transaction Minimum Amount" });
        this.perTransactionMaximumAmountLabelSelector = page.locator("label").filter({ hasText: "Per Transaction Maximum Amount" });
        this.titleHeaderSelector = page.locator("th", { hasText: "Title" });
        this.inwardTransactionHeaderSelector = page.locator("th", { hasText: "Inward Transaction" });
        this.outwardTransactionHeaderSelector = page.locator("th", { hasText: "Outward Transaction" });
        this.optionsLabelSelector = page.getByText("Options", { exact: true });
        this.inwardDailyLabelSelector = page.getByText("Daily", { exact: true }).nth(0);
        this.inwardWeeklyLabelSelector = page.getByText("Weekly", { exact: true }).nth(0);
        this.inwardMonthlyLabelSelector = page.getByText("Monthly", { exact: true }).nth(0);
        this.outwardDailyLabelSelector = page.getByText("Daily", { exact: true }).nth(1);
        this.outwardWeeklyLabelSelector = page.getByText("Weekly", { exact: true }).nth(1);
        this.outwardMonthlyLabelSelector = page.getByText("Monthly", { exact: true }).nth(1);
        this.transactionAmountLabelSelector = page.getByText("Transaction Amount", { exact: true });
        this.countLabelSelector = page.getByText("Count", { exact: true });

        this.perTransactionMinAmountInputSelector = page.locator("input[formcontrolname='perTransactionMin']");
        this.perTransactionMaxAmountInputSelector = page.locator("input[formcontrolname='perTransactionMax']");

        this.inwardDailyAmountInputSelector = page.locator("tbody tr:nth-child(2) td:nth-child(2) input");
        this.inwardWeeklyAmountInputSelector = page.locator("tbody tr:nth-child(2) td:nth-child(3) input");
        this.inwardMonthlyAmountInputSelector = page.locator("tbody tr:nth-child(2) td:nth-child(4) input");
        this.outwardDailyAmountInputSelector = page.locator("tbody tr:nth-child(2) td:nth-child(5) input");
        this.outwardWeeklyAmountInputSelector = page.locator("tbody tr:nth-child(2) td:nth-child(6) input");
        this.outwardMonthlyAmountInputSelector = page.locator("tbody tr:nth-child(2) td:nth-child(7) input");

        this.inwardDailyCountInputSelector = page.locator("tbody tr:nth-child(3) td:nth-child(2) input");
        this.inwardWeeklyCountInputSelector = page.locator("tbody tr:nth-child(3) td:nth-child(3) input");
        this.inwardMonthlyCountInputSelector = page.locator("tbody tr:nth-child(3) td:nth-child(4) input");
        this.outwardDailyCountInputSelector = page.locator("tbody tr:nth-child(3) td:nth-child(5) input");
        this.outwardWeeklyCountInputSelector = page.locator("tbody tr:nth-child(3) td:nth-child(6) input");
        this.outwardMonthlyCountInputSelector = page.locator("tbody tr:nth-child(3) td:nth-child(7) input");



    }


    async clickGlobalTransactionLimitText() {
        await this.globalTransactionLimitTextSelector.click();
    }


    async assertDFSGlobalTransactionLimitHeaderText(expectedText: string) {
        await this.helper.assertText(this.dfsGlobalTransactionLimitHeaderSelector, expectedText);
    }

    async assertPerTransactionMinimumAmountLabelText(expectedText: string) {
        await this.helper.assertText(this.perTransactionMinimumAmountLabelSelector, expectedText);
    }

    async assertPerTransactionMaximumAmountLabelText(expectedText: string) {
        await this.helper.assertText(this.perTransactionMaximumAmountLabelSelector, expectedText);
    }

    async assertTitleHeaderText(expectedText: string) {
        await this.helper.assertText(this.titleHeaderSelector, expectedText);
    }

    async assertInwardTransactionHeaderText(expectedText: string) {
        await this.helper.assertText(this.inwardTransactionHeaderSelector, expectedText);
    }

    async assertOutwardTransactionHeaderText(expectedText: string) {
        await this.helper.assertText(this.outwardTransactionHeaderSelector, expectedText);
    }

    async assertOptionsLabelText(expectedText: string) {
        await this.helper.assertText(this.optionsLabelSelector, expectedText);
    }

    async assertInwardDailyLabelText(expectedText: string) {
        await this.helper.assertText(this.inwardDailyLabelSelector, expectedText);
    }

    async assertInwardWeeklyLabelText(expectedText: string) {
        await this.helper.assertText(this.inwardWeeklyLabelSelector, expectedText);
    }

    async assertInwardMonthlyLabelText(expectedText: string) {
        await this.helper.assertText(this.inwardMonthlyLabelSelector, expectedText);
    }

    async assertOutwardDailyLabelText(expectedText: string) {
        await this.helper.assertText(this.outwardDailyLabelSelector, expectedText);
    }

    async assertOutwardWeeklyLabelText(expectedText: string) {
        await this.helper.assertText(this.outwardWeeklyLabelSelector, expectedText);
    }

    async assertOutwardMonthlyLabelText(expectedText: string) {
        await this.helper.assertText(this.outwardMonthlyLabelSelector, expectedText);
    }

    async assertTransactionAmountLabelText(expectedText: string) {
        await this.helper.assertText(this.transactionAmountLabelSelector, expectedText);
    }

    async assertCountLabelText(expectedText: string) {
        await this.helper.assertText(this.countLabelSelector, expectedText);
    }

    async assertDFSGlobalTransactionLimitPageAllUILabels() {
        await this.assertDFSGlobalTransactionLimitHeaderText("DFS Global Transaction Limit");
        await this.assertPerTransactionMinimumAmountLabelText("Per Transaction Minimum Amount");
        await this.assertPerTransactionMaximumAmountLabelText("Per Transaction Maximum Amount");
        await this.assertTitleHeaderText("Title");
        await this.assertInwardTransactionHeaderText("Inward Transaction");
        await this.assertOutwardTransactionHeaderText("Outward Transaction");
        await this.assertOptionsLabelText("Options");
        await this.assertInwardDailyLabelText("Daily");
        await this.assertInwardWeeklyLabelText("Weekly");
        await this.assertInwardMonthlyLabelText("Monthly");
        await this.assertOutwardDailyLabelText("Daily");
        await this.assertOutwardWeeklyLabelText("Weekly");
        await this.assertOutwardMonthlyLabelText("Monthly");
        await this.assertTransactionAmountLabelText("Transaction Amount");
        await this.assertCountLabelText("Count");
    }


    async assertPerTransactionMinAmountValue(expectedAmount: any) {
        await this.helper.assertNumericInputValue(this.perTransactionMinAmountInputSelector, expectedAmount);
    }

    async assertPerTransactionMaxAmountValue(expectedAmount: any) {
        await this.helper.assertNumericInputValue(this.perTransactionMaxAmountInputSelector, expectedAmount);
    }

    async assertInwardDailyAmountValue(expectedAmount: any) {
        await this.helper.assertNumericInputValue(this.inwardDailyAmountInputSelector, expectedAmount);
    }

    async assertInwardWeeklyAmountValue(expectedAmount: any) {
        await this.helper.assertNumericInputValue(this.inwardWeeklyAmountInputSelector, expectedAmount);
    }

    async assertInwardMonthlyAmountValue(expectedAmount: any) {
        await this.helper.assertNumericInputValue(this.inwardMonthlyAmountInputSelector, expectedAmount);
    }

    async assertOutwardDailyAmountValue(expectedAmount: any) {
        await this.helper.assertNumericInputValue(this.outwardDailyAmountInputSelector, expectedAmount);
    }

    async assertOutwardWeeklyAmountValue(expectedAmount: any) {
        await this.helper.assertNumericInputValue(this.outwardWeeklyAmountInputSelector, expectedAmount);
    }

    async assertOutwardMonthlyAmountValue(expectedAmount: any) {
        await this.helper.assertNumericInputValue(this.outwardMonthlyAmountInputSelector, expectedAmount);
    }

    async assertInwardDailyCountValue(expectedCount: any) {
        await this.helper.assertNumericInputValue(this.inwardDailyCountInputSelector, expectedCount);
    }

    async assertInwardWeeklyCountValue(expectedCount: any) {
        await this.helper.assertNumericInputValue(this.inwardWeeklyCountInputSelector, expectedCount);
    }

    async assertInwardMonthlyCountValue(expectedCount: any) {
        await this.helper.assertNumericInputValue(this.inwardMonthlyCountInputSelector, expectedCount);
    }

    async assertOutwardDailyCountValue(expectedCount: any) {
        await this.helper.assertNumericInputValue(this.outwardDailyCountInputSelector, expectedCount);
    }

    async assertOutwardWeeklyCountValue(expectedCount: any) {
        await this.helper.assertNumericInputValue(this.outwardWeeklyCountInputSelector, expectedCount);
    }

    async assertOutwardMonthlyCountValue(expectedCount: any) {
        await this.helper.assertNumericInputValue(this.outwardMonthlyCountInputSelector, expectedCount);
    }



}
