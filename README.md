# Refinery Landing

Refinery 제품 소개 사이트 — **Astro 기반 정적 사이트**. 랜딩 + 문의 + 블로그(추후 매뉴얼)를
하나의 리포에서 빌드해 Vercel에 배포한다. 애플리케이션은 별도 서버에서 서빙된다.

- 프로덕션: https://refinery.kr/
- 상세 개발·협업 규칙: [`CLAUDE.md`](CLAUDE.md)

## 빠른 시작

```bash
nvm use          # Node 22 (.nvmrc)
npm install
npm run dev      # http://localhost:4321
```

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 정적 빌드 → `dist/` |
| `npm run preview` | 빌드 결과 미리보기 |

## 아키텍처

**Astro(정적 출력).** Vercel이 Astro를 자동 감지해 `astro build` → `dist/`를 배포한다.
`build.format: 'file'`로 산출물은 `dist/contact.html` 형태이고, `vercel.json`의 `cleanUrls: true`가
서빙 URL을 클린 URL(`/contact`)로 만든다. 링크·canonical·sitemap은 모두 클린 URL로 통일한다.

```
src/
├─ layouts/
│  ├─ BaseLayout.astro   # 공유 <head>·SEO·분석·쿠키 동의 골격
│  └─ BlogPost.astro     # 글 레이아웃(BlogPosting JSON-LD·목차·이전/다음 글)
├─ components/
│  ├─ Seo.astro          # title/canonical/OG/Twitter/hreflang/JSON-LD
│  ├─ Analytics.astro    # 쿠키리스 분석만 — Vercel Analytics·Speed Insights
│  ├─ CookieConsent.astro# 동의 배너 + GA·Mixpanel 게이팅 로더
│  ├─ Nav.astro          # 메가메뉴 + 모바일 패널
│  ├─ Footer.astro       # 푸터(법적 고지·쿠키 설정)
│  └─ LanguageSwitcher.astro
├─ pages/
│  ├─ index.astro        # 랜딩(ko) / en/index.astro  # 랜딩(en, 별도 복제본)
│  ├─ contact.astro      # 문의(web3forms)
│  ├─ industries/[slug].astro · use-cases/[slug].astro  # 데이터 주도 생성
│  ├─ company · docs · resources · why-refinery · whitepapers/* · reports/*
│  ├─ privacy · terms · cookie-policy
│  ├─ blog/index.astro   # 블로그 목록
│  ├─ blog/[...slug].astro # 글 상세
│  └─ rss.xml.js         # RSS 피드      → /rss.xml
├─ content/blog/*.md     # 글 원본(컬렉션, 스키마: content.config.ts)
├─ data/                 # industries·usecases 데이터(페이지 자동 생성 소스)
├─ i18n/ui.ts            # 다국어 사전 + 헬퍼
└─ styles/               # global(랜딩)·nav-footer·contact·blog·industry·whitepaper·legal
public/                  # 경로 고정 자산(이미지·favicon·og-image·robots·데모 iframe)
middleware.ts            # Vercel Edge — 홈(/)에서만 언어 자동 안내
```

**핵심**: `<head>`와 추적을 `BaseLayout`+`Seo`+`Analytics`+`CookieConsent` **한 곳**에서 관리한다(페이지마다 복붙하지 않는다).
추적은 동의 여부로 갈린다 — 쿠키리스(Vercel)는 `Analytics.astro`에서 항상, GA·Mixpanel은 동의 후 `CookieConsent.astro`에서 로드.

## 콘텐츠 추가

**블로그 글** — `src/content/blog/`에 마크다운 추가:
```markdown
---
title: "제목"
description: "요약(검색·OG용)"
pubDate: 2026-07-29
author: "Refinery 팀"
tags: ["태그"]
draft: false
---
본문...
```
빌드하면 `/blog/<파일명>`로 생성되고, 목록·sitemap·RSS에 자동 반영된다.

**산업 · 유즈케이스 페이지** — `.astro` 템플릿은 건드리지 않는다. `src/data/industries/` 또는
`src/data/usecases/`에 타입(`types.ts`)에 맞는 데이터 파일을 추가하고 `index.ts`에 등록하면
`/industries/<slug>` · `/use-cases/<slug>`가 자동 생성된다(JSON-LD·sitemap 포함).

## SEO

- `@astrojs/sitemap` 자동 sitemap(`/sitemap-index.xml`) — 모든 페이지 포함
- 블로그 RSS `/rss.xml`
- 글별 `BlogPosting` JSON-LD, `og:type=article`, 클린 canonical(sitemap과 정합)
- 페이지별 메타는 `Seo.astro` props로 주입

## 이미지

래스터는 WebP로. 표시 크기에 맞춰 리사이즈(`cwebp -q 82 -resize <폭> 0 원본 -o out.webp`).
접힘선 아래는 `loading="lazy"`, 히어로엔 미적용. 신규 콘텐츠 이미지는 `src/assets` + `astro:assets`로 자동 최적화 가능.

## 배포 / 협업

- **`main` 직접 커밋 금지** → 작업 브랜치 → PR → 리뷰 → 머지.
- **`main` 머지 = 프로덕션 릴리스.** 머지 전 Vercel **Preview URL**에서 검증.
- 커밋/PR에 AI 공동작성·생성 표기 금지.
