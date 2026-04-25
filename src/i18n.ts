import { getRequestConfig } from "next-intl/server";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = ((await requestLocale) as Locale) ?? defaultLocale;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
  };
});
