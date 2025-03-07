"use client";

import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { ReactNode } from "react";
import translations from "@/locales/locales"; // Import translation messages

type Props = {
  children: ReactNode;
  locale: string;
};

export default function Providers({ children, locale }: Props) {
  // Fallback to "en" if locale is not found
  const messages: AbstractIntlMessages = translations[locale] || translations["en"];

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      {children}
    </NextIntlClientProvider>
  );
}
