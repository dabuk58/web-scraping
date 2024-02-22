const puppeteer = require('puppeteer');
const fs = require('fs');
timeout = 10000;

const findTypeOfDoctors = async (webName, inputId, suffixs) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(webName);
    const initialHtml = await page.content();
    await page.waitForTimeout(timeout);
    saveToFile(`result/before/suffix.txt`, initialHtml);
    
    fs.mkdirSync('result/spec');
    for (i = 0; i < suffixs.length; i++) {
        inputElements = await page.$$('input');
        await page.waitForTimeout(timeout)
        await inputElements[inputId].type(suffixs[i]);
        await page.waitForTimeout(8000);
        const htmlAfterTyping = await page.content();
        saveToFile(`result/spec/${suffixs[i]}.txt`, htmlAfterTyping);
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

findTypeOfDoctors(process.argv[2], process.argv[3], JSON.parse(process.argv[4]));