let puppeteer = require('puppeteer');
/**
 * 1.打开浏览器
 * 2. 打开一个页 newPage
 * 3.跳转到某个网址
 * 4.截图做一些工作
 * 5. 关闭浏览器
 */
(async function () {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://www.baidu.com');
    await page.screenshot({
        path: 'baidu.png',
        type: 'png'
    });
    //browser.close();
})();
