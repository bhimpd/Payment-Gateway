import { faker } from "@faker-js/faker";

export function generateAccountDetails(){
    const accountName = `AC_No: ${faker.number.int({ min: 1, max: 999 })}`;
    const accountNumber = faker.finance.accountNumber(12);


    return {
        accountName,
        accountNumber,
    };

}