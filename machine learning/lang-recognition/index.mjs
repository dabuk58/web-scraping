import { franc } from 'franc';
import langs from 'langs';
import puppeteer from 'puppeteer';

async function fetchWebsiteText(url) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const text = await page.evaluate(() => {
            return document.querySelector('body').innerText;
        });

        await browser.close();

        return text.replace(/\s+/g, ' ').trim();
    } catch (error) {
        console.error('error:', error);
        return null;
    }
}

function detectLanguage(text) {
    const langCode = franc(text);

    switch(langCode){
        case 'arb':
            return 'Arabic';
        case 'cmn': 
            return 'Mandarin Chinese';
        case 'und':
            return 'not found language'; 
        default: 
            const language = langs.where("3", langCode);
            if(language == undefined){
                return langCode;
            }
            return language.name;
    }
}

const url = [
    'https://www.onet.pl',
    'https://www.pagina12.com.ar/', 
    'https://blitz.bg/', 
    'https://www.lefigaro.fr/', 
    'https://www.amazon.eg/', 
    'https://www.in.gr/',
    'https://www.ulifestyle.com.hk/',
    'https://www.aajtak.in/',
    'https://ameblo.jp/',
    'https://www.digi24.ro/', 
    'https://wasfaty.sa/' 
];

for(let i=0 ; i<url.length ; i++){
    fetchWebsiteText(url[i]).then(text => {
        if (text) {
            console.log(url[i], ": " + detectLanguage(text));
        }
    });
}

