# Refinery UI — 개발자 작업 지침

이 폴더는 Refinery 디자인시스템과 페이지들입니다. 디자인 톤앤매너를 모든 페이지에 통일되게 유지하는 것이 목표이며, 그 방법은 아래 한 가지 원칙으로 정리됩니다.

---

## 핵심 원칙 (이것만 지키면 전부 통일됨)

- 디자인시스템 CSS 는 **`refinery.css` 한 파일에만** 있습니다.
- 모든 페이지는 `<head>` 에 **`<link rel="stylesheet" href="refinery.css">` 한 줄**만 둡니다.
- 페이지 HTML 에 `<style>` 블록 · 색 hex · px 를 직접 쓰지 않습니다. 색·폰트·간격은 `refinery.css` 의 토큰(`var(--…)`)으로만 씁니다.
- 색/폰트/간격/컴포넌트를 바꿔야 하면 페이지가 아니라 **`refinery.css` 만** 수정합니다 → 전 페이지에 한 번에 반영됩니다.
- HTML 과 `refinery.css` 는 **같은 폴더**에 둡니다.

---

## 작업 프로세스

**기존 페이지 수정**
1. 디자인 토큰/컴포넌트가 필요하면 `refinery.css` 에서만 손댑니다.
2. 페이지 마크업은 `.rfn-*` 컴포넌트와 토큰만 사용합니다.

**새 페이지 추가**
1. 기존 페이지(예: `UI_Refinery_Dashboard.html`)의 App Shell 구조를 골격으로 복사합니다.
2. `<head>` 에 `refinery.css` link 한 줄만 넣고, 본문은 `.rfn-*` 컴포넌트로 구성합니다.
3. 파일은 `refinery.css` 와 같은 폴더에 저장합니다.

**끝내기 전 (항상)**
1. 터미널에서 `bash refinery-verify.sh` 실행 → **반드시 통과(exit 0)**.
2. 라이트(`<body>`)·다크(`<body class="dark">`) 양쪽에서 화면 확인.

---

## 어디를 보면 되나

| 파일 | 용도 |
|---|---|
| `refinery.css` | 디자인시스템 본체 (토큰·컴포넌트). **수정은 여기서만** |
| `Refinery_DesignSystem_Guide.md` | 규칙·토큰표·컴포넌트 사용법 (작업 전 참고) |
| `refinery-verify.sh` | 규칙 위반 자동 검사 (작업 후 실행 게이트) |
| `UI_Refinery_*.html` | 실제 페이지 예시 (마크업 참고용) |

> 한 줄 요약 — **refinery.css 만 수정한다 · 페이지는 link 만 한다 · 끝나면 `refinery-verify.sh` 가 통과한다.**
