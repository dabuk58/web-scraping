const puppeteer = require('puppeteer-extra');
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

const searchPortalPasazera = async (from, to, departureDate, departureTime) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()

    await page.goto('https://portalpasazera.pl/');
    await page.type('#departureFrom', from);
    await page.type('#arrivalTo', to);

    await page.evaluate((date, time) => {
        document.getElementById('main-search__dateStart').value = date;
        document.getElementById('main-search__timeStart').value = time;
    }, departureDate, departureTime);
    
    await page.click('.main-search__connection-directCheck');
    await page.click('.btn-start-search');

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

const searchRozkladJazdyPKP = async (from, to, departureDate, departureTime) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()

    await page.goto('https://rozklad-pkp.pl/');

    await page.click('.css-47sehv');
    await page.type('#from-station', from);
    await page.type('#to-station', to);
  
    await page.evaluate((departureDate, departureTime) => {
      const day1 = document.querySelector('input[name="date"]');
      const day2 = document.querySelector('input[name="dateStart"]');
      const day3 = document.querySelector('input[name="dateEnd"]');
      const day4 = document.querySelector('input[name="REQ0JourneyDate"]');
      day1.value = departureDate;
      day2.value = departureDate;
      day3.value = departureDate;
      day4.value = departureDate;
  
      const time1 = document.querySelector('input[name="time"]');
      const time2 = document.querySelector('input[name="REQ0JourneyTime"]');
      time1.value = departureTime;
      time2.value = departureTime;
    }, departureDate, departureTime);
  
    await page.click('#singlebutton');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // await page.waitForSelector("button[class='buy-ticket']")
  
    const results = await page.evaluate(() => Array.from(document.querySelector('tbody').querySelectorAll('tr'), (e) => ({
    //   from: e.children[1].children[0].innerText,
    //   to: e.children[1].children[1].innerText,
      dateFrom: e.children[2].innerText.slice(0, 8),
      fromTime: e.children[3].children[0].children[0].children[2].innerText,
      toTime: e.children[3].children[1].children[0].children[2].innerText,
      dateTo: e.children[2].innerText.slice(0, 8),
      link: e.children[7].querySelector('a') ? e.children[7].querySelector('a').href : null,
      form: e.children[7].querySelector('form') ? e.children[7].querySelector('form').outerHTML : null
    //   totalTime: e.children[4].innerText,
    //   interchanges: e.children[5].innerText,
    })));

    await browser.close();

    console.log(results);

    return results;
}

const search = async (from, to, departureDate, departureTime, source) => {

    switch(source) {
        case 'rozkladJazdyPKP':
            return searchRozkladJazdyPKP(from, to, departureDate, departureTime);
        case 'portalPasazera':
            return searchPortalPasazera(from, to, departureDate, departureTime); 
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