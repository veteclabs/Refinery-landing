# Astro 마이그레이션 플랜 — Refinery Landing

> 목적: 현재 무빌드 정적 2페이지(`index.html`, `contact.html`)를 **Astro 기반 정적 사이트**로 이전하여
> 랜딩 + 블로그/콘텐츠 + 매뉴얼(문서) 다중 페이지와 SEO 확장을 지속 가능하게 만든다.
> 애플리케이션은 별도 서버에서 서빙되므로 이 리포는 **순수 콘텐츠/마케팅/문서 사이트**다.

상태: **초안 (미실행)** · 실행은 별도 브랜치에서 단계별 진행 · main/프로덕션은 검증·머지 전까지 무변경.

---

## 0. 결정 사항 (확정 필요)

| 항목 | 제안 | 비고 |
|---|---|---|
| 프레임워크 | **Astro (latest 5.x)** | JS 0 기본 출력, content collections, HTML 이전 용이 |
| 출력 모드 | `output: 'static'` | 순수 정적. Vercel이 Astro 자동 감지 → `astro build` → `dist/` |
| 패키지 매니저 | `npm` | Vercel 기본, 기존 안내와 일치 |
| Node | `>=20` (LTS) | `package.json` engines로 고정, Vercel 설정과 일치 |
| 언어 | `.astro` + Markdown(`.md`/`.mdx`) | 콘텐츠는 마크다운 |
| 문서(매뉴얼) | **Starlight**(별도 페이즈) | 사이드바·검색·TOC 기본 제공 |
| 이미지 | `astro:assets`(`<Image>`) 빌드 최적화로 전환 | 수동 `cwebp` 대체(자동 WebP/AVIF·CLS 방지). 고정경로 자산은 `public/` |

**핵심 트레이드오프:** "무빌드" 원칙을 포기한다. 이후 기여자는 `npm install` / `npm run dev` 필요.
대신 head 중복 제거·자동 sitemap/RSS·글별 SEO·클린 URL·문서 UI를 얻는다.

---

## 1. 목표 폴더 구조

```
refinery-landing/
├─ astro.config.mjs          # site URL · integrations(sitemap 등)
├─ package.json              # deps · scripts · engines
├─ tsconfig.json
├─ public/                   # 빌드 없이 그대로 서빙 (경로 고정 자산)
│  ├─ robots.txt
│  ├─ og-image.png           # 소셜 호환 위해 PNG 유지
│  ├─ fav_refienry-symbol.svg
│  └─ fonts/ (자가호스팅 시)
├─ src/
│  ├─ layouts/
│  │  ├─ BaseLayout.astro     # <html><head> 골격 · 공통 meta
│  │  └─ BlogPost.astro       # 글 레이아웃 · Article(JSON-LD)·작성일·저자
│  ├─ components/
│  │  ├─ Seo.astro            # title/desc/canonical/OG/twitter/JSON-LD
│  │  ├─ Analytics.astro      # GA · Mixpanel · Vercel Analytics · Speed Insights (1곳)
│  │  ├─ Nav.astro
│  │  └─ Footer.astro
│  ├─ pages/
│  │  ├─ index.astro          # 랜딩 (현 index.html 포팅)
│  │  ├─ contact.astro        # 문의 폼 (현 contact.html 포팅)
│  │  ├─ blog/
│  │  │  ├─ index.astro       # 글 목록
│  │  │  └─ [...slug].astro   # 글 상세 (컬렉션에서 생성)
│  │  └─ rss.xml.js           # RSS 피드 엔드포인트
│  ├─ content/
│  │  ├─ config.ts            # 컬렉션 스키마 (zod: title/description/pubDate/author/ogImage...)
│  │  └─ blog/*.md(x)         # 글 원본
│  ├─ assets/                 # 빌드 최적화 대상 이미지 (astro:assets)
│  │  └─ solutions/*
│  └─ styles/
│     └─ global.css           # 공통 리셋·토큰·전역 CSS (아래 3.2 주의)
├─ CLAUDE.md                  # 갱신 (무빌드 → 빌드 워크플로)
└─ README.md                  # 갱신
```

이전 완료 후 제거/이동: 루트의 `index.html`·`contact.html`(→ `src/pages`), 루트 흩어진 SVG/webp(→ `src/assets` 또는 `public`).
`.vercelignore`는 빌드 산출물(`dist/`)만 배포되므로 대부분 불필요해짐(디자인 원본은 빌드에 포함 안 되게 `src` 밖에 두거나 별도 관리).

---

## 2. 의존성

```bash
# 코어
npm create astro@latest    # 최소 템플릿으로 스캐폴딩
# 통합
npm i @astrojs/sitemap     # sitemap 자동 생성 (현 홈 1개 문제 해결)
npm i @astrojs/rss         # 블로그 RSS 피드
npm i @astrojs/mdx         # (선택) 블로그 MDX
# 문서 섹션 (별도 페이즈)
npm i @astrojs/starlight   # /manual 매뉴얼 UI
```

- 이미지 최적화용 `sharp`는 Astro에 번들. `astro:assets`의 `<Image>`가 빌드 시 WebP/AVIF·반응형·width/height 자동.
- Vercel Analytics/Speed Insights: 현재의 `/_vercel/*/script.js` 태그를 `Analytics.astro`에 그대로 유지(가장 단순).
  또는 `@astrojs/vercel` 어댑터의 `webAnalytics`/`speedInsights` 옵션으로 주입(정적에선 태그 방식 권장).

---

## 3. 이전 시 핵심 주의점

### 3.1 head·애널리틱스 통합
- 현재 두 파일에 복붙된 `<head>`(메타·OG·폰트·GA·Mixpanel·Vercel 2종)를 **`BaseLayout.astro` + `Analytics.astro` 1곳**으로 통합.
- 페이지별로 다른 값(title/description/canonical/OG image)은 `Seo.astro`에 props로 주입.

### 3.2 전역 CSS 깨짐 방지 (가장 흔한 함정)
- 현재 CSS는 **전역 선택자**(`nav`, `.container`, `body` 등) 기반.
- Astro의 컴포넌트 `<style>`은 **기본이 scoped** → 그대로 옮기면 전역 규칙이 안 먹는다.
- **해결:** 기존 CSS는 `src/styles/global.css`로 옮겨 `BaseLayout`에서 1회 import(전역 유지).
  컴포넌트 고유 스타일만 점진적으로 scoped `<style>`로 분리. **1차 이전에는 리팩터링하지 말고 1:1 포팅**.

### 3.3 인라인 JS 이전
- `switchDash`(Solutions 탭), 내비 햄버거, 폼 제출(web3forms), select 커스터마이즈 등 인라인 `<script>`:
  - 우선 해당 페이지 컴포넌트의 `<script>`로 그대로 이동(Astro는 기본 번들·defer).
  - `switchDash`가 문자열로 참조하는 이미지 경로는 `astro:assets` 사용 시 import 방식으로 교체 필요(주의).
- 문의 폼: web3forms `POST` 유지(정적에서 클라이언트 fetch 그대로 동작). honeypot(`botcheck`) 추가 권장.

### 3.4 이미지 전략
- **콘텐츠/스크린샷 이미지** → `src/assets`로 옮기고 `<Image>` 사용 → 빌드시 자동 최적화(수동 cwebp 대체).
- **경로 고정 자산**(og-image, favicon, robots) → `public/` 유지.
- 기존 WebP 규칙은 "원본을 넣고 빌드가 최적화"로 진화. 결과물은 여전히 최적 WebP/AVIF.

---

## 4. SEO 확장 (이 이전의 핵심 이유)

- `astro.config.mjs`에 `site: 'https://refinery-ai-platform.vercel.app'` → 절대 URL·sitemap 활성.
- **자동 sitemap**(`@astrojs/sitemap`): 모든 라우트 포함(현재 홈 1개만 있는 문제 해결).
- **RSS**(`@astrojs/rss`): `/rss.xml` 블로그 피드.
- **구조화 데이터(JSON-LD)**:
  - 랜딩: 기존 `Organization` 유지 + FAQ 섹션에 `FAQPage`.
  - 블로그 글: `BlogPosting`/`Article`(제목·작성일·수정일·저자·이미지).
  - 블로그/매뉴얼: `BreadcrumbList`.
- **글별 메타**: canonical, OG image(글별 지정 가능), title/description를 frontmatter에서.
- robots.txt: `public/`으로 이동, Sitemap 경로 확인.
- (선택) 영문 확대 시 `hreflang`/i18n 라우팅.

---

## 5. 매뉴얼(문서) 섹션 — Starlight (별도 페이즈)

- `/manual`(또는 `/docs`)에 Starlight 통합 마운트 → 사이드바·전문 검색(Pagefind)·TOC·이전/다음 자동.
- 매뉴얼 글은 마크다운. 브랜드 톤과 맞추려면 Starlight 테마 CSS 오버라이드 필요(별도 작업).
- 랜딩/블로그(마케팅 톤)와 매뉴얼(문서 톤)의 UI를 **한 리포에서 섹션별로** 분리 제공.

---

## 6. 배포 (Vercel)

- Vercel이 Astro 자동 감지 → Framework Preset: Astro, Build: `astro build`, Output: `dist/`.
- **브랜치/PR = Preview URL 자동 생성** → 머지 전 실제 검증(지금 못 쓰던 이점 확보).
- Node 버전은 `package.json engines` + Vercel 프로젝트 설정 일치.
- main 머지 = 프로덕션 릴리스(기존 협업 규칙 그대로 적용).

---

## 7. 단계별 실행 (증분·저위험)

| 페이즈 | 내용 | 완료 기준 |
|---|---|---|
| **P0 스캐폴딩** | 브랜치 `feat/astro-migration`, Astro 초기화, config, deps, Node 고정 | `npm run dev` 빈 페이지 렌더 |
| **P1 랜딩 포팅** | BaseLayout·Nav·Footer·Analytics·Seo 구성, `index.astro` 1:1 포팅(global.css) | 현 프로덕션과 **시각 동일**, 콘솔 0 |
| **P2 문의 포팅** | `contact.astro` + 폼·JS 이전, honeypot 추가 | web3forms 제출 정상 |
| **P3 블로그** | 컬렉션 스키마, 목록/상세 라우트, 샘플 글, RSS, sitemap, BlogPosting | `/blog/샘플/` 200·피드·사이트맵 검증 |
| **P4 SEO 마감** | 글별 canonical/OG/JSON-LD, FAQPage, sitemap 전수, robots | Lighthouse SEO 100 근접 |
| **P5 매뉴얼(선택)** | Starlight `/manual` 뼈대 + 테마 정리 | 문서 UI 동작·검색 |
| **P6 문서 갱신** | CLAUDE.md(빌드 워크플로)·README 갱신 | 규칙 최신화 |
| **P7 배포·검증·PR** | Preview 검증 → PR → 머지 | 아래 체크리스트 통과 |

---

## 8. 최종 검증 체크리스트

- [ ] 랜딩·문의 **시각 동일**(주요 뷰포트 스크린샷 비교)
- [ ] 전 라우트 200, 존재하지 않는 경로 404
- [ ] 애널리틱스 4종(GA·Mixpanel·Vercel Analytics·Speed Insights) 프로덕션 HTML에 존재·발화
- [ ] sitemap에 모든 페이지 포함 / RSS 유효 / robots 정상
- [ ] 블로그 글 `BlogPosting`, FAQ `FAQPage` 등 구조화 데이터 유효(Rich Results Test)
- [ ] 이미지 최적화(WebP/AVIF)·width·height(CLS) 확인
- [ ] Lighthouse: Performance·SEO·Best Practices·A11y 확인(회귀 없음)
- [ ] 문의 폼 제출 정상, 콘솔 에러 0
- [ ] canonical/OG가 페이지별로 올바름

---

## 9. 리스크 & 완화

| 리스크 | 완화 |
|---|---|
| 전역 CSS scoped화로 스타일 깨짐 | 1차엔 `global.css`로 전역 유지, 1:1 포팅 후 점진 분리 |
| 인라인 JS(탭/폼/이미지 경로) 회귀 | 페이지별 `<script>`로 우선 이동, 이미지 import 경로 별도 검증 |
| "무빌드" 원칙 상실 → 진입장벽 | CLAUDE.md/README에 `npm i`·`npm run dev/build` 명문화 |
| 시각 회귀 | 프로덕션 스크린샷 대비 diff, Preview URL 검증 후에만 머지 |
| 롤백 필요 | main 무변경 유지 → 브랜치 폐기로 즉시 롤백 |

---

## 10. 다음 액션

1. 이 플랜 확정(프레임워크=Astro, 이미지=astro:assets 전환, 매뉴얼=Starlight 별도 페이즈).
2. 확정 시 `feat/astro-migration` 브랜치에서 **P0→P1**부터 착수, 각 페이즈 후 Preview로 확인.
3. 범위 축소 옵션: "블로그 먼저" 또는 "랜딩 포팅만 먼저"로 시작 가능.
