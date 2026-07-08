import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "sk", "ru", "de"],
  defaultLocale: "en"
});
