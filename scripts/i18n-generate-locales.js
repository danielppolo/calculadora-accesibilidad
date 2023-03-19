const fs = require('fs');

const rawSpanishDictionary = fs.readFileSync('src/locales/es.json');
const rawEnglishDictionary = fs.readFileSync('src/locales/en.json');

const spanishDictionary = JSON.parse(rawSpanishDictionary.toString());
const englishDictionary = JSON.parse(rawEnglishDictionary.toString());
const newEnglishDictionary = {};

for (const key in spanishDictionary) {
  newEnglishDictionary[key] =
    englishDictionary[key] || `[TRANSLATE]${spanishDictionary[key]}`;
}

fs.writeFileSync(
  'src/locales/en.json',
  JSON.stringify(newEnglishDictionary, null, 4)
);
