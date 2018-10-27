const puppeteer = require('puppeteer');
const fs = require('fs');
(async function () {
    let browswer = await puppeteer.launch({ headless: false });
    let page = await browswer.newPage();
    await page.goto('https://juejin.im/welcome/frontend');
    const titles = await page.$$eval('a.title', as => {
        return Array.from(as).map(a => a.innerText).join('\r\n-');
    });
    fs.writeFileSync('titles.txt', titles, 'UTF8');
})()