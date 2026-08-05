# Refinery Landing — 개발 규칙

Refinery 제품 소개용 **Astro 기반 정적 사이트**. 랜딩 + 문의 + 블로그(추후 매뉴얼)를
하나의 리포에서 정적으로 빌드해 Vercel에 배포한다. (애플리케이션은 별도 서버에서 서빙)

## 프로젝트 성격
- **Astro (정적 출력)**: `astro build` → `dist/`. Vercel이 Astro를 자동 감지해 빌드·배포한다.
- Node **>=22.12** 필요(`.nvmrc`=22). 기여 전 `nvm use && npm install`.
- 개발: `npm run dev` · 빌드: `npm run build` · 미리보기: `npm run preview`.
- `build.format: 'file'` — 산출물은 `dist/contact.html` 형태(기존 URL 보존). 여기에 `vercel.json`의
  `cleanUrls: true`가 겹쳐, **프로덕션 서빙 URL은 클린 URL**이고 `/x.html` 요청은 `/x`로 308 리다이렉트된다.
  - 내부 링크·canonical·sitemap은 **클린 URL**로 쓴다(`/contact`, `/blog/<slug>`).
  - 단, 로컬 `npm run preview`에는 cleanUrls가 없다 → 프리뷰에선 `/contact`가 404, `/contact.html`만 뜬다.
    프리뷰에서만 나는 404는 배포 이슈가 아니다.

## 구조
```
src/
├─ layouts/    BaseLayout(공유 head)·BlogPost
├─ components/ Seo·Analytics·CookieConsent·Nav·Footer·LanguageSwitcher
├─ pages/      index.astro·en/index.astro·contact.astro·blog/*·rss.xml.js
│              industries/[slug]·use-cases/*·company·docs·resources·why-refinery
│              whitepapers/*·reports/*·privacy·terms·cookie-policy
├─ content/    blog/*.md (컬렉션, 스키마는 content.config.ts)
├─ data/       industries/*·usecases/* (데이터 주도 페이지 소스)
├─ i18n/       ui.ts (사전 + t·translatePath 헬퍼)
└─ styles/     global.css(랜딩)·nav-footer·contact·blog·industry·whitepaper·legal
public/        경로 고정 자산(이미지·favicon·og-image·robots·데모 iframe)
middleware.ts  Vercel Edge — 홈(/)에서만 언어 자동 안내(봇·쿠키 예외)
```
- **공유 head·추적은 `BaseLayout`+`Analytics`+`Seo`+`CookieConsent` 1곳**에서 관리한다. 페이지마다 복붙 금지.
- **산업·유즈케이스 페이지는 데이터 주도**다. `src/data/`에 타입에 맞는 데이터 파일을 추가하고
  `index.ts`에 등록하면 `/industries/<slug>`·`/use-cases/<slug>`가 자동 생성된다. 템플릿 `.astro`는 건드리지 않는다.
- 포팅된 랜딩/문의 본문은 전역 CSS·인라인 JS 보존을 위해 `<style is:global>`·`<script is:inline>` 사용.
  - 특히 GA `gtag`처럼 인라인 `onclick`이 참조하는 전역 함수는 `define:vars`(IIFE 래핑) 쓰지 말 것.
- **줄바꿈은 `<br>`로 명시한다.** 마크업 안의 개행은 빌드 시 공백으로 합쳐지므로,
  `white-space: pre-line`에 기대어 개행으로 줄을 나누면 화면에서 한 줄로 이어 붙는다.
  (JS가 `textContent`로 넣는 `\n`은 정상 동작 → 초기 렌더와 상호작용 후가 달라지는 함정)
  - 줄 수가 의도대로 안 나오면 `max-width`도 함께 볼 것. `<br>`가 있어도 폭이 좁으면 각 줄이 다시 감긴다.
    예: `.section-header-row p`의 공통값 360px 때문에 `#integrations` 소제목이 2줄 대신 4줄이 됐다.

## 이미지 규칙
- **래스터 이미지는 WebP로 커밋**한다. 표시 크기로 리사이즈(`cwebp -q 82 -resize <폭> 0 원본 -o 결과.webp`).
  - 배경/장식 `q 80`, 스크린샷/제품컷 `q 82`.
- 접힘선 아래 이미지는 `loading="lazy" decoding="async"`. 히어로/최상단에는 lazy 금지(LCP).
- CLS 방지를 위해 `width`/`height` 지정.
- 블로그 등 신규 콘텐츠 이미지는 `src/assets` + `astro:assets`(`<Image>`)로 빌드시 자동 최적화 가능.
- 경로 고정 자산(favicon, og-image, iframe 데모 등)은 `public/`. `og-image.png`는 소셜 호환 위해 PNG 유지.

## 에셋 위생
- 사이트에서 참조되지 않는 이미지·폰트·죽은 코드는 커밋하지 않는다.
- `node_modules`, `dist`, `.astro`, `.DS_Store`, `.vercel`은 `.gitignore`로 제외.
- 디자인 원본(`Refinery UI/`)·미사용 standalone HTML은 `.vercelignore`로 배포 업로드에서 제외.

## 분석/추적 (Analytics) — 동의 여부로 로드 위치가 갈린다
모두 `BaseLayout`에서 자동 포함되지만, **쿠키 사용 여부에 따라 파일이 다르다.**

| 파일 | 로드 대상 | 조건 |
|---|---|---|
| `src/components/Analytics.astro` | Vercel Web Analytics `/_vercel/insights/script.js` · Speed Insights `/_vercel/speed-insights/script.js` | 항상 (쿠키리스) |
| `src/components/CookieConsent.astro` | Google Analytics (`gtag`, ID `G-26MDX5Q369`) · Mixpanel (`mixpanel.init`) | `cookie_consent=granted` 쿠키가 있을 때만 |

- **GA·Mixpanel 관련 작업은 `Analytics.astro`가 아니라 `CookieConsent.astro`에서 한다.**
- 동의 배너는 미결정 시 노출, 푸터 '쿠키 설정' 버튼이 `window.openCookieSettings()`로 재노출한다.
- Vercel 두 종은 **대시보드에서 각각 Enable** 해야 수집되며, localhost 404는 정상.

## SEO / 메타 — `src/components/Seo.astro`
- 페이지별 `title`/`description`/`canonical`/OG/Twitter/`theme-color`를 props로 주입.
- 공개 색인 페이지 `robots: index`, 문의/유틸 `noindex, follow`.
- **sitemap은 `@astrojs/sitemap`이 자동 생성**(`/sitemap-index.xml`), 블로그 **RSS는 `/rss.xml`**.
- 블로그 글은 `BlogPosting` JSON-LD + `og:type=article`. canonical은 클린 URL(sitemap 정합).
- `jsonLd` prop은 객체·배열 모두 가능(홈은 Organization + FAQPage 2개).
- 정식 도메인은 **`https://refinery.kr`**로 전환 완료(`astro.config.mjs`의 `site`·robots·JSON-LD 기준값).

## 다국어(i18n) — 현재 상태
- 설계: `ko`(무접두사) · `en`(`/en`) · `ja`(`/ja`, 미구현). 로드맵은 `I18N-PLAN.md`.
- **주의: `/en`은 사전 기반이 아니라 `index.astro`를 복제한 별도 파일(`src/pages/en/index.astro`)이다.**
  `Nav.astro`/`Footer.astro`도 쓰지 않고 자체 인라인 nav를 갖는다.
  → **랜딩 카피·네비게이션 변경은 ko/en 두 파일을 함께 고쳐야 한다.**
- `src/i18n/ui.ts`의 사전·헬퍼는 아직 일부만 사용 중(카피 외부화는 미완).
- hreflang은 `alternates` prop을 넘긴 페이지에서만 출력한다(존재하는 로케일만).

## 폼
- 문의 폼은 web3forms(`access_key`는 클라이언트 공개가 정상). 스팸 방어용 honeypot(`botcheck`) 유지/추가.

## Git / 협업 · 배포 흐름
- **`main` 직접 커밋·푸시 금지.** 모든 변경은 작업 브랜치에서 진행한다.
- **2단계 흐름**: 작업 브랜치 → **`develop`(통합·스테이징)** → **`main`(프로덕션)**. 상세 전략은 [CONTRIBUTING.md](CONTRIBUTING.md).
  - 작업 브랜치는 **`develop`에서 분기**하고 **`develop`으로 PR**한다 (base=develop).
  - 릴리스는 **`develop` → `main` PR**로 한다. **`main` 머지 = 프로덕션 자동 배포(refinery.kr).**
  - 긴급 수정은 `hotfix/*` (main에서 분기 → main·develop 둘 다 반영).
- 브랜치 네이밍: `feat/`, `fix/`, `chore/`, `docs/`, `content/` + 짧은 설명.
- 머지 전 반드시 **Preview 배포 URL**에서 검증한다(스테이징 = `develop` Preview). 상태코드만 믿지 말고 히어로 iframe 등 실제 표시를 육안 확인.
- 커밋 메시지는 한국어 요약 + 변경 근거. 이미지 변환은 before/after 용량을 남긴다.
- PR 본문에는 변경 요약 · 검증 방법 · 영향 범위를 적는다.
- 커밋·PR 메시지에 **AI 공동작성/생성 표기를 넣지 않는다** (`Co-Authored-By`, `Generated with ...` 등 금지).

## 변경 후 로컬 확인
```bash
npm run build && npm run preview   # http://localhost:4321
```
- 콘솔 에러(404) 0, 깨진 이미지 0. sitemap/RSS 생성, 추적 스크립트 로드 확인.
- 배포 후 프로덕션에서 히어로 iframe 등 외부 리소스가 실제로 뜨는지 **육안 확인**(상태코드만 믿지 말 것).
