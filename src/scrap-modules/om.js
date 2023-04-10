import * as cheerio from 'cheerio';
import needle from 'needle';
    
//function takes URL and scrapps all results from page
const omScrapper = async (urlOM) => needle('get', urlOM)
  .then(function(resp){
    const html = resp.body;
    const $ = cheerio.load(html);
    const ul = $('.listItems > li');
    let productInfo = []
    ul.each(function(){
      const prodCode = $(this).find('.code').text().replace('Код ', '')
      const prodTitle = $(this).find('.name > a').text();
      const fullPrice = $(this).find('.Product__price--initial > .Price').text().replace(' руб.', '');
      const currentPrice = $(this).find('.Product__priceWrapper > .Product__price > .Price--best').text().replace(' руб.', '') 
                        || $(this).find('.Product__priceWrapper > .Product__price > .Price').text().replace(' руб.', '');
      const oneprice = $(this).find()
      const specialConditions = $(this).find('.Product__specialCondition').text();
      productInfo.push({
        prodCode,
        prodTitle,
        fullPrice,
        currentPrice,
        specialConditions
      })
    })
    console.log('OM done!');
    return productInfo
  })
  .catch(function(err) {
    console.log('smth wrong with om-parse');
  })
  

export default omScrapper  



