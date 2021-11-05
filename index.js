import { readFileSync, writeFileSync } from 'fs'
import { load } from 'cheerio'
import preprocess from './preprocessor.js'
import parse from './parser.js'

const district = 'COMILLA'

const fileContent = readFileSync(`data/${district.toUpperCase()}.htm`).toString()

const processedContent = preprocess(fileContent)

const $ = load(processedContent)

const results = $('div.result').toArray().map(item => $(item).text())

const data = parse(results)
console.log(data.length)

writeFileSync(`data/${district}.json`, JSON.stringify(data, null, 2))
