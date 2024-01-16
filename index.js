const puppeteer = require('puppeteer');

const findTypeOfDoctors = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage();
  await page.goto('https://centrum.med.pl/znajdz-lekarza/')

  const selects = await page.evaluate(() => {
    const selectElements = Array.from(document.querySelectorAll('select'));

    return selectElements.map(select => {
      const options = []

      if (select.innerText.includes('olog')) {
        for (let i = 0; i < select.children.length; i++) {
          options.push(select.children[i].innerText)
        }
      }

      return options
    })
  })

  await browser.close()

  console.log(selects)
}

findTypeOfDoctors()