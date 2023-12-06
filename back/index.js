const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');

const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200'
};

//app.listen(3000);
//app.use(cors(corsOptions));

puppeteer.use(stealthPlugin());


const searchDB = async (from, to, departureDate, departureTime) => {
    const browser = await puppeteer.launch({ headless: false, args: ['--start-fullscreen'] });
    const page = await browser.newPage()
    
    await page.goto('https://int.bahn.de/pl');

    const buttonAcceptCookies = await (await page.evaluateHandle(`document.querySelector("body > div:nth-child(1)").shadowRoot.querySelector("#consent-layer > div.consent-layer__btn-container > button.btn.btn--secondary.js-accept-all-cookies")`)).asElement();
    buttonAcceptCookies.click();
    
    await page.waitForSelector('[placeholder="Z"]');
    
    await page.type('[placeholder="Z"]', from);
    await page.click('[placeholder="Z"]');

    await page.type('[placeholder="Do"]', to);
    await page.click('[placeholder="Do"]');
    
    await page.waitForTimeout(2000);
    
    await page.$$eval('h2.quick-finder-option-area__heading', (h2) => {
        h2.map((h2) => {
            if(h2.innerText.indexOf("Dzisiaj od") != -1){
                h2.click();
            }
        });
    });
    
    departureDate = departureDate.split(".");
    departureDate[1] = monthNumberToNameForDB(departureDate[1]);

    await page.waitForSelector(".db-web-date-picker-input__field-overlay");

    let isProperDate = false;

    while(!isProperDate){
        const date = await page.evaluate(() => {
            const element = document.querySelector(".db-web-date-picker-input__field-overlay");
            return element.innerText;
        });

        if(date.indexOf(departureDate[1] + ' ' + departureDate[2]) != -1){
            isProperDate = true;
        } else {
            await page.click('span.db-web-icon.icon-next2');
        }
    }
    
    const departureDay = departureDate[0];
    
    await page.$$eval(
        '.swiper-slide-active .db-web-date-picker-calendar-day.db-web-date-picker-calendar-day--day-in-month-or-selectable span.db-web-date-picker-calendar-day--label',
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

    await page.click('.db-web-button.test-db-web-button.db-web-button--type-primary.db-web-button--size-regular.quick-finder-overlay-control-buttons__button.quick-finder-overlay-control-buttons__button--commit');

    await page.click('.db-web-button.test-db-web-button.quick-finder-basic__search-btn.quick-finder-basic__search-btn--desktop.db-web-button--type-primary.db-web-button--size-large');
    
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await page.$$eval('span', (elements) => {
        Array.from(elements).find(e => e.textContent.trim() === 'Dodaj wiek podróżnych').click();
    });

    await page.type('.db-web-text-input__input-field.db-web-text-input__input-field--dark', '30');

    const buttonAcceptAge = await (await page.evaluateHandle(`document.querySelector("#dialog-content > div.db-web-plugin-dialog__footer > button.db-web-button.test-db-web-button.db-web-plugin-dialog__footer-button.db-web-plugin-dialog__footer-button--primary.db-web-button--type-primary.db-web-button--size-regular")`)).asElement();
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
    const browser = await puppeteer.launch({ headless: true });
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
  
    const results = await page.evaluate(() => Array.from(document.querySelector('tbody').querySelectorAll('tr'), (e) => ({
    //   from: e.children[1].children[0].innerText,
    //   to: e.children[1].children[1].innerText,
      dateFrom: e.children[2].innerText.slice(0, 8),
      fromTime: e.children[3].children[0].children[0].children[2].innerText,
      toTime: e.children[3].children[1].children[0].children[2].innerText,
      dateTo: e.children[2].innerText.slice(0, 8)
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