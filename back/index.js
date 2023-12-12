const puppeteer = require('puppeteer-extra');
const config = require('./config.js')
const tf = require('@tensorflow/tfjs')
const path = require('path');
const fs = require('fs');
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

function extractClasses(inputString) {
  const idRegex = /id="([^"]*)"/
  const classRegex = /class="([^"]*)"/g;
  let match;
  let result = '';
 
  const idMatch = idRegex.exec(inputString);
    if (idMatch) {
        result = '#' + idMatch[1];
    }
 
  while ((match = classRegex.exec(inputString)) !== null) {
      result += match[1].split(/\s+/).map(className => '.' + className).join('');
  }
 
  return result;
}

//MODEL
async function loadModel() {
  const model = await tf.loadLayersModel('https://raw.githubusercontent.com/dabuk58/web-scraping/ML/machine%20learning/machine%20learning%20script/model/model.json');
  return model;
}

function convertStringToAscii(inputString, fixedLength = 175) {
  let asciiArray = [];
  for (let i = 0; i < fixedLength; i++) {
      if (i < inputString.length) {
          asciiArray.push(inputString.charCodeAt(i));
      } else {
          asciiArray.push(0);
      }
  }
  return asciiArray;
}

async function predict(model, inputString) {
  const inputAscii = convertStringToAscii(inputString);
  const inputTensor = tf.tensor2d([inputAscii], [1, 175]);
  const prediction = model.predict(inputTensor);
  const result = prediction.arraySync()[0][0];
  return result;
}

async function runPredictions(inputs) {
  const loadedModel = await loadModel();
  const inputsArray = []

  for (const input of inputs) {
    const predictionResult = await predict(loadedModel, input);

    if (predictionResult > 0.5) {
      inputsArray.push(input)
    }
  }

  return inputsArray
}

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
  let {url, modal, inputFrom, inputTo, inputDate, inputTime, age, submit} = config

  const predictedInputs = await runPredictions(await takeInputs(url))
  const content = await page.content()

  inputFrom = !content.includes(inputFrom.slice(1,inputFrom.length-1)) ? extractClasses(predictedInputs[0]) : inputFrom
  inputTo = !content.includes(inputTo.slice(1,inputTo.length-1)) ? extractClasses(predictedInputs[1]) : inputTo

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
  let {url, modal, inputFrom, inputTo, inputDate, inputTime, submit} = config

  const predictedInputs = await runPredictions(await takeInputs(url))

  const content = await page.content()

  await page.click(modal);
  inputFrom = !content.includes(inputFrom.slice(1)) ? extractClasses(predictedInputs[0]) : inputFrom
  inputTo = !content.includes(inputTo.slice(1)) ? extractClasses(predictedInputs[1]) : inputTo

  console.log(inputFrom)
  console.log(inputTo)

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
  let {url, modal, inputFrom, inputTo, inputDate, inputTime, submit} = config

  const inputsToPredict = await takeInputs(url);
  console.log(inputsToPredict);

  const predictedInputs = await runPredictions(inputsToPredict);
  console.log(predictedInputs);
  const content = await page.content();
  
  inputFrom = (!content.includes(inputFrom.slice(1)) ? extractClasses(predictedInputs[0]) : inputFrom);
  inputTo = (!content.includes(inputTo.slice(1)) ? extractClasses(predictedInputs[1]) : inputTo);

  await page.type(inputFrom, from);
//   await page.waitForTimeout(1000);
  await page.type(inputTo, to);
//   await page.waitForTimeout(1000);

  await page.evaluate((date, time, inputDate, inputTime) => {
      document.getElementById(inputDate[0]).value = date;
      document.getElementById(inputTime[0]).value = time;
  }, departureDate, departureTime, inputDate, inputTime);

  await page.evaluate((directTrain, search) => {
    document.querySelector(directTrain).click();
    document.querySelector(search).click();
  }, submit[0], submit[1]);

  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  await page.waitForTimeout(3000);

  const results = await page.$$eval('.search-results__item', (elements) =>
    elements.map((e) => ({
        fromTime: e.querySelectorAll('.search-results__item-hour')[0].innerText,
        toTime: e.querySelectorAll('.search-results__item-hour')[1].innerText,
        dateFrom: e.querySelectorAll('.search-results__item-date')[0].innerText,
        dateTo: e.querySelectorAll('.search-results__item-date')[1].innerText
    }))
  );
  
  await browser.close();

  return results;
}
 
const searchTrain = async (from, to, departureDate, departureTime, config, scrapWebsite) => {
  const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1920,1080']});
  const page = await browser.newPage();
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

app.post('/buy', async (req, res) => {
  try{
      const name = req.query.name;
      const surname = req.query.surname;
      const email = req.query.email;
      const ifBothWays = req.query.ifBothWays;
      const ifDog = req.query.ifDog;
      const ticketUrl = req.query.ticketUrl;

      if(!name || !surname || !email || !ifBothWays || !ifDog || !ticketUrl){
        return res.status(400).send("Please provide proper data");
      }

      const results = await buyTicketKS(name, surname, email, ifBothWays, ifDog, ticketUrl);

      res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})