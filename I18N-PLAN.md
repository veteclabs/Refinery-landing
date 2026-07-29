# 다국어(i18n) 플랜 — Refinery Landing

목표: 한국어(기본) · 영어 · 일본어 3개 언어 지원. 글로벌 서비스 대응.

## 확정 사항
- **URL**: 한국어 무접두사 유지(`/`, `/contact.html`), 영어 `/en/`, 일본어 `/ja/`.
  - 기존 한국어 URL·SEO 보존. Astro `i18n.routing.prefixDefaultLocale: false`.
- **번역 조달**: 내가 ko→en/ja 초안 작성 → Vercel Preview에서 검토 → **원어민/전문 검수 후 게시**.
  - 게시 전 초안 상태에서는 프로덕션 머지 금지(검수 완료분만 머지).
- 히어로 데모 iframe(한국어 앱)은 우선 한국어 유지, 이후 별도 로컬라이즈.

## 아키텍처
- `astro.config.mjs`:
  ```js
  i18n: {
    locales: ['ko', 'en', 'ja'],
    defaultLocale: 'ko',
    routing: { prefixDefaultLocale: false },
  }
  ```
- **문자열 외부화(핵심 작업)**: 랜딩/문의/컴포넌트의 모든 카피를 사전으로 분리.
  ```
  src/i18n/
  ├─ ui.ts            # t(locale, key) 헬퍼 + 타입
  ├─ ko.ts            # 한국어(원문)
  ├─ en.ts            # 영어(초안→검수)
  └─ ja.ts            # 일본어(초안→검수)
  ```
  - 페이지는 `const t = useTranslations(locale)` 후 `t('hero.title')` 형태로 참조.
- **로케일별 페이지**:
  - `src/pages/index.astro`(ko) · `src/pages/en/index.astro` · `src/pages/ja/index.astro`
    → 동일 컴포넌트를 로케일만 바꿔 렌더(카피는 사전에서). 마크업 중복 최소화를 위해
      본문을 `src/components/landing/*.astro` 섹션 컴포넌트로 분리하고 3개 페이지가 공유.
  - 문의: `contact.astro` / `en/contact` / `ja/contact`.
- **언어 스위처**: 헤더/푸터에 KO·EN·JA 토글. 현재 경로의 대응 로케일로 이동.
- **hreflang**: `Seo.astro`에 `<link rel="alternate" hreflang>` (ko/en/ja + x-default) 자동 출력.
- **sitemap**: `@astrojs/sitemap` i18n 옵션으로 로케일 대체 링크 포함.
- **블로그**: 글 frontmatter에 `lang` 필드 또는 로케일별 컬렉션. 목록/RSS를 로케일별로.

## 단계별 실행
| 페이즈 | 내용 | 산출 |
|---|---|---|
| **I0 인프라** | i18n config, `src/i18n` 사전 구조, `useTranslations` 헬퍼, 언어 스위처, hreflang, sitemap i18n | 스위처·라우팅 동작(빈 번역 폴백) |
| **I1 섹션 컴포넌트화** | 랜딩 본문을 섹션 컴포넌트로 분리(ko 원문을 키로 외부화) | ko가 사전 기반으로 렌더(무회귀) |
| **I2 영어** | en.ts 초안 + `/en/*` 페이지 | `/en/` 랜딩·문의 |
| **I3 일본어** | ja.ts 초안 + `/ja/*` 페이지 | `/ja/` 랜딩·문의 |
| **I4 블로그 i18n** | 로케일별 글/목록/RSS | `/en/blog` `/ja/blog` |
| **I5 검수·게시** | 원어민 검수 반영 → 머지 | 프로덕션 다국어 |

## 리스크·주의
- **문자열 외부화 규모**: 랜딩 카피가 매우 많음 → I1이 가장 큰 작업. 회귀 방지를 위해
  ko를 먼저 사전 기반으로 옮겨 **한국어 무변경**을 확인한 뒤 en/ja 추가.
- **번역 품질**: 초안은 기계적일 수 있음. 특히 **일본어는 원어민 검수 필수**(경어·업계용어).
  검수 완료 전에는 `noindex` 또는 미머지로 공개 노출 방지.
- **레이아웃**: 영어/일본어는 텍스트 길이가 달라 줄바꿈(`<br class="mobile-br">` 등) 재조정 필요.
- **URL 보존**: ko 라우트(`/`, `/contact.html`)는 절대 변경하지 않음.
- **히어로 iframe**: 데모 앱 로컬라이즈는 별도 범위(우선 ko 유지).

## 다음 액션
1. I0 인프라 착수(이 브랜치 `feat/i18n`): config·사전 구조·스위처·hreflang.
2. I1에서 ko 외부화(무회귀 확인) → I2 영어 초안 → Preview 검토.
3. 각 언어는 검수 완료 후 개별 머지(초안 상태 프로덕션 노출 금지).
