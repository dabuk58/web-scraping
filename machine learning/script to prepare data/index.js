const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const express = require('express');
const app = express();

puppeteer.use(stealthPlugin());

// app.listen(3000);

const takeInputs = async(url) => {
  const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1920,1080'] });
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForTimeout(3500);

  const inputs = await page.evaluate(() => {
    const inputElements = Array.from(document.querySelectorAll('input'));

    const visibleInputs = inputElements.filter(input => {
      return input.offsetWidth > 0 && input.offsetHeight > 0;
    });
    
    return inputElements.map(input => {
      return '<input id="' + input.id + '" type="' + input.type + '" class="' + input.className +'" placeholder="' + input.placeholder + '">';
    });
  });

  await browser.close();

  return inputs;
}

const pages = [
  // 'https://portalpasazera.pl/',
  // 'https://rozklad-pkp.pl/',
  // 'https://www.intercity.pl/pl/',
  // 'https://www.kolejeslaskie.com/',
  // 'https://www.mazowieckie.com.pl/pl',
  // 'https://www.pkm-sa.pl/',
  // 'https://koleo.pl/',
  // 'https://pl.omio.com/pociagi',
  // 'https://polregio.pl/pl/',
  'https://int.bahn.de/pl'
];

const getAllInputs = async () => {
  const allInputs = [];

  for(let i=0; i<pages.length; i++){
    const onePageInputs = await takeInputs(pages[i]);
    allInputs.push(...onePageInputs);
  }

  console.log(allInputs);
}


getAllInputs();
