import { getRequestConfig } from 'next-intl/server'

const LOCALES = ['en', 'es'] as const

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !LOCALES.includes(locale as typeof LOCALES[number])) {
    locale = 'en'
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
