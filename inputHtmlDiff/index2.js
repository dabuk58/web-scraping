const puppeteer = require('puppeteer');
const fs = require('fs');

const findTypeOfDoctors = async (webName) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(webName);

  const initialHtml = await page.content();
  inputElements = await page.$$('input');
  fs.mkdirSync('result/before');
  saveToFile('result/before/before.txt', initialHtml);

  fs.mkdirSync('result/after');
  for (i = 0; i < inputElements.length; i++) {
    await page.reload();
    inputElements = await page.$$('input');

    await inputElements[i].type('olog');

    await page.waitForTimeout(1000);

    const htmlAfterTyping = await page.content();

    //const htmlDiff = getHtmlDiff(initialHtml, htmlAfterTyping);

    saveToFile(`result/after/${i}.txt`, htmlAfterTyping);
    //saveToFile('wynik/' + i + '.txt', htmlDiff);

    await inputElements[i].type('', { delay: 50 });
  }

  await browser.close();
  return inputElements.length;
};

// Function to calculate HTML difference
const getHtmlDiff = (before, after) => {
  return after.length > before.length ? after.slice(before.length) : '';
};

function saveToFile(nazwaPliku, dane) {
  try {
    fs.writeFileSync(nazwaPliku, dane, 'utf-8');
   // console.log(`Dane zapisane do pliku ${nazwaPliku}`);
  } catch (error) {
    console.error('Błąd podczas zapisywania do pliku:', error.message);
  }
}

findTypeOfDoctors(process.argv[2]).then(numberOfInputElements => {
  console.log(numberOfInputElements);
  return numberOfInputElements;
});