import { IntlProvider as RIIntlProvider } from 'react-intl';
import React from 'react';

import en from 'src/locales/en.json';
import es from 'src/locales/es.json';
import { useRouter } from 'next/router';
import { DEFAULT_LOCALE } from 'src/constants';

const translations = { en, es };

interface IntlProviderProps {
  children: React.ReactNode;
}

function IntlProvider({ children }: IntlProviderProps) {
  const { locale } = useRouter();
  const messages = translations[(locale as 'es' | 'en') ?? DEFAULT_LOCALE];

  return (
    <RIIntlProvider
      messages={messages}
      locale={locale ?? DEFAULT_LOCALE}
      defaultLocale={DEFAULT_LOCALE}
    >
      {children}
    </RIIntlProvider>
  );
}

export default IntlProvider;
