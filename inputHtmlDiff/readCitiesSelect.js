const puppeteer = require('puppeteer');
const fs = require('fs');

const findTypeOfDoctors = async (webName) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(webName);

  const selects = await page.evaluate(() => {
    const selectElements = Array.from(document.querySelectorAll('select'));

    return selectElements.map(select => {
      const options = [];

      if (select.innerText.includes('warszawa') || select.innerText.includes('Warszawa')|| select.innerText.includes('krakow')) {
        for (let i = 0; i < select.children.length; i++) {
          options.push(select.children[i].innerText);
        }
      }

      return options;
    });
  });

  await browser.close();

  const optionsString = JSON.stringify(selects, null, 2);

  fs.writeFileSync('result/fromSelect.txt', optionsString, 'utf-8');
  console.log(`Options saved to file: fromSelect.txt`);
};

findTypeOfDoctors(process.argv[2]);
