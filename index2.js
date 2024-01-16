const puppeteer = require('puppeteer');

const findTypeOfDoctors = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.znanylekarz.pl/');

  const initialHtml = await page.content();

  const inputElements = await page.$$('input');

  const results = [];

  for (const input of inputElements) {
    await input.type('olog');

    await page.waitForTimeout(1000);

    const htmlAfterTyping = await page.content();

    const htmlDiff = getHtmlDiff(initialHtml, htmlAfterTyping);

    results.push({
      input: await page.evaluate(input => input.outerHTML, input),
      htmlDiff: htmlDiff,
    });

    await input.type('', { delay: 50 });
  }

  console.log(results);

  await browser.close();
};

// Function to calculate HTML difference
const getHtmlDiff = (before, after) => {
  return after.length > before.length ? after.slice(before.length) : '';
};

findTypeOfDoctors();
