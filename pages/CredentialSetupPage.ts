import { Page, Locator, expect } from "@playwright/test";
import { Helper } from "../utils/helper";
    
import { ModalMessages, SuccessMessages, ButtonLabels, NoRowDataText, deleteModal,errorMessage } from "../utils/constant";


export class CredentialSetupPage{
    readonly page:Page;
    readonly helper:Helper;
    readonly searchParameterSelector:Locator;
    readonly credentialSetupSelector:Locator;
    readonly credentialSetupLabelSelector: Locator;
    readonly createButtonSelector:Locator;
    readonly bankNameSelector:Locator;
    readonly bankURLSelector:Locator;
    readonly usernameSelector:Locator;
    readonly passwordSelector:Locator;
    readonly searchBankNameIconSelector: Locator;
    readonly bankListLabelSelector: Locator;
    readonly bankNameLabelSelector: Locator;
    readonly bankNameSearchSelector: Locator;
    readonly selectedBankNameSelector: Locator;
    readonly selectedBankNamePlaceholderSelector: Locator;
    readonly bankUrlSelector:Locator;
    readonly bankUsernameSelector:Locator;
    readonly bankPasswordSelector:Locator;
    readonly addAccountButtonSelector:Locator;
    readonly accountNameLabelSelector:Locator;
    readonly accountNumberLabelSelector:Locator;
    readonly primaryLabelSelector:Locator;
    readonly accountNameInputSelector:Locator;
    readonly accountNumberInputSelector:Locator;
    readonly primaryLabelCheckBoxSelector:Locator;
    readonly removeButtonLabelSelector:Locator;
    readonly saveButtonLabelSelector:Locator;
    readonly alertDescLabelSelector:Locator;
    readonly modalCancelLabelSelector:Locator;
    readonly modalConfirmLabelSelector:Locator;
    readonly alertDialogSuccessSelector:Locator;
    readonly bankAccountRowsCountSelctor:Locator; //not used,
    readonly searchByBankNameSelector:Locator;
    readonly accountDetailsLabelSelector:Locator;
    readonly searchByAccountNumberSelector:Locator;

    readonly editIconSelector:Locator;
    readonly updateButtonLabelSelector:Locator;
    readonly removeButtonLabelLastSelector:Locator;

    readonly noRowDataLabelSelector:Locator;
    readonly scrollToBottomSelector:Locator; //not used
    readonly primaryAccountDeletionTextSelector:Locator;

    readonly errorMessageSelector:Locator;
    readonly atleastOneAccountLabelSelector:Locator;
    readonly bankDetailErrorSelector:Locator;




    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page);
        this.searchParameterSelector = page.locator("#searchMenuByCode");
        this.credentialSetupSelector = page.locator("a[href='#menu5']");
        this.credentialSetupLabelSelector = page.locator("h6.mb-2");
        this.createButtonSelector = page.locator("#createBtn");
        this.bankNameSelector = page.locator("label[for='bankName']");
        this.bankURLSelector = page.locator("label[for='bankUrl']");
        this.usernameSelector = page.locator("label[for='username']");
        this.passwordSelector = page.locator("label[for='password']");
        this.searchBankNameIconSelector = page.locator(".ic-search.align-middle");
        this.bankListLabelSelector = page.locator("#modal-basic-title");
        this.bankNameLabelSelector = page.locator(".pq-title-span");
        this.bankNameSearchSelector = page.locator(".pq-search-txt");
        this.selectedBankNameSelector = page.locator(".pq-grid-cell div");
        this.selectedBankNamePlaceholderSelector = page.locator("#bankName");
        this.bankUrlSelector = page.locator("#bankUrl");
        this.bankUsernameSelector = page.locator("#username");
        this.bankPasswordSelector = page.locator("#password");
        this.addAccountButtonSelector = page.locator("button.btn.btn-primary.ng-star-inserted");
        this.accountNameLabelSelector = page.locator("label[for='accountName']").nth(0);
        this.accountNumberLabelSelector = page.locator("label[for='accountNumber']").nth(0);
        this.primaryLabelSelector = page.locator("label[for='isPrimary0']").nth(0);
        this.accountNameInputSelector = page.locator("#accountName").last();
        this.accountNumberInputSelector = page.locator("#accountNumber").last();
        this.primaryLabelCheckBoxSelector = page.locator("#isPrimary0");
        this.removeButtonLabelSelector = page.locator("button.btn.btn-danger.mt-4").nth(0);
        this.saveButtonLabelSelector = page.locator("button.btn.btn-success.ng-star-inserted");
        this.alertDescLabelSelector = page.locator("p.alert-desc");
        this.modalCancelLabelSelector = page.locator("#cancelBtn");
        this.modalConfirmLabelSelector = page.locator("#confirmBtn");
        this.alertDialogSuccessSelector = page.locator("div[role='alertdialog']");
        this.bankAccountRowsCountSelctor = page.locator(".row.ng-untouched.ng-pristine.ng-valid.ng-star-inserted"); //not used
        this.searchByBankNameSelector = page.locator("input[name='bank_name']");
        this.accountDetailsLabelSelector = page.locator("#modal-basic-title-3");
        this.searchByAccountNumberSelector = page.locator("input[name='accountNumber']");
        this.editIconSelector = page.locator("button.edit_btn .ic-edit");
        this.updateButtonLabelSelector = page.locator("button.btn.btn-success.ng-star-inserted");
        this.removeButtonLabelLastSelector = page.locator("button.btn.btn-danger.mt-4").last();
        this.noRowDataLabelSelector = page.locator(".pq-grid-norows").last();
        this.scrollToBottomSelector = page.locator(".d-flex.justify-content-end.mt-2.mb-3") //not used
        this.primaryAccountDeletionTextSelector = page.locator("#toast-container .toast-message");
        this.errorMessageSelector = page.locator(".error.ng-star-inserted");
        // this.atleastOneAccountLabelSelector = page.locator(".ng-tns-c42-4.toast-message.ng-star-inserted");
        this.atleastOneAccountLabelSelector = page.locator(".ng-tns-c42-4.toast-message.ng-star-inserted");

        this.bankDetailErrorSelector = page.locator(".error.ng-star-inserted");

       

    } 


    async clickSearchParameter(){
        await this.searchParameterSelector.click();
    }

    async SearchNClickMenu(expectedText:any){
        await this.helper.fillSearchParameterNClick(this.searchParameterSelector,expectedText)
    }

    async assertCredentialSetupMenuText(expectedText:any){
        await this.helper.assertText(this.credentialSetupSelector,expectedText)
    }

    async clickCredentialSetupMenu(){
        await this.credentialSetupSelector.click();
    }

    async assertCredentialSetupPageText(expectedText:any ){
        await this.helper.assertText(this.credentialSetupLabelSelector,expectedText)
    }


    async assertCreateBUttonText(expectedText:any ){
        await this.helper.assertText(this.createButtonSelector,expectedText)
    }

    async clickCreateButton(){
        await this.createButtonSelector.click();
    }


    async assertBankNameLabel(expectedText:any ){
        await this.helper.assertText(this.bankNameSelector,expectedText)
    }

    async assertBankURLLabel(expectedText:any ){
        await this.helper.assertText(this.bankURLSelector,expectedText)
    }

    async assertUsernameLabel(expectedText:any ){
        await this.helper.assertText(this.usernameSelector,expectedText)
    }

    async assertPasswordLabel(expectedText:any ){
        await this.helper.assertText(this.passwordSelector,expectedText)
    }


    async clickBankNameSearchIcon(){
        await this.searchBankNameIconSelector.click();
    }

    
    async assertBankListLabel(expectedText:any ){
        await this.helper.assertText(this.bankListLabelSelector,expectedText)
    }

    async assertBankName(expectedText:any ){
        await this.helper.assertText(this.bankNameLabelSelector,expectedText)
    }

    async clickBankNameSearchInput(){
        await this.bankNameSearchSelector.click();
    }

    async SearchNClickBank(expectedText:any){
        await this.helper.fillSearchParameterNClick(this.bankNameSearchSelector,expectedText)
    }

    async assertnClickBank(expectedText:string){
        await this.page.waitForTimeout(2000);
        await this.helper.assertText(this.selectedBankNameSelector,expectedText);
        await this.selectedBankNameSelector.click({force:true});
    }


    async assertSelectedBankNamePlaceholder(expectedText:any ){
        await this.helper.assertTextOnInputValue(this.selectedBankNamePlaceholderSelector,expectedText);
    }

    async fillBankUrl(expectedText:string){
        await this.bankUrlSelector.fill(expectedText);
    }

    async fillBankUsername(expectedText:string){
        await this.bankUsernameSelector.fill(expectedText);
    }

    async fillBankPassword(expectedText:string){
        await this.bankPasswordSelector.fill(expectedText);
    }


    async fillBankInfo(expectedBankUrl:any,expectedUsername:any,expectedPassword:any){
        await this.fillBankUrl(expectedBankUrl);
        await this.fillBankUsername(expectedUsername);
        await this.fillBankPassword(expectedPassword);
    }


    async assertAddAccountLabel(expectedText:string){
        await this.helper.assertText(this.addAccountButtonSelector,expectedText)
    }

    async clickAddAccountButton(){
        await this.addAccountButtonSelector.click();
    }

    async assertAccountNameLabel(expectedText:string){
        await this.helper.assertText(this.accountNameLabelSelector,expectedText)
    }

    async assertAccountNumberLabel(expectedText:string){
        await this.helper.assertText(this.accountNumberLabelSelector,expectedText)
    }

    async assertPrimaryLabel(expectedText:string){
        await this.helper.assertText(this.primaryLabelSelector,expectedText)
    }

    async fillAccountName(expectedText:any){
        await this.accountNameInputSelector.fill(expectedText);
    }

    async fillAccountNumber(expectedText:any){
        await this.accountNumberInputSelector.fill(expectedText);
    }


    // ********** Issue Here : This method is not working as expected *************
    // async fillAccountDetails(expectedAccountName:any, expectedAccountNumber:any){
    //     this.fillAccountName(expectedAccountName);
    //     this.fillAccountNumber(expectedAccountNumber);
    // }



    async assertPrimaryLevelCheckBox(){
        expect(this.primaryLabelCheckBoxSelector).toBeChecked();
    }

    async assertRemoveButtonLabel(expectedText:string){
        await this.helper.assertText(this.removeButtonLabelSelector,expectedText)
    }


    async clickRemoveFirstBankDetail(){
        await this.removeButtonLabelSelector.click();
    }

    async assertPrimaryAccountDeletionText(expectedText:string){
        await this.helper.assertText(this.primaryAccountDeletionTextSelector,expectedText)
    }

    async assertSaveButtonLabel(expectedText:string){
        await this.helper.assertText(this.saveButtonLabelSelector,expectedText)
    }


    async clickSaveButton(){
        await this.saveButtonLabelSelector.click();
    }

    async assertAlertDescLabel(expectedText:string){
        await this.helper.assertText(this.alertDescLabelSelector,expectedText)
    }

    async assertModalCancelLabel(expectedText:string){
        await this.helper.assertText(this.modalCancelLabelSelector,expectedText)
    }

    async assertModalConfirmLabel(expectedText:string){
        await this.helper.assertText(this.modalConfirmLabelSelector,expectedText)
    }


    async assertModalLabels(alertText: string, cancelText: string, confirmText: string) {
        await this.assertAlertDescLabel(alertText);
        await this.assertModalCancelLabel(cancelText);
        await this.assertModalConfirmLabel(confirmText);
    }

    async clickConfirmButton(){
        await this.modalConfirmLabelSelector.click();
    }


    async assertSuccessfulMessage(expectedText:string){
        await this.helper.assertText(this.alertDialogSuccessSelector,expectedText)
    }

    async confirmAndAssertSuccess() {
        await this.assertModalLabels( ModalMessages.SaveConfirmation, ButtonLabels.Cancel,ButtonLabels.Confirm );
        await this.clickConfirmButton();
        await this.assertSuccessfulMessage(SuccessMessages.BankCredentialSaved);
    }


    async SearchNClickByBankName(expectedText:any){
        await this.helper.fillSearchParameterNClick(this.searchByBankNameSelector,expectedText);
    }


    async assertBankDetails(expectedName: string, expectedUrl: string, expectedUser: string, expectedText:string) {
        const cells = this.page.locator('.pq-grid-cell div');

        await expect(cells.nth(0)).toHaveText(expectedName);
        await expect(cells.nth(1)).toHaveText(expectedUrl);
        await expect(cells.nth(2)).toHaveText(expectedUser);
        await expect(cells.nth(3)).toHaveText(expectedText);

        await this.page.waitForTimeout(1000);

        cells.nth(3).click(); 

    }

    async assertAccountDetailsLabel(expectedText:string){
        await this.helper.assertText(this.accountDetailsLabelSelector,expectedText)
    }

    async searchByAccountNumber(expectedText:any){
        await this.helper.fillSearchParameterNClick(this.searchByAccountNumberSelector,expectedText)
    }


    async assertBankAccountDetails(expectedAccountName: string, expectedAccountNumber:string) {
        const cells = this.page.locator('.pq-grid-cell div');
        const count = await cells.count();

        await expect(cells.nth(count - 2)).toHaveText(expectedAccountName);   
        await expect(cells.nth(count - 1)).toHaveText(expectedAccountNumber); 
    }

   
    async clickEditIconButton(){
        await this.page.waitForTimeout(4000);
        await this.editIconSelector.click();
    }

    
    async assertBankUrlOnEditPage(expectedText:any ){
        await this.helper.assertTextOnInputValue(this.bankUrlSelector,expectedText);
    }

    async assertBankUsernameOnEditPage(expectedText:any ){
        await this.helper.assertTextOnInputValue(this.bankUsernameSelector,expectedText);
    }

    async assertUpdateButtonLabel(expectedText:string){
        await this.helper.assertText(this.updateButtonLabelSelector,expectedText)
    }

    async clickUpdateButton(){
        await this.updateButtonLabelSelector.click();
    }

    async assertAndClickRemoveButtonLast(expectedText:string){
        await this.helper.assertText(this.removeButtonLabelLastSelector,expectedText);
        await this.removeButtonLabelLastSelector.click();
    }


    async confirmAndAssertProceedAnyway() {
        await this.assertModalLabels( deleteModal.deleteConfirmation, ButtonLabels.Cancel,ButtonLabels.proceedAnyway );
        await this.clickConfirmButton();
    }

    async getLastAccountNumber(){
        const input = this.accountNumberInputSelector;
        const value = await input.inputValue();
        return value.trim();
    }


    async assertNoData(expectedText:string){
        await this.helper.assertText(this.noRowDataLabelSelector,expectedText);
    }

    async assertNoRowDataLabel(){
        await this.assertNoData(NoRowDataText.noDataText);
    }

    async assertErrorMessage(expectedTexts: string[]) {
        const errorElements = this.errorMessageSelector;

        const count = await errorElements.count();
        expect(count).toBe(expectedTexts.length);

        for (let i = 0; i < count; i++) {
            const actualText = await errorElements.nth(i).innerText();
            expect(actualText.trim()).toBe(expectedTexts[i].trim());
        }
    }


    async assertAtLeastOneAccountLabel(expectedText: string) {
        await expect(this.page.getByRole("alertdialog", { name: "Please add at least one account." }))
        .toBeVisible();
        // await this.helper.assertText(this.atleastOneAccountLabelSelector,expectedText);

    }

    async assertBankDetailsErrorMessage(expectedTexts: string[]) {
        const errorElements = this.bankDetailErrorSelector;

        const count = await errorElements.count();
        expect(count).toBe(expectedTexts.length);

        for (let i = 0; i < count; i++) {
            const actualText = await errorElements.nth(i).innerText();
            expect(actualText.trim()).toBe(expectedTexts[i].trim());
        }
    }

    async confirmAndAssertFailure() {
        await this.assertModalLabels( ModalMessages.SaveConfirmation, ButtonLabels.Cancel,ButtonLabels.Confirm );
        await this.clickConfirmButton();
        await this.assertSuccessfulMessage(errorMessage.message);
    }


    



}