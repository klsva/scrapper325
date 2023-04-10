import omScrapper from './src/scrap-modules/om.js'
import gtBrouser from './src/scrap-modules/gtBrouser.js';
import { csvWriter } from './src/utils/csv-writer.js';
import { arr } from './src/urls-codes/urls.js'

async function run(urlGreenfieldOM, urlTessOM, urlJardinOM, urlJokeyOM, urlGTB, searchGreenfieldGTB, searchTessGTB, searchJardinGTB, searchJokeyGTB){
  //scrapp by brand 
  const resGreenfieldOM = await omScrapper(urlGreenfieldOM);
  await csvWriter.writeRecords(resGreenfieldOM);
  const resTessOM = await omScrapper(urlTessOM);
  await csvWriter.writeRecords(resTessOM);
  const resJardinOM = await omScrapper(urlJardinOM);
  await csvWriter.writeRecords(resJardinOM);
  const resJokeyOM = await omScrapper(urlJokeyOM);
  await csvWriter.writeRecords(resJokeyOM);

  //scrapp by search field
  const resGreenfieldGT = await gtBrouser(urlGTB, searchGreenfieldGTB);
  await csvWriter.writeRecords(resGreenfieldGT);
  const resTessGTB = await gtBrouser(urlGTB, searchTessGTB);
  await csvWriter.writeRecords(resTessGTB);
  const resJardinGTB = await gtBrouser(urlGTB, searchJardinGTB); 
  await csvWriter.writeRecords(resJardinGTB);
  const resJokeyGTB = await gtBrouser(urlGTB, searchJokeyGTB);
  await csvWriter.writeRecords(resJokeyGTB);

}

run(...arr)

