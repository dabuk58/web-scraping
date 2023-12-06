const puppeteer = require('puppeteer-extra');
const config = require('./config.js')
const stealthPlugin = require('puppeteer-extra-plugin-stealth');

const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200'
};

app.listen(3000);
app.use(cors(corsOptions));

puppeteer.use(stealthPlugin());

const scrapRozkladJazdyPKP = async (from, to, departureDate, departureTime, config, page, browser) => {
  const {modal, inputFrom, inputTo, inputDate, inputTime, submit} = config

  await page.click(modal);
  await page.type(inputFrom, from);
  await page.type(inputTo, to);

  await page.evaluate((departureDate, departureTime, inputDate, inputTime) => {
    const day1 = document.querySelector(inputDate[0]);
    const day2 = document.querySelector(inputDate[1]);
    const day3 = document.querySelector(inputDate[2]);
    const day4 = document.querySelector(inputDate[3]);
    day1.value = departureDate;
    day2.value = departureDate;
    day3.value = departureDate;
    day4.value = departureDate;

    const time1 = document.querySelector(inputTime[0]);
    const time2 = document.querySelector(inputTime[1]);
    time1.value = departureTime;
    time2.value = departureTime;
  }, departureDate, departureTime, inputDate, inputTime);

  await page.click(submit[0]);
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  const results = await page.evaluate(() => Array.from(document.querySelector('tbody').querySelectorAll('tr'), (e) => ({
    dateFrom: e.children[2].innerText.slice(0, 8),
    fromTime: e.children[3].children[0].children[0].children[2].innerText,
    toTime: e.children[3].children[1].children[0].children[2].innerText,
    dateTo: e.children[2].innerText.slice(0, 8),
    link: e.children[7].querySelector('a') ? e.children[7].querySelector('a').href : null,
    form: e.children[7].querySelector('form') ? e.children[7].querySelector('form').outerHTML : null
  })));

  await browser.close();

  return results;
}

const scrapPortalPasazera = async (from, to, departureDate, departureTime, config, page, browser) => {
  const {modal, inputFrom, inputTo, inputDate, inputTime, submit} = config

  await page.type(inputFrom, from);
  await page.type(inputTo, to);

  await page.evaluate((date, time, inputDate, inputTime) => {
      document.getElementById(inputDate[0]).value = date;
      document.getElementById(inputTime[0]).value = time;
  }, departureDate, departureTime, inputDate, inputTime);
  
  await page.click(submit[0]);
  await page.click(submit[1]);

  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  const results = await page.$$eval('.search-results__item', (elements) =>
      elements.map((e) => ({
          fromTime: e.querySelector('.search-results__item-times--start .search-results__item-hour').innerText,
          toTime: e.querySelector('.search-results__item-times--end .search-results__item-hour').innerText,
          dateFrom: e.querySelector('.search-results__item-times--start .search-results__item-date').innerText,
          dateTo: e.querySelector('.search-results__item-times--end .search-results__item-date').innerText
      }))
  );
  
  await browser.close();

  return results;
}
 
const searchTrain = async (from, to, departureDate, departureTime, config, scrapWebsite) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage()
  await page.goto(config.url);

  return scrapWebsite(from, to, departureDate, departureTime, config, page, browser)
}

const search = async (from, to, departureDate, departureTime, source) => {
    switch(source) {
        case 'rozkladJazdyPKP':
            return searchTrain(from, to, departureDate, departureTime, config[0], scrapRozkladJazdyPKP);
        case 'portalPasazera':
            return searchTrain(from, to, departureDate, departureTime, config[1], scrapPortalPasazera); 
    }
}

app.get('/search', async (req, res) => {
    try{
        const from = req.query.from;
        const to = req.query.to;
        const departureDate = req.query.departureDate;
        const departureTime = req.query.departureTime;
        const source = req.query.source;

        if(!from || !to || !departureDate || !departureTime || !source){
            return res.status(400).send('Please provide proper data');
        }

        const results = await search(from, to, departureDate, departureTime, source);

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})