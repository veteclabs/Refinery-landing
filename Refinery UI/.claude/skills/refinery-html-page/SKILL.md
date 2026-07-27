---
name: refinery-html-page
description: |
  Refinery 디자인시스템 기준 신규 HTML 페이지 시안을 작성할 때 사용합니다.
  Refinery_DesignSystem_Guide.md 의 토큰·컴포넌트·Do/Don't 를 적용하고,
  UI_Refinery_DesignSystem.html 의 톤앤매너를 1:1 로 유지하며 단일 HTML 페이지를 생성합니다.
  트리거 키워드 — "Refinery 새 페이지", "신규 시안", "monitoring 같은 페이지", "디자인시스템 따라"
---

# Refinery HTML Page Generator

Refinery UI 디자인 시스템을 기준으로 신규 HTML 페이지를 생성합니다. 이 Skill 은 가이드 문서(`Refinery_DesignSystem_Guide.md`) 와 기준 파일(`UI_Refinery_DesignSystem.html`) 의 토큰·컴포넌트를 1:1 로 적용하기 위한 **결정론적 워크플로우** 를 정의합니다.

---

## 0. 사전 점검

작업 시작 전 다음 파일이 워크스페이스 루트에 존재하는지 확인합니다.

- `refinery.css` — **CSS 단일 진실 공급원** (토큰·컴포넌트·App Shell·라우팅). 모든 페이지가 이 파일을 link 한다
- `Refinery_DesignSystem_Guide.md` — 토큰·컴포넌트·Do/Don't 규칙 문서
- `UI_Refinery_DesignSystem.html` — 마스터 HTML (디자인 시스템 레퍼런스 페이지 · 마크업 예시)
- `.claude/skills/refinery-html-page/template.html` — 신규 페이지 코드 골격
- `.claude/skills/refinery-html-page/checklist.md` — 최종 검수 체크리스트
- `refinery-verify.sh` — 단일 소스 계약 무결성 검증기

없는 파일이 있으면 작업을 멈추고 사용자에게 보고합니다.

---

## 1. 사용자 요구 수집

다음 정보를 사용자에게 명시적으로 묻거나, 사용자의 메시지에서 정확히 추출합니다.

| 항목 | 예시 | 필수 여부 |
|---|---|---|
| 페이지 이름 (`<h1>` 텍스트) | "User Analytics" | 필수 |
| 파일명 | `UI_Refinery_UserAnalytics.html` | 필수 (페이지 이름에서 자동 도출 가능) |
| 주요 컨텐츠 섹션 | "KPI 4개 + 메인 차트 + 사이드 패널 + 테이블" | 필수 |
| Span Pattern | `4+4+4+4` / `11+5` / `7+5+4` / `8+8` / `6+6+4` / `16` 중 조합 | 필수 |
| Page Header 액션 | "Filter, Add" / "Export, +New" / 없음 | 선택 |
| 페이지 의도 | dashboard / list / detail / form / settings | 선택 |

요구가 불명확할 때는 그대로 추측하지 않고 1~2개 짧은 질문으로 보강합니다.

---

## 2. 가이드 펼치기

작업 직전 다음 섹션을 다시 한 번 펼쳐 컨텍스트에 올립니다.

- `Refinery_DesignSystem_Guide.md`
  - §2.2 Color · Surface 토큰
  - §2.3 Typography
  - §2.5 Grid (특히 Span Patterns)
  - §4.1 Button, §4.2 Widget, §4.3 Table 등 **요청 페이지에 등장하는 컴포넌트만**
  - §6 신규 페이지 워크플로우
  - §7 페이지 코드 템플릿
  - §8 최종 검수 체크리스트

가이드에 정의되지 않은 컴포넌트·토큰·간격이 필요해지면 **임의로 만들지 않고** 사용자에게 보고하여 디자인 시스템 확장 여부를 결정합니다.

---

## 3. 페이지 작성

### 3.1 시작점

`.claude/skills/refinery-html-page/template.html` 을 복사해 새 파일을 만듭니다. 파일은 워크스페이스 루트(`Refinery UI/`) 에 `UI_Refinery_[PageName].html` 형태로, **`refinery.css` 와 같은 폴더**에 저장합니다 (상대경로 link 가 동작해야 함).

> **단일 소스 · link–검증 계약 (link-and-verify).** 모든 토큰·컴포넌트 스타일은 **`refinery.css` 한 파일**에만 정의돼 있습니다. 신규 페이지는 `<head>` 에서 `<link rel="stylesheet" href="refinery.css">` **한 줄로 연결**하며, **CSS 를 페이지에 임베드(`<style>` 블록)하거나 토큰 hex/px 리터럴을 다시 박지 않습니다.** CSS 가 한 곳에만 존재하므로 페이지 간 드리프트는 구조적으로 불가능합니다.
>
> 색·폰트·사이즈·간격·컴포넌트를 바꿔야 하면 **`refinery.css` 에서만** 수정합니다 — 그 한 번으로 전 페이지에 동일 반영됩니다. 페이지 HTML 에는 절대 디자인 토큰/컴포넌트 CSS 를 두지 않습니다. 작업 후 §4 의 `refinery-verify.sh` 로 계약 무결성을 증명한 뒤 인도합니다.
>
> `refinery.css` 에 없는 컴포넌트가 필요하면 페이지에서 새로 만들지 말고 §2 원칙대로 사용자에게 보고해 `refinery.css` 자체를 확장할지 결정합니다.

### 3.2 구조 채우기 순서

1. `<head>` 의 `<title>` 과 favicon — 마스터 파일의 favicon 블록(`fav_refienry-symbol.svg` link)을 그대로 사용.
2. `<head>` 에 `<link rel="stylesheet" href="refinery.css">` 한 줄. **인라인 `<style>` 블록을 만들지 않음. 토큰·컴포넌트 CSS 를 페이지에 복사하지 않음.**
3. App Shell — Rail / Side / Topbar 를 마스터 파일과 동일하게 배치. 신규 페이지의 Side Nav 항목 하나를 추가하고 active 처리.
4. `.page-head` — 페이지 이름, 메타, 액션 배치.
5. `.grid` — 요청된 Span Pattern 으로 행을 구성. 한 행의 span 합 = 16.
6. 각 셀에 `.rfn-widget`(1depth) / `.kpi` / `.rfn-table` 등 마스터의 컴포넌트 마크업을 가져와 채움. 필요 시 2depth `.rfn-box` 중첩.
7. 인터랙티브 요소가 필요하면 `.rfn-popover`, `.rfn-modal`, `.rfn-tabs`, `.rfn-toast`, `.rfn-tooltip` 의 마크업도 마스터에서 그대로 복사.
8. 데이터는 placeholder 로 채움 (`1,234`, `Item Name` 등). 사용자가 실제 데이터를 지정한 경우에만 반영.

### 3.3 절대 하지 않을 것

- 페이지 HTML 안에 `<style>` 블록을 만들거나 `refinery.css` 의 토큰/컴포넌트를 복사해 넣지 않습니다.
- `refinery.css` 의 토큰 정의를 페이지 작업 중에 임의 변경하지 않습니다 (변경이 필요하면 사용자에게 보고).
- 새 컴포넌트 클래스(`.rfn-*`) 를 페이지에서 만들지 않습니다 — `refinery.css` 에 있는 것만 재사용합니다.
- 인라인 `style="…"` 에 토큰 외 hex/px 리터럴을 박지 않습니다 (색은 `var(--…)`, 차트 카테고리는 `var(--dv-1..10)`; SVG `fill/stroke` 만 §2.2 인가된 예외).
- 페이지별 추가 breakpoint / `body.dark` 분기 CSS 를 만들지 않습니다.

---

## 4. 자체 검수

`.claude/skills/refinery-html-page/checklist.md` 의 모든 체크 항목을 점검합니다. 통과하지 못한 항목이 있으면 코드를 수정해 통과시키고, 그래도 불가능한 케이스라면 사용자에게 명시적으로 보고합니다.

이어서 **무결성 검증기를 반드시 실행**합니다. 이 스크립트가 단일 소스 계약(모든 페이지가 `refinery.css` 만 link, CSS 재임베드·토큰 hex 재도입·phantom `.rfn-*` 없음)을 강제하는 게이트입니다.

```
bash refinery-verify.sh
```

- exit 0(✅ 통과) 이 아니면 페이지를 인도하지 않습니다. NG 항목을 고친 뒤 다시 실행합니다 — 페이지에 `<style>` 블록을 넣었거나 토큰을 복사했으면 제거하고 `<link href="refinery.css">` 로 되돌립니다.
- 새 컴포넌트가 필요해 `refinery.css` 에 없는 `.rfn-*` 가 나오면, 페이지에서 임의 정의하지 말고 §2 원칙대로 사용자에게 보고합니다.

검수 후 다음 두 모드를 모두 시뮬레이션해 톤이 의도대로 유지되는지 확인합니다.

- `<body class="">` (라이트 모드 기본)
- `<body class="dark">` (다크 모드)

---

## 5. 결과 보고

작업이 끝나면 다음 형식으로 사용자에게 보고합니다.

1. 생성한 파일의 `computer://` 링크
2. 적용한 Span Pattern, 사용한 컴포넌트 목록
3. 체크리스트 통과 결과 (모두 통과 / 통과 불가 항목 + 사유)
4. `refinery-verify.sh` 결과 (exit 0 통과 여부)

긴 마크다운 보고를 만들지 않고, 핵심만 짧게 정리합니다.

---

## 6. 사용 예시

**사용자 입력**
> "User Analytics 페이지 새로 만들어줘. KPI 4개 + 메인 차트 + 사이드 패널 + 테이블 구성으로."

**Skill 흐름**
1. 페이지 이름 = "User Analytics", 파일명 = `UI_Refinery_UserAnalytics.html` 로 도출
2. Span Pattern 결정 — Row 1: `4+4+4+4` (KPI), Row 2: `11+5` (Main + Side), Row 3: `16` (Table)
3. `<head>` 에 favicon link + `<link rel="stylesheet" href="refinery.css">`, App Shell 마크업 배치
4. 위 Span Pattern 으로 그리드 구성, 각 셀에 `.kpi` / `.rfn-widget` 마크업 채움
5. 체크리스트 + `refinery-verify.sh` 검수 후 결과 보고

---

## 7. 변경 이력

신규 페이지가 만들어질 때마다 사용한 컴포넌트를 짧게 기록합니다. CSS 는 `refinery.css` 단일 소스를 link 하므로 출처 추적/재sync 가 필요 없습니다 — 이 로그는 어떤 컴포넌트가 쓰였는지 파악용입니다. 신규 페이지 HTML 의 `<head>` 안에 주석으로 남깁니다.

```html
<!-- Generated by skill: refinery-html-page
     Styles: refinery.css (single source of truth · linked)
     Components used: rfn-widget, kpi, rfn-table
     Generated: YYYY-MM-DD -->
```
