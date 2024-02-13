const puppeteer = require('puppeteer');
const fs = require('fs');
timeout = 5000;

const findTypeOfDoctors = async (webName, inputId) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(webName);
    strings = ['olog', 'atra', 'chirurg']

    await page.content();
    

    fs.mkdirSync('result/spec');
    for (i = 0; i < strings.length; i++) {
        inputElements = await page.$$('input');
        await page.waitForTimeout(timeout)
        await inputElements[inputId].type(strings[i]);
        await page.waitForTimeout(1000);
        const htmlAfterTyping = await page.content();
        saveToFile(`result/spec/${strings[i]}.txt`, htmlAfterTyping);
        //await inputElements[i].type('', { delay: 50 });   
        await inputElements[inputId].type('', { delay: 50 });
        await page.reload(); 
    }

    await browser.close();
    return inputElements.length;
};


function saveToFile(fileName, data) {
    try {
        fs.writeFileSync(fileName, data, 'utf-8');
    } catch (error) {
        console.error('Błąd podczas zapisywania do pliku:', error.message);
    }
}

findTypeOfDoctors(process.argv[2], process.argv[3]);