# Refinery Landing — 개발 규칙

Refinery 제품 소개용 **Astro 기반 정적 사이트**. 랜딩 + 문의 + 블로그(추후 매뉴얼)를
하나의 리포에서 정적으로 빌드해 Vercel에 배포한다. (애플리케이션은 별도 서버에서 서빙)

## 프로젝트 성격
- **Astro (정적 출력)**: `astro build` → `dist/`. Vercel이 Astro를 자동 감지해 빌드·배포한다.
- Node **>=22.12** 필요(`.nvmrc`=22). 기여 전 `nvm use && npm install`.
- 개발: `npm run dev` · 빌드: `npm run build` · 미리보기: `npm run preview`.
- `build.format: 'file'` — 기존 URL 보존(`/contact.html` 등). 링크는 `.html`, canonical/sitemap은 클린 URL.

## 구조
```
src/
├─ layouts/    BaseLayout(공유 head)·BlogPost
├─ components/ Seo·Analytics·SiteHeader·SiteFooter
├─ pages/      index.astro·contact.astro·blog/*·rss.xml.js
├─ content/    blog/*.md (컬렉션, 스키마는 content.config.ts)
└─ styles/     global.css(랜딩)·contact.css·blog.css
public/        경로 고정 자산(이미지·favicon·og-image·robots·데모 iframe)
```
- **공유 head·추적은 `BaseLayout`+`Analytics`+`Seo` 1곳**에서 관리한다. 페이지마다 복붙 금지.
- 포팅된 랜딩/문의 본문은 전역 CSS·인라인 JS 보존을 위해 `<style is:global>`·`<script is:inline>` 사용.
  - 특히 GA `gtag`처럼 인라인 `onclick`이 참조하는 전역 함수는 `define:vars`(IIFE 래핑) 쓰지 말 것.

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

## 분석/추적 (Analytics) — `src/components/Analytics.astro` 1곳
4종을 모든 페이지(BaseLayout)에서 자동 로드한다.
- Google Analytics (`gtag`, ID `G-26MDX5Q369`) · Mixpanel (`mixpanel.init`)
- Vercel Web Analytics `/_vercel/insights/script.js` · Speed Insights `/_vercel/speed-insights/script.js`

Vercel 두 종은 **대시보드에서 각각 Enable** 해야 수집되며, localhost 404는 정상.

## SEO / 메타 — `src/components/Seo.astro`
- 페이지별 `title`/`description`/`canonical`/OG/Twitter/`theme-color`를 props로 주입.
- 공개 색인 페이지 `robots: index`, 문의/유틸 `noindex, follow`.
- **sitemap은 `@astrojs/sitemap`이 자동 생성**(`/sitemap-index.xml`), 블로그 **RSS는 `/rss.xml`**.
- 블로그 글은 `BlogPosting` JSON-LD + `og:type=article`. canonical은 클린 URL(sitemap 정합).
- 정식 도메인 연결 시 `astro.config.mjs`의 `site`와 robots/OG의 `*.vercel.app`을 교체.

## 폼
- 문의 폼은 web3forms(`access_key`는 클라이언트 공개가 정상). 스팸 방어용 honeypot(`botcheck`) 유지/추가.

## Git / 협업 · 배포 흐름
- **`main` 직접 커밋·푸시 금지.** 모든 변경은 작업 브랜치에서 진행한다.
- 흐름: 작업 브랜치 → 커밋 → 푸시 → **PR 생성** → 리뷰 → `main` 머지. PR 없이 `main`에 반영하지 않는다.
- 브랜치 네이밍: `feat/`, `fix/`, `chore/`, `docs/` + 짧은 설명.
- **`main` 머지 = 프로덕션 릴리스**(자동 배포). 머지 전 반드시 **Preview 배포 URL**에서 검증한다.
- 커밋 메시지는 한국어 요약 + 변경 근거. 이미지 변환은 before/after 용량을 남긴다.
- PR 본문에는 변경 요약 · 검증 방법 · 영향 범위를 적는다.
- 커밋·PR 메시지에 **AI 공동작성/생성 표기를 넣지 않는다** (`Co-Authored-By`, `Generated with ...` 등 금지).

## 변경 후 로컬 확인
```bash
npm run build && npm run preview   # http://localhost:4321
```
- 콘솔 에러(404) 0, 깨진 이미지 0. sitemap/RSS 생성, 추적 스크립트 로드 확인.
- 배포 후 프로덕션에서 히어로 iframe 등 외부 리소스가 실제로 뜨는지 **육안 확인**(상태코드만 믿지 말 것).
