import puppeteer, { Page } from 'puppeteer';

//function scrapps by search form
async function gtBrouser(url, searchQuery) {
  try{
    const browser = await puppeteer.launch({headless: false, defaultViewport: null,});
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(1000);
  
    // Type into search box
    const searchResultSelector = '#srht'
    await page.type('#srht', searchQuery);
    await page.click('#srch');
    await page.waitForSelector('.fdpl');
  
    //get page data
    const items = async () => await page.evaluate(() => {
      const itemList = document.querySelectorAll('.fdpl');
      return Array.from(itemList).map((item) => {
        const prodCode = item.querySelector('.idf > span').innerText;
        const prodTitle = item.querySelector('.name > a').innerText;
        const fullPrice = item.querySelector('.pro').innerText.trim().replace(' руб. за шт', '').replace(' руб. за упак', '');
        const currentPrice = item.querySelector('.prc').innerText.trim().replace('Цена: ', '').replace(' р. за упак','').replace(' р. за шт','');
        const specialConditions = ''
        return { prodCode, prodTitle, fullPrice, currentPrice, specialConditions }
      })
    })
  
    //get number of pages in search results
    const searchPagesQnty = await page.evaluate(() => {
      return document.querySelector('#stbl > div.flexb.rcat > div:nth-child(2) > div:nth-child(1) > table > tbody > tr > td.snd').children.length
    })
    //scrapp first page
    let result = await items()
    //scrapp next pages
    if (searchPagesQnty > 1) {
      let i = 2
      do {
        await page.click('#stbl > div.flexb.rcat > div:nth-child(2) > div:nth-child(1) > table > tbody > tr > td.snd > a:nth-child('+ i +')');
        await page.waitForSelector('.fdpl');
        await page.waitForTimeout(5000)
        let res = await items()
        result.push(...res)
        i ++
      } while (i <= searchPagesQnty)
    }
    browser.close();
    console.log('GTB done!');
    return result
  } catch (err) {
    console.log(err)
  }
}
export default gtBrouser;