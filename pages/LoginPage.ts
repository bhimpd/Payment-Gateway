import { Page, Locator, expect } from "@playwright/test";
import { Helper } from "../utils/helper";
    


export class LoginPage{
    readonly page:Page;
    readonly helper:Helper;
    readonly usernameInputSelector:Locator;
    readonly passwordInputSelector:Locator;
    readonly loginButtonSelector:Locator;
    readonly welcomeTextSelector:Locator;
    readonly paymentGatewaySelector:Locator;
    readonly loginTitleSelector:Locator;
    readonly usernameLabelSelector:Locator;
    readonly passwordLabelSelector:Locator;
    readonly forgetPasswordLabelSelector:Locator;
    readonly profileUsernameSelector:Locator;
    readonly dashboardTextSelector:Locator;
    readonly errorTextFirstSelector:Locator;
    readonly errorTextLastSelector:Locator;
    readonly modalErrorMessageSelector: Locator;
    readonly eyeIconSelector:Locator;


 
    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page);
        this.usernameInputSelector = page.locator("input[name='username']");
        this.passwordInputSelector = page.locator("input[name='password']");
        this.loginButtonSelector = page.locator("button[type='submit']");
        this.welcomeTextSelector = page.locator(".font-weight-normal.mb-4");
        this.paymentGatewaySelector = page.locator(".font-bold.login-box-text");
        this.loginTitleSelector = page.locator(".mb-4.text-navy-40.font-bold");
        this.usernameLabelSelector = page.locator("label[for='username']");
        this.passwordLabelSelector = page.locator("label[for='password']");
        this.forgetPasswordLabelSelector = page.locator(".small.text-navy-40.font-bold");
        this.profileUsernameSelector = page.locator(".username");
        this.dashboardTextSelector = page.locator("h5.mb-3");
        this.errorTextFirstSelector = page.locator(".error.ng-star-inserted").nth(0);
        this.errorTextLastSelector = page.locator(".error.ng-star-inserted").last();
        this.modalErrorMessageSelector = page.locator(".ng-tns-c42-1.toast-message.ng-star-inserted");
        this.eyeIconSelector = page.locator("#button-addon2");



    }


    async assertWelcomeText(expectedText:string){
        await this.helper.assertText(this.welcomeTextSelector,expectedText)
    }

    async assertPaymentGateWayText(expectedText:string){
        await this.helper.assertText(this.paymentGatewaySelector,expectedText)

    }

    async assertLoginTitleText(expectedText:string){
        await this.helper.assertText(this.loginTitleSelector,expectedText)

    }

    async assertUsernameText(expectedText:string){
        await this.helper.assertText(this.usernameLabelSelector,expectedText)

    }

    async assertUsernamePlaceholderText(expectedText:string){
        await this.helper.assertTextOnPlaceholder(this.usernameInputSelector,expectedText)

    }


    async assertPasswordText(expectedText:string){
        await this.helper.assertText(this.passwordLabelSelector,expectedText)

    }

    async assertPasswordPlaceholderText(expectedText:string){
        await this.helper.assertTextOnPlaceholder(this.passwordInputSelector,expectedText)

    }

    async assertLoginButtonText(expectedText:string){
        await this.helper.assertText(this.loginButtonSelector,expectedText)

    }

    async assertForgetPasswordText(expectedText:string){
        await this.helper.assertText(this.forgetPasswordLabelSelector,expectedText)

    }

    async assertForgetPasswordURL(expectedUrl:string){
        await this.helper.assertUrl(this.forgetPasswordLabelSelector,expectedUrl)
    }


    async fillUsername(expectedUsername:string){
        await this.usernameInputSelector.fill(expectedUsername);
    }

    async fillPassword(expectedPassword:string){
        await this.passwordInputSelector.fill(expectedPassword);  
    }

    async clickLoginButton(){
        await this.loginButtonSelector.click();
    }


    async loginCredentials(expectedUsername:any,expectedPassword:any){
        await this.fillUsername(expectedUsername);
        await this.fillPassword(expectedPassword);
        await this.clickLoginButton();
    }

    async assertUsername(expectedText:any ){
        await this.helper.assertText(this.profileUsernameSelector,expectedText)
    }

    async assertDashboardText(expectedText:any ){
        await this.helper.assertText(this.dashboardTextSelector,expectedText);
    }


    async assertErrorFirstMessage(expectedText:string) {
        await this.helper.assertText(this.errorTextFirstSelector,expectedText);
    }

     async assertErrorLastMessage(expectedText:string) {
        await this.helper.assertText(this.errorTextLastSelector,expectedText);
    }

    async assertModalErrorMessage(expectedText:string){
        await this.helper.assertText(this.modalErrorMessageSelector,expectedText);
    }

    async assertAttributePasswordType(){
        await expect(this.passwordInputSelector).toHaveAttribute("type", "password");
    }

    async clickEyeIcon(){
        await this.eyeIconSelector.click();
    }

     async assertAttributeTextType(){
        await expect(this.passwordInputSelector).toHaveAttribute("type", "text");
    }


}