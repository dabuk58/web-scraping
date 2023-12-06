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

function monthNumberToNameForDB(monthNumber){
  switch(monthNumber){
      case "01":
          return 'stycznia';
      case "02":
          return 'lutego';
      case "03":
          return 'marca';
      case "04":
          return 'kwietnia';
      case "05":
          return 'maja';
      case "06":
          return 'czerwca';
      case "07":
          return 'lipca';
      case "08":
          return 'sierpnia';
      case "09":
          return 'września';
      case "10":
          return 'października';
      case "11":
          return 'listopada';
      case "12":
          return 'grudnia';
  }
}

const scrapDeutscheBahn = async (from, to, departureDate, departureTime, config, page, browser) => {
  const {modal, inputFrom, inputTo, inputDate, inputTime, age, submit} = config

  const buttonAcceptCookies = await (await page.evaluateHandle(modal)).asElement();
  buttonAcceptCookies.click();
 
  await page.waitForSelector(inputFrom);
 
  await page.type(inputFrom, from);
  await page.click(inputFrom);

  await page.type(inputTo, to);
  await page.click(inputTo);
 
  await page.waitForTimeout(2000);
 
  await page.$$eval(inputDate[0], (h2) => {
      h2.map((h2) => {
          if(h2.innerText.indexOf("Dzisiaj od") != -1){
              h2.click();
          }
      });
  });
 
  departureDate = departureDate.split(".");
  departureDate[1] = monthNumberToNameForDB(departureDate[1]);

  await page.waitForSelector(inputDate[1]);

  let isProperDate = false;

  while(!isProperDate){
      const date = await page.evaluate((inputDate) => {
          const element = document.querySelector(inputDate[1]);
          return element.innerText;
      }, inputDate);

      if(date.indexOf(departureDate[1] + ' ' + departureDate[2]) != -1){
          isProperDate = true;
      } else {
          await page.click(inputDate[2]);
      }
  }
 
  const departureDay = departureDate[0];
 
  await page.$$eval(
      inputDate[3],
      (days, departureDay) => {
          days.forEach((day) => {
              console.log(day.innerText);
              if (day.innerText === departureDay) {
                  day.click();
              }
          });
      },
      departureDay
  );

  await page.click(submit[0]);

  await page.click(submit[1]);
 
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  await page.$$eval('span', (elements) => {
      Array.from(elements).find(e => e.textContent.trim() === 'Dodaj wiek podróżnych').click();
  });

  await page.type(age, '30');

  const buttonAcceptAge = await (await page.evaluateHandle(submit[2])).asElement();
  buttonAcceptAge.click();

  await page.waitForSelector('.reiseloesung-list-page__wrapper');
 
  const results = await page.$$eval('.verbindung-list__result-item', (items) => {
      return items.map((item) => {
          const countPriceElement = item.querySelector('.reise-preis__link-text');

          if(countPriceElement){
              return {
                  fromTime: item.querySelector('.reiseplan__uebersicht-uhrzeit-von .reiseplan__uebersicht-uhrzeit-sollzeit').innerText,
                  toTime: item.querySelector('.reiseplan__uebersicht-uhrzeit-nach .reiseplan__uebersicht-uhrzeit-sollzeit').innerText,
                  ticketUrl: item.querySelector('.db-web-link.test-link.reiseloesung-button-container__link-waehlen.reiseloesung-button-container__desktop.db-web-link--type-button-primary').href
              }
          } else {
              return {
                  fromTime: item.querySelector('.reiseplan__uebersicht-uhrzeit-von .reiseplan__uebersicht-uhrzeit-sollzeit').innerText,
                  toTime: item.querySelector('.reiseplan__uebersicht-uhrzeit-nach .reiseplan__uebersicht-uhrzeit-sollzeit').innerText,
                  ticketUrl: null
              }
          }
      });
  });

  await browser.close();
 
  return results;
}

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
  const browser = await puppeteer.launch({ headless: true, args: ['--window-size=1920,1080']});
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
        case 'DeutscheBahn':
            return searchTrain(from, to, departureDate, departureTime, config[2], scrapDeutscheBahn); 
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