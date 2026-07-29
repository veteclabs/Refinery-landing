// 다국어 사전 + 헬퍼.
// 확정: 한국어 기본(무접두사), 영어 /en/, 일본어 /ja/.
// ⚠️ en/ja는 초안 → Preview 검토 → 원어민 검수 후 게시. 키는 I1에서 전면 확장.

export const languages = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
} as const;

export const defaultLang = 'ko';
export type Lang = keyof typeof languages;

// 스타터 키(공통 UI). 랜딩 본문 카피는 I1에서 순차 외부화한다.
export const ui = {
  ko: {
    'nav.platform': 'Platform',
    'nav.industries': 'Industries',
    'nav.solutions': 'Solutions',
    'nav.integrations': 'Integrations',
    'nav.security': 'Security',
    'nav.faq': 'FAQ',
    'nav.blog': 'Blog',
    'nav.contact': '문의하기',
    'cta.demo': '데모 신청하기',
    'footer.rights': '모든 권리 보유.',
  },
  en: {
    'nav.platform': 'Platform',
    'nav.industries': 'Industries',
    'nav.solutions': 'Solutions',
    'nav.integrations': 'Integrations',
    'nav.security': 'Security',
    'nav.faq': 'FAQ',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'cta.demo': 'Request a demo',
    'footer.rights': 'All rights reserved.',
  },
  ja: {
    'nav.platform': 'Platform',
    'nav.industries': 'Industries',
    'nav.solutions': 'Solutions',
    'nav.integrations': 'Integrations',
    'nav.security': 'Security',
    'nav.faq': 'FAQ',
    'nav.blog': 'Blog',
    'nav.contact': 'お問い合わせ',
    'cta.demo': 'デモを申し込む',
    'footer.rights': 'All rights reserved.',
  },
} as const;

export type UIKey = keyof (typeof ui)['ko'];

/** URL 경로에서 로케일 추출 (/en/..., /ja/... → 해당 로케일, 그 외 ko) */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg in languages) return seg as Lang;
  return defaultLang;
}

/** 로케일별 번역 함수. 키 미존재 시 ko로 폴백. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** 로케일 접두사 (ko는 무접두사) */
export function localePrefix(lang: Lang): string {
  return lang === defaultLang ? '' : `/${lang}`;
}

/** 현재 경로를 대상 로케일 경로로 변환 (스위처용). ko는 무접두사. */
export function translatePath(url: URL, target: Lang): string {
  const current = getLangFromUrl(url);
  let path = url.pathname;
  // 현재 로케일 접두사 제거 → 기준(ko) 경로
  if (current !== defaultLang) {
    path = path.replace(new RegExp(`^/${current}(?=/|$)`), '') || '/';
  }
  if (target === defaultLang) return path || '/';
  return `/${target}${path === '/' ? '' : path}` || `/${target}`;
}

/** 모든 로케일의 대체 경로 목록 (hreflang용) */
export function alternatesFor(url: URL): { lang: Lang; href: string }[] {
  return (Object.keys(languages) as Lang[]).map((lang) => ({
    lang,
    href: translatePath(url, lang),
  }));
}
