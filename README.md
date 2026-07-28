# Refinery Landing

Refinery 제품 소개용 **정적 랜딩 사이트**. 빌드 과정 없이 HTML/CSS/JS 원본을 Vercel이 그대로 서빙한다.

- 프로덕션: https://refinery-ai-platform.vercel.app/
- 저장소: https://github.com/veteclabs/refinery-landing

> 개발/협업 상세 규칙은 [`CLAUDE.md`](CLAUDE.md)에 정리되어 있다. 이 문서는 온보딩용 개요다.

---

## 아키텍처

**무빌드(No build step) 정적 사이트.** 번들러·프레임워크·`package.json` 없이, 리포지토리 루트의 파일을 Vercel이 정적으로 서빙한다.

```
refinery-landing/
├── index.html          # 메인 랜딩 (모든 CSS/JS 인라인)
├── contact.html        # 문의/데모 신청 폼 페이지
├── Solutions/          # 솔루션 탭 스크린샷 (WebP)
├── *.svg               # 로고 · 아이콘 · 다이어그램
├── *.webp              # 래스터 이미지 (배경/스크린샷)
├── og-image.png        # 소셜 공유용 (호환성 위해 PNG 유지)
├── robots.txt          # 크롤러 정책
├── sitemap.xml         # 사이트맵
├── .vercelignore       # 배포 제외 (디자인 원본·데모 HTML)
├── .gitignore          # .DS_Store, .vercel 등 추적 제외
├── CLAUDE.md           # 개발·협업 규칙 (상세)
└── README.md           # 이 문서
```

### 설계 원칙
- **인라인 우선**: 스타일·스크립트는 각 HTML에 인라인. 별도 빌드/번들 단계가 없다.
- **비차단 외부 리소스**: 폰트/아이콘 CDN(Pretendard, Phosphor Icons, Google Fonts)은
  `media="print" + onload` 스위치로 렌더 비차단(non-blocking) 로딩한다. CDN 지연이
  본문 인라인 스크립트(햄버거 메뉴 등) 실행을 막지 않도록 하기 위함.
- **루트 = 공개면**: 루트에 둔 파일은 그대로 공개·배포된다. 미배포 파일은 `.vercelignore`로 제외.

---

## 이미지 최적화

성능(LCP/전송량)의 핵심. **모든 래스터 이미지는 WebP로 커밋**한다. PNG/JPG 원본을 그대로 배포하지 않는다.

### 변환 워크플로 (`cwebp`)
```bash
# 배경/장식용: q 80  ·  스크린샷/제품컷: q 82
# 표시되는 실제 최대 폭으로 리사이즈 (원본 해상도 그대로 넣지 않는다)
cwebp -q 82 -resize <표시최대폭> 0 원본.png -o 결과.webp

# 예) CTA 배경(6127px 원본) → 1920폭이면 충분
cwebp -q 80 -resize 1920 0 img_login-bg.png -o img_login-bg.webp
```

### 규칙
- **리사이즈 필수**: 표시 크기에 맞춘다. 원본 해상도를 그대로 사용하지 않는다.
- **지연 로딩**: 접힘선 아래(below-the-fold) 이미지에 `loading="lazy" decoding="async"` 지정.
  단, 히어로/최상단 이미지에는 lazy를 **쓰지 않는다**(LCP 저하).
- **CLS 방지**: 가능한 한 `width`/`height` 속성을 지정한다.
- **원본 제거**: 변환 후 원본 PNG는 커밋에 남기지 않는다(교체 삭제).
  JS(`switchDash` 등)에서 문자열로 참조하는 경로까지 함께 갱신할 것.
- **예외**: `og-image.png`는 소셜 공유 호환성을 위해 PNG 유지.

### 적용 결과 (참고 실측)
| 대상 | 이전 | 이후 |
|---|---|---|
| `img_login-bg` (CTA 배경) | 18MB PNG | **64KB WebP** (~99.6%↓) |
| Solutions 탭 이미지 6종 | 각 400~680KB PNG | 각 64~80KB WebP |
| 미사용 에셋 48종(히어로 시안·폰트 등) | 커밋됨 | **삭제** |

---

## 분석 / 추적 (Analytics)

`<head>`에 4종이 설치되어 있다. **새 페이지를 만들면 동일하게 넣는다.**

| 도구 | 설치 방식 | 비고 |
|---|---|---|
| Google Analytics | `gtag` (ID `G-26MDX5Q369`) | |
| Mixpanel | `mixpanel.init` | 세션 리코딩·히트맵 포함 |
| Vercel Web Analytics | `/_vercel/insights/script.js` | 대시보드에서 Enable 필요 |
| Vercel Speed Insights | `/_vercel/speed-insights/script.js` | 대시보드에서 Enable 필요 |

> Vercel 두 종은 대시보드(프로젝트 → Analytics / Speed Insights 탭)에서 **각각 Enable** 해야
> 수집되며, 배포 도메인에서만 동작한다. 로컬(localhost)에서 스크립트가 404여도 정상이다.

---

## SEO / 메타

새 페이지에는 `title`, `meta description`, `canonical`, OG/Twitter 태그, `theme-color`를 갖춘다.
- 공개용 색인 페이지: `robots: index` · 문의/유틸 페이지: `noindex, follow`.
- 사이트 구조가 바뀌면 `sitemap.xml` 갱신.
- 정식 도메인 연결 시 `canonical`/OG/`sitemap`/`robots`의 `*.vercel.app` URL을 실제 도메인으로 교체.

---

## 로컬 실행

무빌드라 정적 서버만 있으면 된다.
```bash
python3 -m http.server 8899   # http://localhost:8899/index.html
```
커밋 전 확인:
- 콘솔 에러(404) **0**, 깨진 이미지 **0**.
- 참조된 로컬 에셋이 모두 존재하는지 확인.

---

## 협업 / 배포 흐름

- **`main` 직접 커밋·푸시 금지.** 모든 변경은 작업 브랜치에서 진행한다.
- 흐름: `작업 브랜치 → 커밋 → 푸시 → PR 생성 → 리뷰 → main 머지`.
- 브랜치 네이밍: `feat/`, `fix/`, `chore/`, `docs/` + 짧은 설명.
- **`main` 머지 = 프로덕션 릴리스**(자동 배포). 머지 전 반드시 **Preview 배포 URL**에서 검증한다.
  - `main` 외 브랜치/PR은 Vercel이 고유 Preview URL로 자동 배포한다(pre-production 검증용).
- 커밋·PR 메시지에 AI 공동작성/생성 표기를 넣지 않는다.

배포 검증 예:
```bash
BASE=https://refinery-ai-platform.vercel.app
curl -sI "$BASE/index.html" | head -1                    # 200 기대
curl -sI "$BASE/UI_Refinery_Dashboard.html" | head -1    # 404 기대 (배포 제외)
```
