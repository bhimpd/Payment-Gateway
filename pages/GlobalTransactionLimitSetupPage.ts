import { Page, Locator } from "@playwright/test";
import { Helper } from "../utils/helper";



export class GlobalTransactionLimitSetupPage {
    readonly page: Page;
    readonly helper: Helper;
    readonly globalTransactionLimitSetupSelector: Locator;
    readonly dfsGlobalTransactionLimitSetupTextSelector: Locator;
    readonly submitButtonSelector: Locator;
    readonly exitButtonSelector: Locator;
    readonly clientNameInputSelector: Locator;
    readonly clientNameLabelSelector: Locator;
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
    readonly clientNameCellSelector: Locator;

    readonly perTransactionMinAmountInputFieldSelector: Locator;
    readonly perTransactionMaxAmountInputFieldSelector: Locator;

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


    constructor(page: Page) {
        this.page = page;
        this.helper = new Helper(page);
        this.globalTransactionLimitSetupSelector = page.locator("a[href='#menu5']");
        this.dfsGlobalTransactionLimitSetupTextSelector = page.locator("h6.text-dark.font-weight-bold");
        this.submitButtonSelector = page.locator(".btn.btn-success.mr-2.ng-star-inserted");
        this.exitButtonSelector = page.locator(".btn.btn-danger");
        this.clientNameInputSelector = page.locator("#clientName");
        this.clientNameLabelSelector = page.locator("label").filter({ hasText: "Client Name" });
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
        this.clientNameCellSelector = page.locator(".pq-grid-cell").last().locator("div");

        this.perTransactionMinAmountInputFieldSelector = page.locator("input[formcontrolname='perTransactionMin']");
        this.perTransactionMaxAmountInputFieldSelector = page.locator("input[formcontrolname='perTransactionMax']");

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


    async clickGlobalTransactionLimitSetupMenu() {
        await this.globalTransactionLimitSetupSelector.click();
    }

    async assertGlobalTransactionLimitSetupText(expectedText: string) {
        await this.helper.assertText(this.dfsGlobalTransactionLimitSetupTextSelector, expectedText)
    }

    async assertSubmitButtonText(expectedText: string) {
        await this.helper.assertText(this.submitButtonSelector, expectedText);
    }

    async assertExitButtonText(expectedText: string) {
        await this.helper.assertText(this.exitButtonSelector, expectedText);
    }

    async assertClientNameLabelText(expectedText: string) {
        await this.helper.assertText(this.clientNameLabelSelector, expectedText);
    }

    async assertClientNamePlaceholderText(expectedText: string) {
        await this.helper.assertTextOnPlaceholder(this.clientNameInputSelector, expectedText);
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

    async assertGlobalTransactionLimitSetupPageAllUILabels() {
        await this.assertGlobalTransactionLimitSetupText("DFS Global Transaction Limit Setup");
        await this.assertSubmitButtonText("Submit");
        await this.assertExitButtonText("Exit");
        await this.assertClientNameLabelText("Client Name");
        await this.assertClientNamePlaceholderText("Client Name");
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


    async clickSelectedClient() {
        await this.clientNameCellSelector.click();
    }


    async fillPerTransactionMinAmount(expectedAmount: any) {
        // await this.perTransactionMinAmountInputFieldSelector.click();

        await this.perTransactionMinAmountInputFieldSelector.fill(expectedAmount);
    }

    async fillPerTransactionMaxAmount(expectedAmount: any) {
        // await this.perTransactionMaxAmountInputFieldSelector.click();

        await this.perTransactionMaxAmountInputFieldSelector.fill(expectedAmount);
    }

    async fillInwardDailyAmount(amount: any) {
        await this.inwardDailyAmountInputSelector.fill(amount);
    }
    async fillInwardWeeklyAmount(amount: any) {
        await this.inwardWeeklyAmountInputSelector.fill(amount);
    }
    async fillInwardMonthlyAmount(amount: any) {
        await this.inwardMonthlyAmountInputSelector.fill(amount);
    }
    async fillOutwardDailyAmount(amount: any) {
        await this.outwardDailyAmountInputSelector.fill(amount);
    }
    async fillOutwardWeeklyAmount(amount: any) {
        await this.outwardWeeklyAmountInputSelector.fill(amount);
    }
    async fillOutwardMonthlyAmount(amount: any) {
        await this.outwardMonthlyAmountInputSelector.fill(amount);
    }

    async fillInwardDailyCount(count: any) {
        await this.inwardDailyCountInputSelector.fill(count);
    }
    async fillInwardWeeklyCount(count: any) {
        await this.inwardWeeklyCountInputSelector.fill(count);
    }
    async fillInwardMonthlyCount(count: any) {
        await this.inwardMonthlyCountInputSelector.fill(count);
    }
    async fillOutwardDailyCount(count: any) {
        await this.outwardDailyCountInputSelector.fill(count);
    }
    async fillOutwardWeeklyCount(count: any) {
        await this.outwardWeeklyCountInputSelector.fill(count);
    }
    async fillOutwardMonthlyCount(count: any) {
        await this.outwardMonthlyCountInputSelector.fill(count);
    }



}
