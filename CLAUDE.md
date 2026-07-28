# Refinery Landing — 개발 규칙

Refinery 제품 소개용 **정적 랜딩 사이트**. 빌드 과정 없이 HTML/CSS/JS 원본을 Vercel이 그대로 서빙한다.

## 프로젝트 성격
- **무빌드(No build step)**: `package.json`·번들러 없음. `index.html`, `contact.html`이 전부.
- Vercel이 **리포지토리 루트를 정적으로 서빙**한다 → 루트에 둔 파일은 그대로 공개·배포된다.
- 스타일과 스크립트는 각 HTML 파일에 인라인. 외부 CDN(폰트/아이콘)은 `media="print" + onload` 로 비차단 로딩.

## 이미지 규칙 (가장 중요)
- **모든 래스터 이미지는 WebP로 커밋한다.** PNG/JPG 원본을 그대로 배포하지 않는다.
- 변환: `cwebp -q 82 -resize <표시최대폭> 0 원본.png -o 결과.webp`
  - 배경/장식용은 `q 80`, 스크린샷·제품컷은 `q 82` 기준.
  - **표시되는 실제 크기로 리사이즈**한다. 원본 해상도를 그대로 넣지 않는다 (예: CTA 배경은 1920폭이면 충분).
- 접힘선(아래쪽) 이미지는 `loading="lazy" decoding="async"` 를 반드시 지정.
  - 단, 히어로/최상단(above-the-fold) 이미지에는 lazy를 **쓰지 않는다**(LCP 저하).
- 레이아웃 이동(CLS) 방지를 위해 가능한 한 `width`/`height` 속성을 지정.
- 변환 후 원본 PNG는 커밋에 남기지 않는다(교체 삭제). JS(`switchDash` 등)에서 문자열로 참조하는 경로까지 함께 갱신할 것.
- **예외**: `og-image.png` 는 소셜 공유 호환성을 위해 PNG 유지.

## 에셋 위생
- 사이트에서 참조되지 않는 이미지·폰트는 커밋하지 않는다. 시안/미사용 파일은 별도 보관.
- `@font-face` 등 사용하지 않는 리소스 선언(죽은 코드)은 남기지 않는다.
- `.DS_Store`, `.vercel` 등은 `.gitignore` 로 제외(추적 금지).
- 디자인 원본(`Refinery UI/`)이나 standalone 데모 HTML을 배포에서 빼려면 `.vercelignore` 를 사용.

## 분석/추적 (Analytics)
현재 4종이 `<head>` 에 설치되어 있다. 새 페이지를 만들면 동일하게 넣는다.
- Google Analytics (`gtag`, ID `G-26MDX5Q369`)
- Mixpanel (`mixpanel.init`)
- Vercel Web Analytics — `/_vercel/insights/script.js`
- Vercel Speed Insights — `/_vercel/speed-insights/script.js`

Vercel 두 종은 **대시보드에서 각각 Enable** 해야 데이터가 수집되며, 로컬(localhost)에서는 스크립트가 404여도 정상이다.

## SEO / 메타
- 새 페이지에는 `title`, `meta description`, `canonical`, OG/Twitter 태그, `theme-color` 를 갖춘다.
- 공개용 색인 페이지는 `robots: index`, 문의/유틸 페이지는 `noindex, follow`.
- 사이트 구조가 바뀌면 `sitemap.xml` 갱신.
- 정식 도메인 연결 시 `canonical`/OG/`sitemap`/`robots` 의 `*.vercel.app` URL을 실제 도메인으로 교체.

## 폼
- 문의 폼은 web3forms(`access_key` 는 클라이언트 공개가 정상). 스팸 방어용 honeypot(`botcheck`) 필드를 유지/추가한다.

## Git / 배포 흐름
- `main` 푸시 = **프로덕션 배포**(자동). 실서비스에 바로 반영되므로 푸시 전 로컬 확인 필수.
- 큰 변경은 별도 브랜치로 올려 **Preview 배포 URL**에서 검증 후 `main` 에 머지 권장.
- 커밋 메시지는 한국어 요약 + 변경 근거. 이미지 변환은 before/after 용량을 남긴다.

## 변경 후 로컬 확인
```bash
python3 -m http.server 8899   # http://localhost:8899/index.html
```
- 콘솔 에러(404) 0, 깨진 이미지 0 을 확인한다.
- 참조된 로컬 에셋이 모두 존재하는지 확인 후 커밋한다.
