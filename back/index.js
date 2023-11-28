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

const search = async (from, to, departureDate, departureTime) => {
    const browser = await puppeteer.launch({ headless: true });
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

app.get('/search', async (req, res) => {
    try{
        const from = req.query.from;
        const to = req.query.to;
        const departureDate = req.query.departureDate;
        const departureTime = req.query.departureTime;

        if(!from || !to || !departureDate || !departureTime){
            return res.status(400).send('Please provide proper data');
        }

        const results = await search(from, to, departureDate, departureTime);

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})