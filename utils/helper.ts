import { Page, Locator, expect } from "@playwright/test";

export class Helper{
    readonly page:Page;
    readonly columnHeaderSelector:Locator;


    constructor(page:Page){
        this.page=page;
        this.columnHeaderSelector = page.locator("span.pq-title-span");

    }

    async visitPage(expectedUrl:string){
        await this.page.goto(expectedUrl);
    }

    async assertURL(expectedUrl:string){
        await expect(this.page).toHaveURL(expectedUrl);
    }

    async assertText(expectedSelector:Locator, expectedText:string)
    {
        const actualText = await expectedSelector.textContent();
        expect(actualText?.trim()).toBe(expectedText.trim());
    }

    async fillSearchParameterNClick(expectedSelector:Locator, expectedText:any)
    {
        await expectedSelector.fill(expectedText);
        await this.page.waitForTimeout(2000);
        await expectedSelector.press("Enter");
        await this.page.waitForTimeout(2000);
    }


    async assertTextOnInputValue(expectedSelector:Locator, expectedText:string)
    {
        const actualText = await expectedSelector.inputValue();
        expect(actualText?.trim()).toBe(expectedText.trim());
    }


    async assertTextOnPlaceholder(expectedSelector:Locator, expectedText:string)
    {
        const placeholder = await expectedSelector.getAttribute('placeholder');
        expect(placeholder).toBe(expectedText);
    }

    async assertUrl(expectedSelector:Locator, expectedUrl:string)
    {
        const placeholder = await expectedSelector.getAttribute('href');
        expect(placeholder).toBe(expectedUrl);
    }

    async assertTableCoulmnHeaders(...expectedTexts: string[]) {
        const header = this.columnHeaderSelector;
        const length = await header.count();
        console.log("Lenght of the Columns Headers.....", length);

         if (length !== expectedTexts.length) {
            throw new Error(`Header count mismatch: expected ${expectedTexts.length}, got ${length}`);
        }

        for (let i=0; i<=length-1; i++){
            const columnText = (await header.nth(i).innerText()).trim(); 
            console.log(`Header ${i}:`, columnText);

            await expect(header.nth(i)).toHaveText(expectedTexts[i]);
            
        }
    }




}