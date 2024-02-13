const puppeteer = require('puppeteer');
const fs = require('fs');
timeout = 10000;

const findTypeOfDoctors = async (webName) => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.setCacheEnabled(false);
  await page.goto(webName);

  await page.content();
  await page.waitForTimeout(timeout)
  inputElements = await page.$$('input');
  await page.waitForTimeout(timeout)

  fs.mkdirSync('result/before');
  fs.mkdirSync('result/after');
  for (i = 0; i < inputElements.length; i++) {
    await page.reload(); 
    const initialHtml = await page.content();
    
    saveToFile(`result/before/${i}.txt`, initialHtml);
    inputElements = await page.$$('input');

    await inputElements[i].type('chirurg');

    await page.waitForTimeout(timeout);
    
    htmlAfterTyping = await page.content();

    //const htmlDiff = getHtmlDiff(initialHtml, htmlAfterTyping, i);

    saveToFile(`result/after/${i}.txt`, htmlAfterTyping);
    //await inputElements[i].type('', { delay: 50 });
    await page.waitForTimeout(10000)
    //htmlAfterTyping = ""
    
  }

  await browser.close();
  return inputElements.length;
};

// Function to calculate HTML difference
const getHtmlDiff = (before, after, id) => {
  const diff = after.length > before.length ? after.slice(before.length) : '';

  // Zapisz różnicę do pliku
  if (`abc${id}.txt`) {
      fs.writeFileSync(`abc${id}.txt`, diff, 'utf-8');
  }

  return diff;
};

function saveToFile(fileName, data) {
  try {
    fs.writeFileSync(fileName, data, 'utf-8');
  } catch (error) {
    console.error('Błąd podczas zapisywania do pliku:', error.message);
  }
}

findTypeOfDoctors(process.argv[2]).then(numberOfInputElements => {
  console.log(numberOfInputElements);
  return numberOfInputElements;
});