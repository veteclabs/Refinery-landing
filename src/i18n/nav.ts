// 헤더·푸터 IA를 로케일별로 정의한다. Nav.astro·Footer.astro가 현재 로케일로 골라 렌더한다.
//
// ko와 en은 같은 축·같은 구조를 쓴다(솔루션·리소스·회사 / Solutions·Resources·Company).
// 영어 페이지가 아직 없는 항목만 Soon 배지로 두고, 페이지가 생기면 href를 채운다.
// 예외: Blog는 영어판이 없어 한국어 /blog로 연결된다.

export type NavLink = { label: string; href?: string; badge?: string };
export type NavGroup = { title?: string; items: NavLink[] };
export type NavMenu = { label: string; href: string; groups?: NavGroup[] };
export type FooterCol = { title: string; items: NavLink[] };

type Lang = 'ko' | 'en';

/** 헤더 메가메뉴 */
export const navMenu: Record<Lang, NavMenu[]> = {
  ko: [
    {
      label: '솔루션',
      href: '/#industries',
      groups: [
        {
          // 랜딩 #industries 카드와 같은 목록·같은 순서를 유지한다.
          // 실제 페이지가 있는 곳만 링크, 나머지는 준비중 배지.
          title: '산업별',
          items: [
            { label: '에너지 · 유틸리티', href: '/industries/energy' },
            { label: '정유 · 가스', badge: '준비중' },
            { label: '데이터센터', badge: '준비중' },
            { label: '철강', badge: '준비중' },
            { label: '화학 · 정밀화학', badge: '준비중' },
            { label: '물류', badge: '준비중' },
            { label: '환경', badge: '준비중' },
          ],
        },
        {
          // '산업별'과 짝을 이루는 축 이름. 목적지는 /use-cases 그대로.
          title: '과제별',
          items: [
            { label: '예지보전', href: '/use-cases/predictive-maintenance' },
            { label: '센서 모니터링(IoT)', href: '/use-cases/sensor-monitoring' },
            { label: '전력관리', href: '/use-cases/power-management' },
            { label: '전력품질', href: '/use-cases/power-quality' },
            { label: '공장 에너지관리', href: '/use-cases/factory-energy' },
            { label: '에너지 최적화', href: '/use-cases/energy-optimization' },
            { label: '품질 예측', href: '/use-cases/quality-prediction' },
          ],
        },
      ],
    },
    {
      label: '리소스',
      href: '/blog',
      groups: [
        {
          items: [
            { label: '블로그', href: '/blog' },
            { label: '문서', href: '/docs' },
            { label: '자료실 · 백서', href: '/resources' },
          ],
        },
      ],
    },
    {
      label: '회사',
      href: '/company',
      groups: [
        {
          // 한 열이라 제목을 두지 않는다(리소스 메뉴와 같은 형태).
          // 문의는 헤더 우측 상시 버튼이 담당하고, 약관류는 푸터에 둔다.
          items: [
            { label: '회사 소개', href: '/company' },
            { label: '연혁 · 팀', badge: '준비중' },
            { label: '채용', badge: '준비중' },
            { label: '뉴스룸', badge: '준비중' },
          ],
        },
      ],
    },
  ],

  // 한국어와 같은 3축 구조(솔루션·리소스·회사). 영어 페이지가 없는 항목만 Soon 배지다.
  en: [
    {
      label: 'Solutions',
      href: '/en#industries',
      groups: [
        {
          title: 'By industry',
          items: [
            { label: 'Energy & Utilities', href: '/en/industries/energy' },
            { label: 'Oil & Gas', badge: 'Soon' },
            { label: 'Data centers', badge: 'Soon' },
            { label: 'Steel', badge: 'Soon' },
            { label: 'Chemicals', badge: 'Soon' },
            { label: 'Logistics', badge: 'Soon' },
            { label: 'Environment', badge: 'Soon' },
          ],
        },
        {
          title: 'By challenge',
          items: [
            { label: 'Predictive maintenance', href: '/en/use-cases/predictive-maintenance' },
            { label: 'Multi-sensor monitoring', href: '/en/use-cases/sensor-monitoring' },
            { label: 'Power management', href: '/en/use-cases/power-management' },
            { label: 'Power quality', href: '/en/use-cases/power-quality' },
            { label: 'Factory energy management', href: '/en/use-cases/factory-energy' },
            { label: 'Energy optimization', href: '/en/use-cases/energy-optimization' },
            { label: 'Quality prediction', href: '/en/use-cases/quality-prediction' },
          ],
        },
      ],
    },
    {
      label: 'Resources',
      href: '/blog',
      groups: [
        {
          items: [
            // 영어 블로그가 없어 Blog만 한국어로 연결된다.
            { label: 'Blog', href: '/blog' },
            { label: 'Docs', href: '/en/docs' },
            { label: 'Resources & whitepapers', href: '/en/resources' },
          ],
        },
      ],
    },
    {
      label: 'Company',
      href: '/en/company',
      groups: [
        {
          items: [
            { label: 'About', href: '/en/company' },
            { label: 'History & team', badge: 'Soon' },
            { label: 'Careers', badge: 'Soon' },
            { label: 'Newsroom', badge: 'Soon' },
          ],
        },
      ],
    },
  ],
};

/** 푸터 열 */
export const footerCols: Record<Lang, FooterCol[]> = {
  ko: [
    {
      title: '솔루션',
      items: [
        { label: '에너지 · 유틸리티', href: '/industries/energy' },
        { label: '예지보전', href: '/use-cases/predictive-maintenance' },
        { label: '센서 모니터링(IoT)', href: '/use-cases/sensor-monitoring' },
        { label: '전력관리', href: '/use-cases/power-management' },
        { label: '전력품질', href: '/use-cases/power-quality' },
        { label: '공장 에너지관리', href: '/use-cases/factory-energy' },
        { label: '에너지 최적화', href: '/use-cases/energy-optimization' },
        { label: '품질 예측', href: '/use-cases/quality-prediction' },
      ],
    },
    {
      title: '리소스',
      items: [
        { label: '블로그', href: '/blog' },
        { label: '문서', href: '/docs' },
        { label: '자료실 · 백서', href: '/resources' },
      ],
    },
    {
      title: '회사',
      items: [
        { label: '회사 소개', href: '/company' },
        { label: '문의하기', href: '/contact' },
      ],
    },
    {
      title: '약관',
      items: [
        { label: '개인정보처리방침', href: '/privacy' },
        { label: '이용약관', href: '/terms' },
        { label: '쿠키 정책', href: '/cookie-policy' },
        // href 없는 항목은 '쿠키 설정' 버튼으로 렌더된다(배너를 다시 여는 동작).
        { label: '쿠키 설정' },
      ],
    },
  ],
  en: [
    {
      title: 'Solutions',
      items: [
        { label: 'Energy & Utilities', href: '/en/industries/energy' },
        { label: 'Predictive maintenance', href: '/en/use-cases/predictive-maintenance' },
        { label: 'Multi-sensor monitoring', href: '/en/use-cases/sensor-monitoring' },
        { label: 'Power management', href: '/en/use-cases/power-management' },
        { label: 'Power quality', href: '/en/use-cases/power-quality' },
        { label: 'Factory energy management', href: '/en/use-cases/factory-energy' },
        { label: 'Energy optimization', href: '/en/use-cases/energy-optimization' },
        { label: 'Quality prediction', href: '/en/use-cases/quality-prediction' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'Blog', href: '/blog' },
        { label: 'Docs', href: '/en/docs' },
        { label: 'Resources & whitepapers', href: '/en/resources' },
      ],
    },
    {
      title: 'Company',
      items: [
        { label: 'About', href: '/en/company' },
        { label: 'Contact', href: '/en/contact' },
      ],
    },
    {
      // 약관은 법적 효력이 있어 전문 번역 전까지 영어판을 만들지 않는다. 한국어 페이지로 연결.
      title: 'Legal',
      items: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookie-policy' },
        { label: 'Cookie Settings' },
      ],
    },
  ],
};

/** 헤더 우측 상시 CTA·접근성 라벨 */
export const navUi: Record<Lang, { cta: string; ctaHref: string; home: string; openMenu: string; tagline: string }> = {
  ko: { cta: '문의하기', ctaHref: '/contact', home: 'Refinery 홈', openMenu: '메뉴 열기', tagline: 'Refining complexity<br>into pure insight' },
  en: { cta: 'Contact', ctaHref: '/en/contact', home: 'Refinery home', openMenu: 'Open menu', tagline: 'Refining complexity<br>into pure insight' },
};
