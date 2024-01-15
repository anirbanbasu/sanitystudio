const languages = [
    {id: 'en', title: 'English', isDefault: true},
    {id: 'ja', title: '日本語'},
    {id: 'ba', title: 'বাংলা'},
    {id: 'es', title: 'Español'},
  ]
  
const defaultLanguage = languages.find((item) => item.isDefault);

const i18n = {
    languages,
    base: defaultLanguage ? defaultLanguage.id : 'en', // default to 'en' if no default language is found
}
  
const googleTranslateLanguages = languages.map(({id, title}) => ({id, title}))
  
export {i18n, googleTranslateLanguages}