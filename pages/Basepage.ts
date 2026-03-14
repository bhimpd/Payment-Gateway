import { Page, Locator } from "@playwright/test";
import { Helper } from "../utils/helper";
import { ModalMessages, ButtonLabels } from "../utils/constant";


export class BasePage {

    readonly page: Page;
    readonly helper: Helper;

    // Common menu selectors
    readonly searchParameterSelector: Locator;
    readonly menuItemSelector: Locator;
    // readonly menuLabelSelector: Locator;
    readonly alertDialogSuccessSelector: Locator;
    readonly dashboardPaymentGatewayTextSelector: Locator;
    readonly clientnameSearchSelector: Locator;
    readonly clientIdSearchSelector: Locator;
    readonly clientIdCellSelector: Locator;
    readonly clientNameCellSelector: Locator;

    readonly submitButtonLabelSelector: Locator;
    readonly modalConfirmLabelSelector: Locator;
    readonly alertDescLabelSelector: Locator;
    readonly modalCancelLabelSelector: Locator;



    constructor(page: Page) {

        this.page = page;
        this.helper = new Helper(page);

        this.searchParameterSelector = page.locator("#searchMenuByCode");
        this.menuItemSelector = page.locator("a[href='#menu5']");
        this.alertDialogSuccessSelector = page.locator("div[role='alertdialog']");
        this.dashboardPaymentGatewayTextSelector = page.locator("h6.sidebar-header");
        this.clientnameSearchSelector = page.locator("#button-addon2");
        this.clientIdSearchSelector = page.locator("input[name='id'].pq-grid-hd-search-field");
        this.clientIdCellSelector = page.locator(".pq-grid-cell").nth(0).locator("div");
        this.clientNameCellSelector = page.locator(".pq-grid-cell").last().locator("div");
        this.submitButtonLabelSelector = page.locator("button.btn.btn-success.ng-star-inserted");
        this.modalConfirmLabelSelector = page.locator("#confirmBtn");
        this.alertDescLabelSelector = page.locator("p.alert-desc");
        this.modalCancelLabelSelector = page.locator("#cancelBtn");
        this.modalConfirmLabelSelector = page.locator("#confirmBtn");

    }

    async searchMenu(menuName: string) {
        await this.helper.fillSearchParameterNClick(this.searchParameterSelector, menuName);
    }

    async assertMenuText(expectedText: string) {
        await this.helper.assertText(this.menuItemSelector, expectedText);
    }

    async clickMenu() {
        await this.menuItemSelector.click();
    }

    async openMenu(menuName: string) {
        await this.searchMenu(menuName);
        await this.assertMenuText(menuName);
        await this.clickMenu();
    }


    async assertSuccessfulMessage(expectedText: string) {
        await this.helper.assertText(this.alertDialogSuccessSelector, expectedText)
    }


    async clickDashboardPaymentGatewayText() {
        await this.dashboardPaymentGatewayTextSelector.click();
    }

    async clickClientNameSearch() {
        await this.clientnameSearchSelector.click();
    }


    async clickCntrlBackSpaceEnter() {
        await this.clientIdSearchSelector.click();
        await this.clientIdSearchSelector.press('Control+A');
        await this.clientIdSearchSelector.press('Backspace');
        await this.clientIdSearchSelector.press('Enter');
        await this.page.waitForTimeout(1500);
    }

    async fillClientId(clientId: string) {
        await this.clientIdSearchSelector.fill(clientId);
        await this.clientIdSearchSelector.press('Enter');
        await this.page.waitForTimeout(1500);


    }


    async assertClientId(expectedText: string) {
        await this.helper.assertText(this.clientIdCellSelector, expectedText);
    }

    async assertClientName(expectedText: string) {
        await this.helper.assertText(this.clientNameCellSelector, expectedText);
    }


    async clickSubmitButton() {
        await this.submitButtonLabelSelector.click();
    }

    async assertAlertDescLabel(expectedText: string) {
        await this.helper.assertText(this.alertDescLabelSelector, expectedText)
    }

    async assertModalCancelLabel(expectedText: string) {
        await this.helper.assertText(this.modalCancelLabelSelector, expectedText)
    }

    async assertModalConfirmLabel(expectedText: string) {
        await this.helper.assertText(this.modalConfirmLabelSelector, expectedText)
    }

    async assertModalLabels(alertText: string, cancelText: string, confirmText: string) {
        await this.assertAlertDescLabel(alertText);
        await this.assertModalCancelLabel(cancelText);
        await this.assertModalConfirmLabel(confirmText);
    }

    async clickConfirmButton() {
        await this.modalConfirmLabelSelector.click();
    }

    async assertAndClickConfirmButton() {
        await this.assertModalLabels(ModalMessages.SaveConfirmation, ButtonLabels.Cancel, ButtonLabels.Confirm);
        await this.clickConfirmButton();
    }




}
