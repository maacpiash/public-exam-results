export default function preprocess(content) {
  return content.replaceAll(/(\r\n|\n|\r)/gm, '')
    .replaceAll('<br /><br /><font color="blue"', '</div><div class="result"><font color="blue"')
    .replaceAll('<br><br><font color="blue"', '</div><div class="result"><font color="blue"')
    .replaceAll('</font>', ';</font>')
    .replace('</div><div class="result">', '<div class="district">')
}
