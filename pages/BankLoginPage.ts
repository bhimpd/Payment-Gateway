import { Page, Locator, expect } from "@playwright/test";
import { Helper } from "../utils/helper";



export class BankLoginPage {
    readonly page: Page;
    readonly helper: Helper;
    readonly usernameInputSelector: Locator;
    readonly passwordInputSelector: Locator;
    readonly loginButtonSelector: Locator;
    readonly welcomeTextSelector: Locator;
    readonly bankingPortalSelector: Locator;
    readonly loginTitleSelector: Locator;
    readonly usernameLabelSelector: Locator;
    readonly passwordLabelSelector: Locator;
    readonly profileUsernameSelector: Locator;
    readonly errorTextFirstSelector: Locator;
    readonly errorTextLastSelector: Locator;
    readonly modalErrorMessageSelector: Locator;
    readonly eyeIconSelector: Locator;



    constructor(page: Page) {
        this.page = page;
        this.helper = new Helper(page);
        this.loginButtonSelector = page.locator("button[type='submit']");
        this.welcomeTextSelector = page.locator(".font-weight-normal.mb-4");
        this.bankingPortalSelector = page.locator(".font-bold.login-box-text");
        this.loginTitleSelector = page.locator(".mb-4.text-navy-40.font-bold");
        this.usernameLabelSelector = page.locator("label[for='username']");
        this.usernameInputSelector = page.locator("#username");
        this.passwordLabelSelector = page.locator("label[for='password']");
        this.passwordInputSelector = page.locator("input[name='password']");
        this.profileUsernameSelector = page.locator(".username");
        this.errorTextFirstSelector = page.locator(".error.ng-star-inserted").nth(0);
        this.errorTextLastSelector = page.locator(".error.ng-star-inserted").last();
        this.modalErrorMessageSelector = page.locator(".ng-tns-c40-1.toast-message.ng-star-inserted");
        this.eyeIconSelector = page.locator("#button-addon2");

    }


    async assertWelcomeText(expectedText: string) {
        await this.helper.assertText(this.welcomeTextSelector, expectedText)
    }

    async assertBankingPortalText(expectedText: string) {
        await this.helper.assertText(this.bankingPortalSelector, expectedText)

    }

    async assertLoginTitleText(expectedText: string) {
        await this.helper.assertText(this.loginTitleSelector, expectedText)

    }

    async assertUsernameText(expectedText: string) {
        await this.helper.assertText(this.usernameLabelSelector, expectedText)

    }

    async assertPasswordText(expectedText: string) {
        await this.helper.assertText(this.passwordLabelSelector, expectedText)

    }


    async assertLoginButtonText(expectedText: string) {
        await this.helper.assertText(this.loginButtonSelector, expectedText)

    }

    async fillUsername(expectedUsername: string) {
        await this.usernameInputSelector.fill(expectedUsername);
    }

    async fillPassword(expectedPassword: string) {
        await this.passwordInputSelector.fill(expectedPassword);
    }

    async clickLoginButton() {
        await this.loginButtonSelector.click();
    }


    async loginCredentials(expectedUsername: any, expectedPassword: any) {
        await this.fillUsername(expectedUsername);
        await this.fillPassword(expectedPassword);
        await this.clickLoginButton();
    }

    async assertUsername(expectedText: any) {
        await this.helper.assertText(this.profileUsernameSelector, expectedText)
    }

    async assertErrorFirstMessage(expectedText: string) {
        await this.helper.assertText(this.errorTextFirstSelector, expectedText);
    }

    async assertErrorLastMessage(expectedText: string) {
        await this.helper.assertText(this.errorTextLastSelector, expectedText);
    }

    async assertModalErrorMessage(expectedText: string) {
        await this.helper.assertText(this.modalErrorMessageSelector, expectedText);
    }

    async assertAttributePasswordType() {
        await expect(this.passwordInputSelector).toHaveAttribute("type", "password");
    }

    async clickEyeIcon() {
        await this.eyeIconSelector.click();
    }

    async assertAttributeTextType() {
        await expect(this.passwordInputSelector).toHaveAttribute("type", "text");
    }


}