export default function parser(results) {
  const schools = []

  for (let i = 0; i < results.length; i++) {
    let values = results[i].split(';')
    const EIIN = values[0].split('-')[0].trim().split(':')[1].trim()
    const school = { EIIN }
    let key = ''
    values = values.map(s => s.replace(': ', '').trim())
    for (let j = 1; j < values.length; j++) {
      if (!values[j]) continue
      if (values[j].includes('PASSED') || values[j].includes('NOT PASSED') || values[j].includes('GPA5')) {
        try {
          let stat = values[j].split('=')
          school[key][stat[0]] = Number(stat[1])
        } catch (e) {
          continue
        }
      } else {
        key = values[j]
        school[key] = {}
      }
    }
    schools.push(school)
  }

  return schools
}
