import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { DEFAULT_LOCALE } from 'src/constants';

function LanguagePicker() {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;
  const messages: Record<string, string> = {
    es: 'Español',
    en: 'English',
  };

  const handleChange = (value: string) => {
    router.push({ pathname, query }, asPath, { locale: value });
  };

  const items: MenuProps['items'] = Object.entries(messages).map(
    ([key, value]) => ({
      key,
      label: (
        <button type="button" onClick={() => handleChange(key)}>
          {value}
        </button>
      ),
    })
  );
  return (
    <Dropdown menu={{ items }}>
      <div className="flex items-center gap-2 text-white text-sm">
        {messages[(locale as string) ?? DEFAULT_LOCALE]}
        <span className="material-symbols-outlined">expand_more</span>
      </div>
    </Dropdown>
  );
}

export default LanguagePicker;
