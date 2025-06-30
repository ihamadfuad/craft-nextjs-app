 
export const localizationSets = {
  en: () => import('../assets/localizations/en.json').then((module) => module.default),
  ar: () => import('../assets/localizations/ar.json').then((module) => module.default),
}
 
export const localizations = async (locale: 'en' | 'ar') =>
  localizationSets[locale]()