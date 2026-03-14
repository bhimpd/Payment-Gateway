import { Page, Locator } from "@playwright/test";
import { Helper } from "../utils/helper";
import { ModalMessages, ButtonLabels } from "../utils/constant";


export class BankBasePage {

    readonly page: Page;
    readonly helper: Helper;

    // Common menu selectors
    readonly searchMenuSelector: Locator;
    readonly setupTextSelector: Locator;




    constructor(page: Page) {

        this.page = page;
        this.helper = new Helper(page);

        this.searchMenuSelector = page.locator("#searchMenuByCode");
        this.setupTextSelector = page.getByRole('button', { name: 'Setup' });


    }

    async searchMenu(menuName: string) {
        await this.helper.fillSearchParameterNClick(this.searchMenuSelector, menuName);
    }

    async clickSetupText() {
        await this.setupTextSelector.click();
    }



}
