import { createObjectCsvWriter } from 'csv-writer';
import path from 'node:path';
import { fileURLToPath } from 'url';

//writer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const csvWriter = createObjectCsvWriter({
  path: path.resolve(__dirname, 'scrapper.csv'),
  header: [
    {id: 'prodCode', title: 'prodCode'},
    {id: 'prodTitle', title: 'prodTitle'},
    {id: 'fullPrice', title: 'fullPrice'},
    {id: 'currentPrice', title: 'currentPrice'},
    {id: 'specialConditions', title: 'specialConditions'},
  ]
})
