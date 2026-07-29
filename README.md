# Refinery Landing

Refinery 제품 소개 사이트 — **Astro 기반 정적 사이트**. 랜딩 + 문의 + 블로그(추후 매뉴얼)를
하나의 리포에서 빌드해 Vercel에 배포한다. 애플리케이션은 별도 서버에서 서빙된다.

- 프로덕션: https://refinery-ai-platform.vercel.app/
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
`build.format: 'file'`로 기존 URL(`/contact.html` 등)을 보존한다.

```
src/
├─ layouts/
│  ├─ BaseLayout.astro   # 공유 <head>·SEO·Analytics 골격
│  └─ BlogPost.astro     # 글 레이아웃(BlogPosting JSON-LD)
├─ components/
│  ├─ Seo.astro          # title/canonical/OG/Twitter/JSON-LD
│  ├─ Analytics.astro    # GA·Mixpanel·Vercel Analytics·Speed Insights (1곳)
│  ├─ SiteHeader.astro / SiteFooter.astro   # 콘텐츠 페이지용
├─ pages/
│  ├─ index.astro        # 랜딩
│  ├─ contact.astro      # 문의(web3forms)
│  ├─ blog/index.astro   # 블로그 목록  → /blog.html
│  ├─ blog/[...slug].astro # 글 상세     → /blog/<slug>.html
│  └─ rss.xml.js         # RSS 피드      → /rss.xml
├─ content/blog/*.md     # 글 원본(컬렉션, 스키마: content.config.ts)
└─ styles/               # global.css(랜딩)·contact.css·blog.css
public/                  # 경로 고정 자산(이미지·favicon·og-image·robots·데모 iframe)
```

**핵심**: `<head>`와 추적 4종을 `BaseLayout`+`Analytics`+`Seo` **한 곳**에서 관리한다(페이지마다 복붙하지 않는다).

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
빌드하면 `/blog/<파일명>.html`로 생성되고, 목록·sitemap·RSS에 자동 반영된다.

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
