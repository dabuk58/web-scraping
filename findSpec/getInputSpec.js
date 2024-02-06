const puppeteer = require('puppeteer');
const fs = require('fs');

async function wpiszISprawdz(page, inputSelector, wartoscDoWprowadzenia) {
    await inputSelector.type(strings[i]);
    await page.waitForTimeout(1000);
  
   
    const wynikiSelector = '.wyniki';
    const wyniki = await page.$eval(wynikiSelector, (element) => element.textContent);
  
    
    console.log(`Wyniki dla "${wartoscDoWprowadzenia}": ${wyniki}`);
  }

const findTypeOfDoctors = async (webName, inputId) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(webName);
    strings = ['olog', 'atra', 'chirurg']

    await page.content();
    inputElements = await page.$$('input');

    fs.mkdirSync('result/spec');
    for (i = 0; i < strings.length; i++) {
        await inputElements[inputId].type(strings[i]);
        await page.waitForTimeout(1000);
        const htmlAfterTyping = await page.content();
        saveToFile(`result/spec/${strings[i]}.txt`, htmlAfterTyping);
        await inputElements[i].type('', { delay: 50 });   

        wpiszISprawdz(page,inputElements[inputId], strings[i])
    }

    await browser.close();
    return inputElements.length;
};


function saveToFile(nazwaPliku, dane) {
    try {
        fs.writeFileSync(nazwaPliku, dane, 'utf-8');
    } catch (error) {
        console.error('Błąd podczas zapisywania do pliku:', error.message);
    }
}

findTypeOfDoctors(process.argv[2], process.argv[3]);