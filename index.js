import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { load } from 'cheerio'
import vardict from 'vardict'
import preprocess from './preprocessor.js'
import parse from './parser.js'

const { default: { dir } } = vardict

const destDir = dir.replace('htm', 'json')
if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true })
}

const files = readdirSync(dir).filter(file => file.endsWith('.htm'))

files.forEach(file => {
  const fileContent = readFileSync(`${dir}/${file}`).toString()
  const processedContent = preprocess(fileContent)
  const $ = load(processedContent)
  const results = $('div.result').toArray().map(item => $(item).text())
  const data = parse(results)
  const district = file.split('.')[0]
  writeFileSync(`${destDir}/${district}.json`, JSON.stringify(data, null, 2))
})
