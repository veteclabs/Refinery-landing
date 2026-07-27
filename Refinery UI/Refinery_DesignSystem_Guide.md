# Refinery Design System · 신규 페이지 작성 가이드

> 이 문서는 Refinery 디자인시스템을 기준으로 **신규 페이지·기능을 추가할 때 반드시 따라야 할 규칙·토큰·컴포넌트·패턴**을 정리한 단일 참조 문서입니다.
>
> 한 줄 원칙 — **모든 새 페이지는 이 문서의 토큰·컴포넌트만 사용해 구성합니다. 임의의 hex·폰트·사이즈·컴포넌트를 새로 만들지 않습니다.** Refinery 의 기존 톤앤매너를 벗어난 디자인을 임의로 생성하지 않습니다.

기준 파일 — `UI_Refinery_DesignSystem.html`. 이 문서의 모든 토큰·셀렉터·hex 값은 기준 파일에 정의된 실제 값과 1:1 로 일치합니다.

---

## 목차

- [0. 작업 원칙](#0-작업-원칙)
- [1. Quick Reference · Always / Never](#1-quick-reference--always--never)
- [2. Foundation](#2-foundation)
  - [2.1 Symbol](#21-symbol)
  - [2.2 Color · Surface 토큰](#22-color--surface-토큰)
  - [2.3 Typography](#23-typography)
  - [2.4 Icons](#24-icons)
  - [2.5 Grid](#25-grid)
  - [2.6 Spacing · Radius · Shadow](#26-spacing--radius--shadow)
- [3. Layout · App Shell](#3-layout--app-shell)
- [4. Components](#4-components)
  - [4.1 Button](#41-button)
  - [4.2 Widget](#42-widget)
  - [4.3 Table](#43-table)
  - [4.4 Popover](#44-popover)
  - [4.5 Modal](#45-modal)
  - [4.6 Search / Input](#46-search--input)
  - [4.7 Tab](#47-tab)
  - [4.8 Toast](#48-toast)
  - [4.9 Tooltip](#49-tooltip)
  - [4.10 Carousel](#410-carousel)
- [5. Light · Dark Mode 처리](#5-light--dark-mode-처리)
- [6. 신규 페이지 워크플로우](#6-신규-페이지-워크플로우)
- [7. 페이지 코드 템플릿](#7-페이지-코드-템플릿)
- [8. 최종 검수 체크리스트](#8-최종-검수-체크리스트)
- [9. Do / Don't 종합 사전](#9-do--dont-종합-사전)

---

## 0. 작업 원칙

1. **토큰 우선** — 색·폰트·사이즈·간격·반경은 모두 정의된 토큰(CSS 변수 또는 정해진 스케일 값)만 사용합니다. 새 값은 만들지 않습니다.
2. **재사용 우선** — Refinery 가 이미 정의한 컴포넌트(`.rfn-btn`, `.rfn-widget`, `.rfn-table`, `.rfn-field`, `.rfn-popover`, `.rfn-modal`, `.rfn-tabs`, `.rfn-toast`, `.rfn-tooltip`, `.rfn-carousel`, `.rfn-inspector` + `.rfn-badge`/`.chip`/`.rfn-seg`/`.rfn-toggle`/`.rfn-tree`/`.rfn-erd` 등 — 전체는 부록 「컴포넌트 셀렉터 한눈에 보기」)를 그대로 가져다 사용합니다. 동일 의미의 새 컴포넌트를 만들지 않습니다.
3. **위계 보존** — Rail → Side → Topbar → Page → Widget 1depth → Widget 2depth 의 깊이 위계와 표면(`--surface-*`) 위계를 그대로 따릅니다.
4. **모드 동등** — 라이트·다크 모드 모두에서 동일한 의미 인덱스의 톤이 유지되도록 합니다. 한 모드에서만 사용 가능한 색은 사용하지 않습니다.
5. **접근성** — 아이콘 단독(icon-only) 사용 시 `title` 또는 `aria-label` 을 항상 제공합니다. Focus 링은 절대 제거하지 않습니다.
6. **변경 금지** — 토큰 값 변경이 필요할 때는 페이지가 아닌 디자인시스템 자체를 먼저 확장합니다.

---

## 1. Quick Reference · Always / Never

| 항목 | 항상 (Always) | 절대 안 됨 (Never) |
|---|---|---|
| **색** | `var(--brand) / var(--ink-*) / var(--surface-*) / var(--good|warn|bad)` | hex 리터럴을 컴포넌트에 직접 박지 않음. Brand 색을 본문/장식에 쓰지 않음. |
| **표면** | `var(--surface-rail|side|topbar|card|page)` | Rail/Side/Topbar/Card 의 hex 를 직접 사용하지 않음. |
| **폰트** | 영문 Roboto / 국문 Pretendard / 코드 JetBrains Mono | 입력값·본문에 Mono 폰트 사용 금지. 임의 웹폰트 추가 금지. |
| **아이콘** | Phosphor Regular `<i class="ph ph-name"></i>` | Light/Bold/Duotone weight 사용 금지. `ph-fill` 은 즐겨찾기 별·체크 활성 등 예외만. |
| **그리드** | 한 행의 span 합 = 16 | 임의 column 수 / 임의 gutter 사용 금지. |
| **버튼** | Primary = Refined Blue 만. Secondary/Tertiary/Danger 변형 별도. | Primary 외 변형에 Refined Blue 사용 금지. Mono 라벨 금지. |
| **위젯** | 1depth + 2depth 두 단계만 | 3depth 이상 중첩 금지. 2depth 에 shadow 추가 금지. |
| **모달** | 4단 사이즈(360 / 480 / 640 / 800), 4가지 의도 | 임의 px 너비 금지. 모달 안에 모달 중첩 금지. |
| **Tab** | 1depth(40h, brand active) / 2depth(32h, ink active) | 3depth Tab 안의 Tab 금지. |
| **Toast** | 최대 1개 액션, 최대 4개 동시 노출 | 액션 2개 이상 금지. 5개 이상 스택 금지. |
| **Tooltip** | hover/focus + 일정 delay | 클릭/터치 인터랙션 금지. 액션 텍스트 금지. |

---

## 2. Foundation

### 2.1 Symbol

Refinery 의 핵심 브랜드 마크는 32×32 viewBox 의 단일 SVG 입니다. 두 개의 `path` 가 좌상단·우하단에서 마주보며 미러 구조를 이룹니다.

**규칙**
- 어디서 호출하든 동일한 SVG 원본을 그대로 사용합니다.
- 색상은 `currentColor` 로 상위 텍스트 색을 상속받습니다 (ink-900 → light 에서는 `#16202C`, dark 에서는 `#EDEEF0`).
- 사이즈 토큰은 5단 — **XS 16 / SM 28 / MD 48 / LG 64 / XL 120+**.
- 심볼 주위에 항상 **심볼 너비의 1/4 이상** 의 클리어 스페이스를 확보합니다.

**사용처 표준**
| 컨텍스트 | 사이즈 | 색 |
|---|---|---|
| Favicon | 16 | 단일 정적 SVG `fav_refienry-symbol.svg` (dark `#131519` 배경 + 밝은 심볼 · 라이트/다크/시크릿 무관 동일) |
| Rail 로고 | 28 | ink-900 |
| 사이드 헤더 | 28 | ink-900 |
| 온보딩·빈 상태 | 48~64 | ink-700 |
| 스플래시 | 120+ | ink-900 |

### 2.2 Color · Surface 토큰

#### Brand · Refined Blue

| 토큰 | 값 (light = dark) | 용도 |
|---|---|---|
| `--brand` | `#76A6D7` | Primary 액션, KPI 강조 라인, active rail/sub-nav indicator |
| `--brand-600` | `#5A8FC5` | Primary hover |
| `--brand-700` | `#3F76AE` | Primary active, link |
| `--brand-50` | `#EEF4FB` (light) / `rgba(118,166,215,.13)` (dark) | Subtle hover, 칩 배경 |
| `--brand-100` | `#DCE8F5` (light) / `rgba(118,166,215,.20)` (dark) | Subtle border, badge border |

#### Neutral · Ink Scale

라이트와 다크는 **인덱스 의미를 동일하게 유지**(900 = 가장 강한 텍스트, 50 = 가장 옅은 배경)하되 값은 모드별로 반전됩니다.

| 토큰 | Light | Dark | 의미 |
|---|---|---|---|
| `--ink-900` | `#16202C` | `#EDEEF0` | 주요 텍스트 |
| `--ink-800` | `#22303F` | `#C0C4CA` | 본문 텍스트 |
| `--ink-700` | `#3A4856` | `#959CA5` | 3차 텍스트 |
| `--ink-600` | `#5A6776` | `#878E97` | 뮤트 텍스트 |
| `--ink-500` | `#7E8A98` | `#757C85` | 보조/장식 텍스트 |
| `--ink-400` | `#A4ADB8` | `#424850` | 비활성/플레이스홀더 |
| `--ink-300` | `#C8CED5` | `#32373F` | 보더 |
| `--ink-200` | `#E3E7EC` | `#272B32` | 디바이더 |
| `--ink-100` | `#EFF2F5` | `#1E2228` | 서피스 내 강조 배경 |
| `--ink-50` | `#F6F8FA` | `#17191E` | 가장 옅은 배경 |

#### Surface Hierarchy

앱 셸의 5계층 표면. **모든 페이지의 Rail/Side/Topbar/Card 배경은 이 토큰만 사용합니다.**

| 토큰 | Light | Dark | 적용 컴포넌트 |
|---|---|---|---|
| `--surface-rail` | `#FAFBFC` | `#131519` | `.rail` (Global Nav) |
| `--surface-side` | `#FFFFFF` | `#191D22` | `.side` (Sub Nav) |
| `--surface-topbar` | `#FAFBFC` | `#131519` | `.topbar` |
| `--surface-card` | `#FFFFFF` | `#191D22` | `.card`, `.kpi`, `.rfn-widget`, `.rfn-popover`, `.rfn-modal`, 1depth widget |
| `--surface-page` | `#F6F8FA` | `#111316` | `.page` 스크롤 영역 (`.page` 가 `var(--surface-page)` 로 배선됨) |

> **2026-05-18 — 다크 `--surface-rail` 조정.** `#0E1013` → `#131519` (다크 surface-rail ~ ink-50 의 중간값). 기존 값이 과도하게 어두워 Global Nav 가 답답하게 보이는 문제를 완화한 것입니다. (다크 "최심 표면" 역할은 이후 2026-05-18 Page backdrop 재정의로 `--surface-page` 가 가져감 — 아래 노트 참조.) 라이트 값(`#FAFBFC`)·다른 표면 토큰은 변경 없음.

> **2026-05-18 — 다크 표면 통일.** 라이트 모드는 `--surface-rail`==`--surface-topbar`(`#FAFBFC`), `--surface-side`==`--surface-card`(`#FFFFFF`) 로 이미 2단 통일돼 있으나 다크는 분리돼 헤더·위젯이 떠 보였습니다. 다크를 라이트와 동일한 위계로 정렬: **`--surface-topbar` `#1E2226`→`#131519`(= `--surface-rail`, Nav 프레임)**, **`--surface-card` `#1A1D23`→`#191D22`(= `--surface-side`, 콘텐츠 표면)**. 라이트 값·`--white`(`#1E2226`)·기타 토큰은 변경 없음. (이 시점 다크 위계: rail/topbar `#131519` → side/card `#191D22`. Page 최심 backdrop 화는 아래 노트.)

> **2026-05-18 — Page backdrop 정의 + 배선 정상화.** `--surface-page` 토큰이 정의만 돼 있고 어디서도 안 쓰이는 배선 갭이 있어, `.page` 가 `var(--ink-50)` 로 칠해지고 있었습니다. (1) `.page` 를 **`var(--surface-page)` 로 배선**(라이트값 동일 `#F6F8FA` → 라이트 회귀 없음), (2) 다크 `--surface-page` `#17191E` → **`#111316`** (rail/topbar `#131519` 보다 한 단계 더 깊은 최심 backdrop). `--ink-50`(다크 `#17191E`)·라이트값·기타 토큰 변경 없음. **최종 다크 위계 = page `#111316` (최심) → rail/topbar `#131519` → side/card `#191D22`** — 라이트(page `#F6F8FA` → rail/topbar `#FAFBFC` → side/card `#FFFFFF`)와 동일한 3단 깊이.

`--white`(`#FFFFFF` / `#1E2226`)는 카드/일반 서피스의 단일 white 토큰으로, Surface 시스템과 함께 사용합니다.
`--bg`(`#F2F4F7` / `#131619`)는 `.app` 의 body 배경입니다.

#### Fixed · Always-Dark (모드 불변)

계정 모노그램(이니셜 아바타) 처럼 **라이트·다크 양쪽에서 항상 동일하게 어두워야** 하는 표면을 위한 고정 토큰입니다. `:root` 에만 정의하고 다크 모드에서 재정의하지 않아 모드와 무관하게 값이 유지됩니다.

| 토큰 | 값 (light = dark) | 용도 |
|---|---|---|
| `--avatar-bg` | `#16202C` | 계정 이니셜 아바타 배경 (rail · 계정 팝오버) |
| `--avatar-fg` | `#FFFFFF` | 그 위의 이니셜 글자색 |

> 이는 §5.1 "모드 동등(의미 인덱스 반전)" 원칙의 **의도된 예외** 입니다. 사용자가 직접 이미지를 업로드하기 전까지의 기본 모노그램은 브랜드 일관성을 위해 두 모드에서 동일한 어두운 칩으로 고정합니다. 일반 표면·텍스트에는 이 패턴을 확장 적용하지 않습니다 (다른 모든 색은 반드시 모드 반전 토큰 사용).

#### Semantic · Status

라이트·다크 모드에서 **hex 값이 동일**한 의미 컬러. 상태/피드백 표현에만 사용합니다.

| 토큰 | Hex | 의미 |
|---|---|---|
| `--good` | `#3FB255` | 정상 · UP delta |
| `--good-50` | `rgba(63,178,85,.10)` | Good chip 배경 |
| `--warn` | `#F0A93A` | 주의 · 즐겨찾기 별 활성 |
| `--warn-50` | `rgba(240,169,58,.12)` | Warn chip 배경 |
| `--bad` | `#E5484D` | 경고 · DOWN delta · 알람 |
| `--bad-50` | `rgba(229,72,77,.10)` | Bad chip 배경, alarm row tint |

#### Data Viz · Multi-Color Palette

차트·시각화의 카테고리 색은 **고정 10-step 데이터 팔레트의 순서**를 그대로 따릅니다. 동일 차트 안에서 임의로 색을 섞지 않습니다. 각 패밀리의 50–900 전체 스케일(area-fill·hover·강조 단계 포함)은 디자인시스템 `Colors → Data Viz` 섹션이 단일 진실 공급원입니다.

#### Categorical Sequence 토큰 (`--dv-*`)

위 팔레트의 **base(500) 시퀀스를 CSS 변수 토큰으로 승격**했습니다. 차트 시리즈를 구분할 때 `var(--dv-1)` → `var(--dv-16)` 순서를 그대로 사용합니다. 값은 디자인시스템 Data Viz 섹션의 base 와 1:1 동일하며, base(500–900)는 라이트=다크 동일이라 모드 반전이 없습니다.

| 토큰 | Hex | 패밀리 | 비고 |
|---|---|---|---|
| `--dv-1` | `#3B7FD4` | Blue | |
| `--dv-2` | `#7884D8` | Indigo | |
| `--dv-3` | `#9579C2` | Purple | |
| `--dv-4` | `#CB6DA0` | Pink | |
| `--dv-5` | `#E5484D` | Red | = `--bad` |
| `--dv-6` | `#E29050` | Orange | |
| `--dv-7` | `#F0A93A` | Amber | = `--warn` |
| `--dv-8` | `#3FB255` | Green | = `--good` |
| `--dv-9` | `#4DB2A1` | Teal | |
| `--dv-10` | `#50A6C3` | Cyan | |
| `--dv-11` | `#A6B33F` | Lime | 확장 |
| `--dv-12` | `#6C7A8C` | Slate | 확장 |
| `--dv-13` | `#B656AE` | Fuchsia | 확장 |
| `--dv-14` | `#9E6B44` | Sienna | 확장 |
| `--dv-15` | `#7E68C9` | Violet | 확장 |
| `--dv-16` | `#4FA8DD` | Sky | 확장 |

> **2026-06-19 — 카테고리 팔레트 10→16 확장.** 시리즈/노드가 10개를 넘는 시각화(예: Dashboard 「에너지 흐름 분석」 Sankey · 16 노드)에서 색 재사용 없이 전부 고유 카테고리 색을 부여하기 위해 `--dv-11`~`--dv-16`(Lime·Slate·Fuchsia·Sienna·Violet·Sky) 6색을 추가했습니다. 기존 휠(Blue→Cyan)의 빈 hue 구간을 채우며 동일 채도·명도 규약을 따르고, base 라 라이트=다크 동일입니다. dv-1~10 의 값·순서는 변경 없음 — **시리즈가 10개 이하면 종전대로 dv-1→dv-10 만 사용**하고, 11개 이상일 때만 dv-11→dv-16 으로 이어갑니다.

> 단색(브랜드 단일 색조) 차트는 `--dv-*` 가 아니라 `--brand` / `--brand-700` 등 브랜드 스케일을 직접 사용합니다(카테고리 구분이 아니라 농도 표현이므로).

#### Inline SVG 의 hex — 인가된 예외 (sanctioned carve-out)

SVG **presentation attribute**(`fill="…"` · `stroke="…"` · `stop-color="…"`)는 CSS 변수(`var(--…)`)를 해석하지 못합니다. 따라서 인라인 SVG 차트(스파크라인·area·라인 등)는 `--dv-*` / 토큰 hex 를 **리터럴로 박을 수밖에 없습니다.** 이는 "hex 리터럴 금지" 원칙의 **명시적·인가된 예외**입니다.

| 컨텍스트 | 규칙 |
|---|---|
| `style="…"` 안의 색 (CSS 컨텍스트) | **반드시 토큰** — `var(--dv-*)` / `var(--brand*)` / `var(--good\|warn\|bad)` |
| SVG `fill` / `stroke` / `stop-color` (presentation attr) | 토큰 불가 → §2.2 팔레트/`--dv-*` 와 **동일한 hex 값**을 리터럴로 사용. 팔레트 밖 임의 hex 금지 |
| JS 템플릿 문자열의 폴백 색 (`${…'#999'…}`) | 가능하면 토큰화. 불가 시 §2.2 팔레트 내 값으로 한정 |

> SVG 차트를 토큰 기반으로 만들고 싶으면 `fill`/`stroke` attribute 대신 클래스 + `<style>`(또는 `style="fill:var(--dv-1)"`) 로 작성합니다 — 이 경우에만 `var()` 가 동작합니다.

#### Do · Don't

**Do**
- 모든 색상은 CSS 변수 토큰으로 호출합니다.
- 표면 배경은 반드시 `--surface-*` 토큰을 사용합니다.
- 의미 컬러(`good/warn/bad`)는 상태·정량적 신호에만 사용합니다.
- 차트 시리즈 카테고리 색은 `var(--dv-1)`→`var(--dv-16)` 순서로 사용합니다 (10개 이하면 dv-1~10).
- 본문 / 보조 / 비활성 텍스트의 위계는 `ink-800 / ink-600 / ink-400` 으로 유지합니다.

**Don't**
- 토큰에 없는 hex 를 새로 만들지 않습니다. (SVG `fill`/`stroke`/`stop-color` 는 §2.2 팔레트·`--dv-*` 와 동일 값에 한해 리터럴 허용 — 인가된 예외)
- 브랜드 컬러로 본문 텍스트를 칠하지 않습니다.
- 의미 컬러를 장식·구분·브랜딩 목적으로 사용하지 않습니다.
- 라이트 모드의 hex 를 그대로 다크 모드에 복사하지 않습니다.

### 2.3 Typography

#### Font Families

| 토큰 | Family | 용도 |
|---|---|---|
| `--font-en` | Roboto, Pretendard, -apple-system | 영문 본문·라벨·숫자, body 기본 |
| `--font-kr` | Pretendard, Pretendard Variable | 국문 본문·H1·Sub Nav 항목 |
| `--font-mono` | JetBrains Mono, Roboto Mono | 코드·토큰명·hex·시간/날짜·kbd·이메일 |

혼용 텍스트는 한 노드 안에서 **영문 폰트를 우선 선언**하여 라틴 글리프가 Roboto 로 렌더되도록 합니다 (`font-family: var(--font-en), var(--font-kr)`).

#### Type Scale (정식 토큰)

> **2026-05-18 — 전역 +1px 상향(가독성).** 모든 텍스트 사이즈는 아래 `--fs-*` 토큰을 단일 기준으로 한다. 아이콘은 본 스케일과 무관하며 §2.4 의 t셔츠 스케일(11/12/14/16/18/24/32)을 별도로 유지한다. 토큰 실제 정의는 마스터 `UI_Refinery_DesignSystem.html` 의 `:root` 에 있다.

> **2026-05-18 — 토큰 라우팅 마이그레이션 완료.** Dashboard · DesignSystem · Ontology 3파일의 **컴포넌트 CSS(각 101 선언)** 및 **콘텐츠 인라인 스타일**(Ontology 39 · Dashboard 13 · DesignSystem 5)을 모두 `font-size:var(--fs-*)` 로 라우팅 완료. 아이콘(92, §2.4 t셔츠 스케일)·디자인시스템 specimen·미니어처 데모는 의도적으로 리터럴 px 보존. 이후 **모든 신규 페이지는 처음부터 토큰으로 작성한다** — 아래 `타입 토큰 적용 규칙` 이 단일 판정 기준이다.

| 역할 | 토큰 | 폰트 | 사이즈/웨이트 | 자간 | 예시 |
|---|---|---|---|---|---|
| Page H1 | `--fs-h1` (23px) | Pretendard | 23 / 700 | -0.02em | `<h1>` 페이지 제목 |
| Section Title | `--fs-section` (15.5px) | Roboto | 15.5 / 600 | -0.005em | 위젯 헤더 |
| Body | `--fs-body` (14px) | Roboto · Pretendard | 14 / 400 | -0.005em | 본문 · 라벨 · 버튼 |
| Body (조밀) | `--fs-body-sm` (13px) | Roboto · Pretendard | 13 / 400 | -0.005em | 조밀 본문 · 입력 · 테이블 셀 |
| Label / Eyebrow | `--fs-label` (11.5px) | Roboto | 11.5 / 600 / UPPER | .08em | Section label, Rail group title |
| Caption · Meta | `--fs-caption` (12.5px) | Roboto | 12.5 / 500 | 0 | 부가 정보 |
| Badge · Status | `--fs-badge` (10.5px) | JetBrains Mono | 10.5 / 600 | .04em | 카운트 / 상태 뱃지 |
| Number (KPI) | `--fs-num-kpi` (31px) | Roboto | 31 / 600 (tabular) | -0.02em | KPI 메인 수치 |
| Number (Body) | `--fs-num` (15px) | `.num` Roboto | 15 / 500 (tabular) | -0.01em | 표·델타 수치 |
| Mono / Token | `--fs-mono` (13px) | JetBrains Mono | 12~13 / 600 | 0 | hex, token name |
| Code Cell | `--fs-code` (12px) | JetBrains Mono | 12 / 500 | 0 | 표 셀 코드 |

#### 타입 토큰 적용 규칙 (라우팅)

> 신규 페이지·컴포넌트를 만들 때 **이 표가 텍스트 사이즈 토큰 선택의 단일 판정 기준**입니다. "어떤 역할의 텍스트인가"를 먼저 정하고 해당 토큰을 호출합니다. 값이 스케일과 어긋나면 **역할(의미)을 우선**해 토큰을 고른 뒤 가장 가까운 스케일 값으로 스냅합니다(시각 변화 허용). 역할이 정말 불명확할 때만 시각 변화 0 이 되는 최근접 토큰을 씁니다.

**원칙**
- 모든 텍스트 `font-size` 는 `var(--fs-*)` 로만 지정합니다. **px 리터럴 금지.**
- **제외 ①  아이콘·심볼·모노그램 글리프** (`.ph`, `.rfn-ic`, avatar-initial, brand mark) → `--fs-*` 적용 금지. §2.4 t셔츠 스케일(11/12/14/16/18/24/32)을 그대로 씁니다.
- **제외 ②  디자인시스템 specimen** (타입/사이즈를 *전시*하는 견본 행 `ds-type-sample`, App Shell 미니어처 목업, 컴포넌트 데모 placeholder) → **리터럴 px 유지.** 토큰화하면 명세가 자기참조가 되어 무의미해집니다.

**역할 → 토큰 결정표**

| 역할 / 컨텍스트 | 토큰 |
|---|---|
| 페이지 H1 (`<h1>`, page-head) | `--fs-h1` |
| 위젯 · 섹션 · 모달 헤더 타이틀, 로고/브랜드 네임 | `--fs-section` |
| 본문 · 버튼 · 필드 · 탭 · nav 항목 · 팝오버 항목 · 모달 본문 텍스트 | `--fs-body` |
| 조밀 본문 · 입력 컨트롤 · 테이블 셀 · 작은 버튼/탭(`--sm`, `depth-2`) · 칩 | `--fs-body-sm` |
| 폼 라벨 · 도움말 · 메타 · 캡션 · sub · desc · 툴팁 본문 · `(선택)` 마커 | `--fs-caption` |
| Eyebrow · rail/side 그룹 타이틀 · 테이블 TH (UPPER) | `--fs-label` |
| 카운트 · 상태 · 태그 · pill · LIVE 뱃지 | `--fs-badge` |
| KPI 메인 수치 | `--fs-num-kpi` |
| 표 · 델타 · 인라인 수치 | `--fs-num` |
| hex · 토큰명 · ID · 이메일 · kbd · mono 식별자 (≥13) | `--fs-mono` |
| 표 셀 코드 등 mono 식별자 (≤12) | `--fs-code` |

**비자명 판정 규칙 (혼동 방지 — 실제 라우팅에서 확정된 결정)**
1. 인터랙티브 컨트롤(버튼 · 칩 · 필드 · 탭) 텍스트는 **절대 caption 으로 가지 않음** — body / body-sm 스케일 유지.
2. 카운트 · 뱃지 · 태그는 mono 폰트라도 `--fs-code` 가 아니라 **`--fs-badge`**.
3. 필드 **입력값** 텍스트는 caption 으로 축소하지 않음 — **`--fs-body-sm`**(필드 컴포넌트 스케일과 일치).
4. 폼 라벨 · 도움말 · 메타 · `(선택)` 은 **`--fs-caption`** 으로 통일(form-help/feedback 와 일관).
5. 위젯 헤더 타이틀은 본문(14)이 아니라 **`--fs-section`(15.5)** — 섹션 타이틀 위계.
6. 숫자만 있는 카운트 스팬("99" 등)은 라벨이 아니라 **`--fs-badge`**.

#### 위계 컬러

본문 `ink-800`, 보조 `ink-600`, 비활성 `ink-400` 의 위계를 지킵니다. 다크 모드도 동일 단계 토큰으로 매핑됩니다.

#### 행간 / 자간

- 본문 line-height 1.5, 캡션 1.45, 제목 1.25 ~ 1.35.
- 자간은 토큰에 정의된 값만 사용합니다.

#### Do · Don't

**Do**
- 모든 텍스트 `font-size` 는 `var(--fs-*)` 로 호출합니다 (위 `역할 → 토큰 결정표` 기준).
- 수치는 `.num` 클래스로 자릿수를 정렬합니다.
- Mono 폰트는 코드·토큰명·hex·kbd 등 식별자/리터럴에만 사용합니다.

**Don't**
- 텍스트에 `font-size` px 리터럴을 직접 박지 않습니다 (아이콘 §2.4 · specimen 만 예외).
- 입력값·라벨·버튼 텍스트에 Mono 폰트를 사용하지 않습니다.
- 임의 폰트 사이즈/웨이트를 만들지 않습니다.
- 본문을 브랜드 컬러나 의미 컬러로 강조하지 않습니다.
- 제목·라벨에 `text-transform: uppercase` 를 임의로 적용하지 않습니다 (Eyebrow / Section label 토큰에서만 사용).

### 2.4 Icons

모든 아이콘은 **Phosphor Icons Regular** 가중치로 통일합니다. 검색·선택: <https://phosphoricons.com>

```html
<i class="ph ph-{icon-name}"></i>
```

#### 사이즈 스케일 (t-shirt)

| 토큰 | px | 컨텍스트 |
|---|---|---|
| `.rfn-ic--xs` | 11 | 카운트 뱃지 옆, 매우 작은 인디케이터 |
| `.rfn-ic--sm` | 12 | Density 아이콘 (compact), KPI 델타 화살표 등 |
| **`.rfn-ic--md`** | **14** | **기본**. 버튼, 입력, breadcrumb, KPI 박스 |
| `.rfn-ic--lg` | 16 | Topbar / Rail 아이콘 |
| `.rfn-ic--xl` | 18 | Density (comfortable), Hero 아이콘 |
| `.rfn-ic--2xl` | 24 | 빈 상태, 강조 아이콘 |
| `.rfn-ic--3xl` | 32+ | 온보딩, 일러스트 컴포넌트 |

새 컨텍스트에서는 컨텍스트별 CSS 규칙(파일 상단의 `font-size` 규칙)에 정의해 일관성을 유지합니다.

#### 색상

`currentColor` 를 통해 상위 요소의 `color` 를 상속받습니다. 별도 색상 토큰을 정의하지 않습니다.

#### Fill 가중치 예외

`.ph-fill` 은 "비어있음 ↔ 채워져 있음" 이 의미적으로 구별되어야 하는 경우(즐겨찾기 별 활성, 라디오 체크 활성 등)에만 사용합니다.

#### Widget 헤더·바디와 함께 쓰이는 아이콘

위젯(`.rfn-widget`) 의 헤더(`.rfn-widget-head`) 또는 바디(`.rfn-widget-body`) 안에서 노출되는 인라인 아이콘은 **역할** 에 따라 두 카테고리로 분리해 톤을 정의합니다. 사이즈는 두 카테고리 모두 **MD(14px)** 로 통일합니다.

##### A. 콘텐츠 식별 아이콘 — `Content Identity Icon`

카드 / 테이블 행 / 리스트 항목의 **좌측 표식 아이콘** 처럼 콘텐츠 자체의 정체성(어떤 오브젝트 타입인지, 어떤 카테고리인지) 을 식별하는 데 쓰이는 아이콘입니다.

- 톤: 의미·카테고리에 맞춰 **자유롭게** 컬러 적용 — `brand`(기본), 의미 컬러(`good` / `warn` / `bad`), 또는 `ink` 톤 모두 허용
- 표준 아이콘박스: `background: var(--brand-50); color: var(--brand-700)` (28×28 — 카드 / 22×22 — 테이블 행)
- 의미 강조가 필요한 항목은 해당 의미 컬러 톤 사용 (예: 경고 카테고리 = `warn-50` / `warn`)
- 사이즈: **MD = 14px** 통일

##### B. 보조 신호 아이콘 — `Affordance Icon`

콘텐츠 자체가 아니라, 그 콘텐츠에 가해질 수 있는 **액션 / 진입 / 상태 변화** 를 보조적으로 알리는 작은 아이콘입니다. 예 — 카드/행의 trailing chevron(`ph-arrow-up-right`, `ph-caret-right`), 더보기(`ph-dots-three`), 전체 보기(`ph-arrows-out-simple`), 외부 링크(`ph-arrow-square-out`), 바로가기 등.

- 톤: `color: var(--ink-400)` 의 옅은 톤으로 통일 — 시선이 콘텐츠보다 액션으로 먼저 끌리는 것을 방지
- hover: `var(--ink-900)` (아이콘 버튼은 컴포넌트의 hover 톤 그대로)
- 위젯 헤더 액션 영역(`.rfn-widget-actions`) 의 아이콘 버튼(`.rfn-icon-btn` / `.rfn-icon-btn--sm`) 도 동일 — 컴포넌트 기본값 `ink-600` 를 inline `color: var(--ink-400)` 로 정합
- 사이즈: **MD = 14px** 통일

##### 두 카테고리 혼동 금지

- 콘텐츠 식별 아이콘에 ink-400 을 강제로 적용해 표현력을 깎지 마십시오 (장식이 아니라 식별).
- 보조 신호 아이콘에 brand 톤을 칠해 시선을 빼앗지 마십시오 (액션은 hover 시에만 강조).

#### Do · Don't

**Do**
- 한 가지 가중치(Regular) 만 사용합니다. Fill 은 예외 영역에서만.
- 동일 의미에는 동일 아이콘만 사용해 사용자 학습 비용을 최소화합니다.
- icon-only 사용 시 `title` 또는 `aria-label` 을 반드시 제공합니다.
- 위젯 안 아이콘은 **콘텐츠 식별** / **보조 신호** 두 카테고리로 분리해 톤을 정합니다. 사이즈는 모두 MD(14px).
  - 콘텐츠 식별 — brand · 의미 · ink 톤 자유. 표준은 `brand-50` / `brand-700`.
  - 보조 신호 — `ink-400` 으로 통일, hover 시 `ink-900`.

**Don't**
- Light / Bold / Duotone 가중치 혼용 금지.
- 자체 제작 아이콘을 만들지 않습니다.
- 아이콘에 색을 임의로 입혀 시각 노이즈를 만들지 않습니다.
- 보조 신호 아이콘(chevron · 더보기 · 전체 보기 등) 에 brand / 의미 컬러를 칠해 시선을 빼앗지 않습니다.
- 콘텐츠 식별 아이콘을 ink-400 으로 강제 통일해 표현력을 깎지 않습니다.

### 2.5 Grid

Refinery 의 모든 페이지는 **16-column 가변 그리드** 위에 배치됩니다.

#### Universal Constants

| 토큰 | 값 | 설명 |
|---|---|---|
| `--grid-cols` | 16 | 기본 컬럼 수 |
| `--grid-gutter` | 14px | 가로/세로 gap |
| `--page-pad-x` | 24px | 페이지 좌우 padding (XL/LG 데스크탑) |
| `--page-pad-t` | 20px | 페이지 상단 padding |
| `--page-pad-b` | 24px | 페이지 하단 padding |
| section-gap | 14~16px | 그리드 행 사이 |
| `.page-head` margin-bottom | 24px | H1 영역과 첫 그리드 사이 |

#### Breakpoints

| Breakpoint | 폭 | Columns | Page L/R | Rail | Sub Nav |
|---|---|---|---|---|---|
| **XL** Desktop | ≥ 1441 | 16 | 24px | 200 | 240 |
| **LG** Compact Desktop | 1201 ~ 1440 | 16 | 18px | 180 | 220 |
| **MD** Laptop | 981 ~ 1200 | 16 | 18px | 180 | hidden |
| **SM** Tablet | 721 ~ 980 | 16 (visual 2/2) | 18px | 180 | — |
| **XS** Mobile | 521 ~ 720 | 16 (visual 1) | 12px | 52 icon-only | — |
| **XXS** Small Mobile | ≤ 520 | 16 (visual 1) | 12px | 44 | — |

`이 breakpoint 값들은 모든 페이지에 동일하게 적용`되며 페이지별로 추가 breakpoint 를 정의하지 않습니다.

#### Common Span Patterns

한 행의 span 합은 **항상 16** 이 되도록 배치합니다.

| 패턴 | 조합 | 용도 |
|---|---|---|
| Full | 16 | Table, banner, full chart |
| Halves | 8 + 8 | 좌우 비교, 차트 + 사이드 |
| Quarters | 4 + 4 + 4 + 4 | KPI 4-strip |
| Primary | 11 + 5 | Main + Side chart |
| Triplet | 7 + 5 + 4 | Main + Sub + KPI |
| Sixths | 6 + 6 + 4 | 2-column + small |

#### Do · Don't

**Do**
- 한 행의 span 합 = 16.
- 정의된 breakpoint 안에서만 자동 재구성이 일어나도록 합니다.
- 새 페이지에서도 위 6개 Span Pattern 을 우선 사용합니다.

**Don't**
- 임의의 column 수(`repeat(12, 1fr)` 등)나 임의 gutter 를 사용하지 않습니다.
- 페이지별로 추가 breakpoint 를 정의하지 않습니다.
- span 합이 16 을 벗어나는 행을 만들지 않습니다.

### 2.6 Spacing · Radius · Shadow

#### Spacing 스케일

Refinery 는 정해진 간격 토큰 외 새 값을 만들지 않습니다.

| 사용처 | 값 |
|---|---|
| 인라인 micro gap | 2 / 4 / 6 |
| 컴포넌트 내부 gap | 6 / 8 / 10 / 12 |
| 컴포넌트 padding | 8/10 (2depth), 12/14 (1depth) |
| 행/열 gap (grid) | 14 (gutter) |
| 섹션 간격 | 14 ~ 16 (그리드 행), 24 (page-head bottom) |
| Page padding | 12 / 18 / 24 (breakpoint별) |

#### Radius

| 사용처 | 값 |
|---|---|
| Chip · 인라인 뱃지 | 4 ~ 5 |
| 입력·버튼·작은 카드 | 7 ~ 8 |
| 위젯 1depth · 모달 · popover · 큰 카드 | 10 |
| Pill (segmented control 외곽) | 10 (직사각) |
| 원형 아바타·도트 | 50% |

#### Shadow

| 토큰 | Light | Dark | 사용처 |
|---|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(20,30,45,.05)` | `0 1px 2px rgba(0,0,0,.40)` | subtle elevation |
| `--shadow` | shadow-sm + 1px ring | shadow-sm + 1px ring on white alpha | hover lift |
| `--shadow-card` | `0 1px 2px rgba(20,30,45,.04), 0 1px 1px rgba(20,30,45,.04)` | `0 2px 4px rgba(0,0,0,.35), 0 1px 1px rgba(0,0,0,.25)` | 1depth widget |
| popover/modal shadow | `0 12px 28px rgba(20,30,45,.12)` (light), `0 12px 28px rgba(0,0,0,.4)` (dark) | (동일) | 부유 패널 |

**2depth 박스는 shadow 를 사용하지 않습니다.** (1depth 와의 위계 분리 목적)

---

## 3. Layout · App Shell

모든 페이지는 동일한 4영역 셸 위에서 동작합니다.

```
┌──────┬───────────┬──────────────────────────────┐
│      │           │ .topbar    (56px, 고정)       │
│      │           ├──────────────────────────────┤
│ .rail│  .side    │ .page                         │
│ 200  │  240      │   ↳ .page-head  (mb 24)       │
│      │           │   ↳ .grid (16col, g14)        │
└──────┴───────────┴──────────────────────────────┘
```

| 영역 | 클래스 | 폭/높이 | 표면 토큰 | 역할 |
|---|---|---|---|---|
| Global Nav | `.rail` | 200 (XL), 180 (LG/MD), 52/44 (mobile) | `--surface-rail` | 앱 전체 진입점, active = brand 톤 50/700 + 좌측 indicator |
| Sub Nav | `.side` | 240 (XL), 220 (LG), hidden (≤MD) · **wide 변형 320/300** | `--surface-side` | 현재 앱 내 페이지 네비, collapse 가능 |
| Header | `.topbar` | h 56, 고정 | `--surface-topbar` | 좌: collapse + Breadcrumb / 우: 전역 액션 (밀도·전체화면·검색·테마·알림 등) |
| Content Canvas | `.page` | flex 1, scroll | `--surface-page` | 페이지 컨텐츠 영역 |
| Page Header | `.page-head` | mb 24 | — | H1(23/700 Pretendard) + 상태 뱃지 + meta + spacer + page actions |

#### Sub Nav 폭 변형 — Wide Data-Tree Variant (`body.app-side-wide`)

기본 Sub Nav 폭(240/220)은 **평면적인 메뉴 리스트** 기준입니다. 그러나 `Tables → table → Columns → column(type)` 처럼 **깊게 중첩되는 데이터/스키마 트리(`.rfn-tree`)** 는 행마다 이름+타입을 함께 읽어야 해 기본 폭에서 가독성이 떨어집니다. 이런 화면은 **opt-in 변형 `body.app-side-wide`** 를 켜서 Sub Nav 를 넓힙니다.

| 항목 | 규약 |
|---|---|
| 토글 | 페이지 `<body>` 에 `class="app-side-wide"` 추가 (해당 화면에서만) |
| 폭 | **XL 320 / LG 300** (`--side-w` 토큰 override). side 가 보이는 XL/LG 에만 작동 — ≤MD 는 기존대로 Sub Nav 숨김 |
| 폭 구현 | shell 그리드는 `--side-w` 토큰을 단일 기준으로 사용(`.app` · collapse 규칙 모두). 변형은 이 토큰 한 값만 바꿈 → 드리프트 없음 |
| 트리 행 | 더 큰 행(34h) + 라벨 `--fs-body`(14) + 타입은 우측 뮤트 mono(`--fs-code`), 길면 ellipsis. 깊은 레벨 대비 들여쓰기 14/level |
| 잘림 대응 | 가장 깊은 레벨의 긴 이름/타입은 잘릴 수 있어, JS 로 각 행 이름·타입에 `title`(hover 툴팁)을 부여해 전체 값을 항상 확인 가능 |

> 이는 "모든 Sub Nav 는 고정폭" 의 **명시적 예외**가 아니라 **고정폭 변형 1종 추가**입니다(여전히 고정폭, 리사이즈·드래그 아님). 일반 메뉴형 Sub Nav 에는 적용하지 않습니다. 현재 적용 화면 = Pipeline(스키마 트리).

#### Density Modes

사용자는 Topbar 의 밀도 버튼으로 페이지 정보 밀도를 3단(Compact / Default / Comfortable)으로 조정할 수 있습니다. 구현은 **`.page` 영역에 `zoom` 만 적용** 하는 단순 방식 — Rail/Side/Topbar 는 항상 일정한 크기를 유지하고 페이지 콘텐츠만 비례 확대/축소됩니다.

페이지를 만들 때 density 동작을 위한 별도 분기를 하지 않습니다.

#### Page State Persistence — 새로고침 시 현재 위치 유지

App 안에서 Sub Nav 로 페이지를 전환할 수 있는 모든 화면(현재 보고 있는 sub-page · sub-tab · 필터 등 **사용자가 능동적으로 선택한 위치**)은 **localStorage 에 영속화** 합니다. 사용자가 페이지를 새로고침해도 이전에 보던 sub-page 가 그대로 복원되어야 합니다.

**구현 규약**

| 항목 | 규약 |
|---|---|
| 저장 키 | `refinery-{view}-state-v1` 형식. 예 — `refinery-ontology-state-v1` |
| 값 형식 | JSON `{ <subPageKey>: "<value>" }` 단일 객체. 예 — `{ "ontoPage": "object-types" }` |
| 저장 시점 | Sub Nav 항목 클릭으로 sub-page 가 전환되는 **모든 경로** 의 핸들러 끝에서 즉시 저장 |
| 복원 시점 | 핸들러 바인딩 직후 1회. body 의 `data-{view}-page` 속성과 Sub Nav 의 `.active` 클래스를 함께 동기화 |
| 검증 | 복원값이 유효한 sub-page key 인지 확인 후 적용 (손상된 state 는 무시) |
| 폴백 | 저장된 state 가 없거나 손상되었으면 body 의 기본 속성을 그대로 유지 |
| 예외 처리 | localStorage 접근 자체를 `try/catch` 로 감싸 private mode / 차단 환경에서 무해하게 동작 |

**적용 범위**

- Sub Nav 페이지 전환 (예 — Ontology Overview ↔ Object Types)
- 페이지 안의 1depth Tab (페이지 레벨 섹션 전환)
- **포함하지 않음** — 일시적 UI 상태 (Popover open / Modal open / Toast / hover state 등). 사용자가 다음 세션에 보고 싶은 위치만 영속화합니다.

영속화하지 않으면 사용자는 새로고침마다 진입 페이지로 강제 이동되어 작업 흐름이 끊깁니다. 모든 신규 페이지에서 이 규칙은 **기본값** 입니다.

#### Navigation Model — Cross-file (Global Nav 단위 분리)

앱은 Global Nav 단위로 **Dashboard · Design System · Ontology** 3개 독립 HTML 로 분리돼 있으며, 공통 Shell 스크립트가 파일 간 이동·테마·진입·Active 를 일관 통제합니다. 신규 파일/페이지도 동일 규칙을 따릅니다.

| 항목 | 규약 |
|---|---|
| 공유 테마 | 단일 키 `refinery-theme` 로 3파일 공유. `<body>` 직후 인라인 부트스트랩이 페인트 전 적용(플래시 방지), Shell 이 토글·복원을 최종 통일 — 파일 이동·새로고침 모두 라이트/다크 유지 |
| 크로스파일 이동 | Rail 의 영역 항목(`data-nav`) + **FAVORITES 동적 클론** 을 `.rail` 위임(delegation)으로 처리 — 어느 섹션에서 눌러도 해당 파일로 이동 |
| 진입 규칙 | Global Nav/FAVORITES 로 **다른 파일 진입 = 그 섹션의 첫 Sub Nav** 로 이동(`refinery-fresh-nav`). 단순 **브라우저 새로고침 = 직전 sub-page 복원**(위 영속화 규칙). 두 경우는 sessionStorage 플래그로 구분 |
| **Active 소유** | Global Nav active 는 rail 전체에서 **항상 1개만**. FAVORITE 와 APPLICATION 에 동시 active 금지 — active 는 **클릭한 섹션이 소유**(FAVORITE 클릭 → FAVORITE active·APPLICATION 쌍둥이 normal, 반대도 동일). `{file,key,src}` 를 `refinery-nav-active` 로 영속화해 크로스파일·새로고침에도 소유 섹션 유지 |

> **2026-05-18 — 위 Navigation Model 도입.** 3개 파일 공통 Shell 스크립트로 구현. 일시적 UI 상태(§ 위 "포함하지 않음")는 여전히 영속화 대상 아님.

#### Do · Don't

**Do**
- 모든 신규 페이지는 4개 영역 위에서만 동작하도록 합니다.
- 페이지별 액션(필터·새로고침·내보내기·CSV)은 **Topbar 가 아닌 Page Header** 또는 위젯 헤더에 배치합니다.
- 라이트 모드는 Rail/Topbar 가 가장 밝게, 다크 모드는 Rail 이 가장 어둡게 — 위계 의미 인덱스는 두 모드에서 동일하게 유지합니다.

**Don't**
- App Shell 의 4영역 구조를 페이지에서 깨지 않습니다.
- Topbar 에 페이지별 액션을 추가하지 않습니다.
- Rail / Side / Topbar 의 폭·높이를 페이지에서 변경하지 않습니다.

---

## 4. Components

### 4.1 Button

#### Variants · Hierarchy

| 변형 | 클래스 | 톤 | 사용처 |
|---|---|---|---|
| **Primary** | `.rfn-btn .rfn-btn--primary` | brand 100% (Refined Blue), text white | 페이지 핵심 CTA, +Add, 폼 Submit |
| Secondary | `.rfn-btn .rfn-btn--secondary` | ink-100 fill, ink-800 text | 보조 액션 (Cancel, 보기 모드 전환 등) |
| Tertiary | `.rfn-btn .rfn-btn--tertiary` | transparent, ink-700 text | 인라인 link-button, 무게감 최소화 |
| Danger | `.rfn-btn .rfn-btn--danger` | bad fill (Red), text white | 삭제 등 파괴적 액션 |

`Primary 외 어떤 변형도 Refined Blue 를 사용하지 않습니다.`

#### Sizes

| 사이즈 | 높이 | 사용처 |
|---|---|---|
| Small | 28 | 테이블 인라인 액션, 필터바 |
| **Medium** | **32** | **기본**. 일반 페이지 액션 |
| Large | 40 | 페이지 핵심 CTA, 모달 푸터 |

같은 행에 놓인 입력(`.rfn-field`) 과 height 를 일치시킵니다.

#### States

`Default · Hover · Active · Focus · Disabled · Loading` 6 상태. **Focus = Refined Blue 3px 글로우 링**, 라이트·다크 동일. Loading 은 spinner + 클릭 비활성.

#### Icon Button

아이콘만으로 동작을 표현하는 정사각형 버튼 (`.rfn-btn--icon`). `title` / `aria-label` 필수.

#### Composition

- 버튼 그룹: Primary 우측, Secondary/Tertiary 좌측.
- 라벨은 Pretendard / Roboto 만 사용. **Mono 폰트 절대 사용 금지**.

#### Do · Don't

**Do**
- Primary = Refined Blue 만, 한 화면에 1~2개 권장.
- 사이즈는 같은 행 안에서 통일.
- icon-only 버튼은 `title` / `aria-label` 제공.

**Don't**
- Primary 외 버튼에 Refined Blue 사용 금지.
- 임의 색 / 임의 height 버튼 생성 금지.
- 버튼 라벨에 Mono 폰트 사용 금지.
- Focus 링 제거 금지.

### 4.2 Widget

페이지에 배치되는 카드형 컨테이너. 위계는 **1depth + 2depth 두 단계만** 사용합니다.

#### 1depth · Primary Widget (`.rfn-widget`)

- 페이지에 직접 올라가는 최상위 카드.
- Background: `var(--surface-card)`, border: `1px solid var(--ink-200)`, radius `10`, shadow `--shadow-card`.
- 라이트 모드 → 흰 카드 + 옅은 shadow. 다크 모드 → Sub Nav 와 동일한 다크 톤(`#191D22`, = `--surface-side`)으로 통일, elevation 은 shadow 로 표현.

#### 2depth · Nested Box (`.rfn-box`)

- 1depth 위젯 내부에서 정보를 묶는 중첩 박스.
- Background: `var(--ink-50)` (light) / `var(--ink-100)` (dark), border: `1px solid var(--ink-200)`, radius `8`, padding `10/12`.
- **Shadow 사용 금지** — elevation 을 추가하지 않습니다.

#### Composition · Widget Header & Body

```html
<div class="rfn-widget">
  <div class="rfn-widget-head">
    <div class="rfn-widget-title">Widget Title</div>
    <div class="rfn-widget-sub">subtitle · meta</div>
    <div class="rfn-widget-actions">
      <i class="ph ph-arrows-out-simple" title="확대"></i>
      <i class="ph ph-download-simple" title="다운로드"></i>
      <i class="ph ph-dots-three" title="더보기"></i>
    </div>
  </div>
  <div class="rfn-widget-body">
    <!-- content -->
  </div>
</div>
```

- **Header** — Title(14/600) + Sub(12.5/500) + Actions(우측 정렬, gap 4, Phosphor Regular 14, 확대 · 다운로드 · 더보기 순). 하단 1px divider 로 Body 분리.
- **Body** — padding 14/16. 2depth 박스는 grid 10px gap, 차트는 직접 배치(gap 12).
- KPI 같은 컴팩트 위젯은 Header 없이 Body 안에 라벨/값/메타가 통합될 수 있습니다.

#### Do · Don't

**Do**
- 1depth + 2depth 의 두 단계로만 정보 위계 표현.
- Widget 의 표면은 `var(--surface-card)` 만 사용.
- Header 의 action icon 은 Phosphor Regular 14px.

**Don't**
- 3depth 이상의 중첩 박스 생성 금지.
- 2depth 박스에 shadow 추가 금지.
- 위젯 안에 새로운 컬러 카드(brand-tinted 등) 임의 생성 금지.

### 4.3 Table

Table 은 1depth Widget 안에 들어갑니다 (외곽 Header · Filter · CSV 등 Toolbar 는 Widget header pattern 사용). `.rfn-table` 자체는 행/열 구조, Cell 유형, 행 상태, 인터랙션 규칙을 다룹니다.

#### Anatomy

| 영역 | 스타일 |
|---|---|
| Header (TH) | `ink-500`, Roboto UPPER 11.5/600, 하단 보더 `ink-200` |
| Body Row (TR/TD) | TD `ink-800`, 하단 보더 `ink-100` |
| Row Divider | 1px solid `ink-100` |

#### Cell Types

| 타입 | 표현 |
|---|---|
| ID · 코드 · 시간 · hex | Mono 폰트 |
| 일반 텍스트 | Roboto / Pretendard |
| 수치 | Roboto + tabular-nums (`.num`) |
| Tag · Badge | `.rfn-tcell-tag` (인라인 태그) · `.badge` (카운트/상태 뱃지) |
| Progress | `.rfn-tcell-progress` |
| Sparkline | `.rfn-tcell-spark` · inline SVG, 24~32 high |
| Status Dot | `.rfn-tcell-dot` (`--good` / `--warn` / `--bad` / `--neutral` / `--off`) |
| Drill-down | 우측 chevron (`ph-caret-right`), color `ink-400` |

#### Row States

| 상태 | 효과 |
|---|---|
| Hover | row 단위 `ink-50` 배경 |
| Selected | 체크 선택, `brand-50` 배경 |
| Alarm | `bad-50` tint, 우선 강조 |
| Disabled | text `ink-400`, hover 비활성 |
| Drill-down | 우측 chevron 노출 |

#### Variants

- **Plain Text Table** — sub-component 없이 텍스트·수치만 (설정, 사용자 목록).
- **Selectable Table** — 좌측 체크박스. Header 체크는 전체/혼합/해제 3-상태(indeterminate).
- **Rich Data Table** — Status Dot · ID · Name · Tag · Badge · Number · Progress · Sparkline · Alarm · Drill-down 셀 유형을 모두 활용. 운영 데이터 모니터링용.

#### Do · Don't

**Do**
- Table 은 항상 1depth Widget 안에 배치.
- ID·시간·hex 등 식별자는 Mono 폰트로 표기.
- 동일 의미의 행 상태는 동일한 컬러 토큰으로 일관 표현.

**Don't**
- 표 안에 임의의 색 줄무늬·테두리 추가 금지.
- 표 안에서 임의 폰트 사이즈 사용 금지.
- 수치 컬럼에 Mono 사용 금지 (`.num` Roboto 사용).

### 4.4 Popover

트리거(버튼·아이콘)에 의해 호출되는 부유 패널. 컨테이너는 동일하나 내부 컨텐츠 패턴에 따라 두 가지 변형을 사용합니다 — **Menu** (액션 리스트) / **Select** (옵션 선택).

#### Container

- `.rfn-popover` — 흰 카드 + 보더 + drop shadow.
- Background: `var(--surface-card)`, border `1px solid var(--ink-200)`, radius `10`, shadow `0 12px 28px rgba(20,30,45,.12)` (light).
- 위치(top/bottom/left/right) 와 on/off 애니메이션은 컨테이너 클래스가 책임지지 않고 부모 컨텍스트(JS) 가 담당합니다.

#### Variant · Menu

- 액션 리스트. Menu Item 은 클릭 시 액션을 실행하고 닫힙니다 → **selected 상태 없음**.
- Item 구조: 아이콘 + 라벨 (+ 우측 단축키 kbd / count badge).
- Danger 변형(`.rfn-popover-item--danger`) — bad 톤.

#### Variant · Select

- 단일 옵션 선택 — 화면 밀도, 보기 모드, 정렬 기준 등.
- Option: 아이콘 박스 + 라벨 + 설명 3행 구조.
- 선택된 항목은 `brand-50` 배경 + 우측 체크 아이콘으로 표시.
- Select 옵션은 단일 선택이므로 **selected 상태로 유지**.

#### Positioning · Trigger

- 4가지 정렬 — `bottom-start / bottom-end / top-start / top-end`.
- 화면 모서리에 가까울 때 자동으로 반대 방향으로 flip.
- 외부 클릭 / ESC 키 / 다른 트리거 클릭 시 닫힘.

**Anchored 래퍼 — `.rfn-popover-anchor`.** `.rfn-popover` 컨테이너는 위치/토글을 정의하지 않으므로(위 원칙), 트리거 + 팝오버를 `.rfn-popover-anchor`(position:relative)로 감싸면 팝오버가 트리거 바로 아래(`top: 100% + 8px`)로 floating 되고 표준 fade/slide 애니메이션이 붙습니다. 열고 닫기는 JS 가 `.open` 클래스를 토글(외부 클릭·ESC 닫기도 JS 책임). 예 — Pipeline 페이지 헤더의 브랜치 전환 칩(`.chip` 트리거 + `.rfn-popover` Menu · 텍스트 전용 `menuitemradio`, 현재 브랜치는 `aria-checked="true"` 의 텍스트 강조(brand)로 표시).

#### Do · Don't

**Do**
- Popover 의 표면은 `var(--surface-card)` 만 사용.
- Menu 와 Select 의 의미적 구분(selected 유지 여부)을 지킵니다.
- icon-only trigger 에는 `title` / `aria-label` 제공.

**Don't**
- Popover 안에 또 다른 Popover 를 띄우지 않습니다.
- 한 Popover 에 Menu 와 Select 의미를 섞지 않습니다.
- 임의의 위치 / 임의의 너비를 만들지 않습니다.

### 4.5 Modal

사용자의 주의를 단일 작업에 집중시킬 때만 사용. 단순 안내·알림은 Toast / Inline alert, 보조 옵션은 Popover 를 우선합니다.

#### Anatomy

`Overlay → Container → Head → Body → Foot`. Container 안은 항상 Head → Body → Foot 세로 흐름을 유지하며, **Body 만 스크롤**, Head/Foot 은 고정.

#### Sizes (4단 토큰)

| 토큰 | 너비 | 사용처 |
|---|---|---|
| sm | 360 | Confirm |
| **md** | **480** | **기본**. 일반 액션 |
| lg | 640 | 폼 / 상세 |
| xl | 800 | 멀티 섹션 / 표 포함 |

`임의의 px 값은 사용하지 않습니다.`

#### Variants · By Purpose

| 변형 | 의도 아이콘 클래스 | 사용처 |
|---|---|---|
| Default | `.rfn-modal-head-icon--brand` | 일반 안내 / 폼 |
| Confirm | `.rfn-modal-head-icon--good` | 비파괴적 확인 |
| Destructive | `.rfn-modal-head-icon--danger` | 삭제 등 파괴적 — **click-outside / ESC 닫기 비활성** |
| Detail | `.rfn-modal-head-icon--warn` | 상세 / 경고 |

#### Drawer Variant

기본 모달은 화면 중앙. 긴 목록 · 연속 작업 · 비파괴적 보조 영역에는 **우측 슬라이드 Drawer** 변형. 페이지 컨텍스트를 유지하면서 부가 작업을 수행할 때 사용.

#### Backdrop · Behavior

- Overlay click 닫기, ESC 닫기, 진입 시 포커스 트랩 — 기본 동작.
- **Destructive Confirm 만 click-outside / ESC 닫기 모두 비활성**.

#### Do · Don't

**Do**
- 4단 사이즈 토큰만 사용.
- Destructive 는 명시적 결정이 필요한 경우만, click-outside / ESC 닫기 비활성.
- 한 화면에 한 번에 하나의 모달만.

**Don't**
- 모달 안에 또 다른 모달을 중첩하지 않습니다.
- 임의 px 너비 사용 금지.
- 단순 안내(저장 완료 등)에 모달을 사용하지 않습니다 — Toast 우선.

### 4.6 Search / Input

텍스트·검색·숫자·비밀번호·텍스트영역 등 모든 입력 타입은 동일한 래퍼 `.rfn-field` 위에 정의됩니다.

#### Anatomy

`Label · Leading Affix · Field · Trailing Affix · Helper/Error` 최대 5개 구성 요소 (모두 선택적). 래퍼 `.rfn-field` 가 보더/포커스 링/affix 배치 담당, 실제 `<input>` 은 transparent 로 들어갑니다.

#### Variants

| 변형 | 클래스 | 용도 |
|---|---|---|
| Text | `.rfn-field` | 기본 텍스트 |
| Search | `.rfn-field--search` | 검색 (leading icon, kbd) |
| Number | `.rfn-field` + `<input type="number">` | 수치 (tabular-nums) |
| Password | `.rfn-field` + `<input type="password">` | 비밀번호 (trailing eye toggle) |
| Textarea | `.rfn-field--textarea` | 다행 입력 |

#### Sizes

| 사이즈 | 높이 | 용도 |
|---|---|---|
| Small | 28 | 테이블 인라인 필터, 툴바 |
| **Medium** | **32** | **기본** |
| Large | 40 | 폼 / 모달 핵심 입력 |

`같은 행에 놓인 버튼과 반드시 height 를 일치시킵니다.`

#### States

`Default · Hover · Focus · Disabled · Readonly · Error · Success` 7 상태. **Focus = Refined Blue 3px 글로우 링, Error = Red 보더 + Red 알파 글로우, Success = Green 보더.**

#### Validation · Helper Text

필드 아래에 도움말 · 에러 · 카운터를 단일 행으로 결합. 에러 = `ph-warning-circle`, 성공 = `ph-check-circle` 아이콘 동반.

#### Do · Don't

**Do**
- 모든 입력은 `.rfn-field` 래퍼 위에 정의.
- 같은 행의 버튼과 height 일치.
- Focus 링은 Refined Blue 톤으로 유지.

**Don't**
- 입력값·라벨·플레이스홀더에 **Mono 폰트 절대 사용 금지** (단축키 `kbd` 만 예외).
- 임의 height / 임의 보더 색 사용 금지.
- Focus 링 제거 금지.

### 4.7 Tab

동일 컨텍스트 안에서 콘텐츠를 가로 방향으로 전환하는 네비게이션. 모든 Tab 은 동일한 underline 패턴을 공유하지만 **두 가지 위계** 로 구분됩니다.

#### Two Depths

| Depth | 클래스 | 높이 | active 컬러 | 사용처 |
|---|---|---|---|---|
| **1depth** | `.rfn-tabs` | 40 | Refined Blue | 페이지 / 모달의 섹션 전환 |
| **2depth** | `.rfn-tabs--depth-2` | 32 | ink-900 | 위젯 내부 보기 전환 |

`두 depth 이상 중첩(3depth Tab 안에 Tab) 은 사용하지 않습니다.`

#### Anatomy

`Strip(컨테이너) + Tab(개별 항목) + Indicator(active 밑줄)`. 각 Tab 안에 선택적으로 **Leading Icon · Label · Trailing Count Badge** 배치 가능.

#### States

`Default · Hover · Active · Focus · Disabled` 5 상태. 1depth active = brand, 2depth active = ink-900.

#### Variants

- **With Icon** — 좌측 아이콘 + 라벨
- **With Count Badge** — 라벨 + 우측 카운트 (1depth active 시 brand 톤으로 강조)
- **Full-width** — 컨테이너 폭 전체 분할

#### Composition

- 페이지 상단: `.page-head` + `.rfn-tabs` + content.
- 위젯 내부: widget header + `.rfn-tabs--depth-2` + widget body.

#### Do · Don't

**Do**
- 1depth = Refined Blue, 2depth = ink-900 의 active 컬러 분리를 지킵니다.
- 위젯 내부의 보기 전환에는 2depth 만 사용합니다.

**Don't**
- 3depth Tab (Tab 안의 Tab) 중첩 금지.
- 위젯 내부에 1depth Tab 을 직접 배치하지 않습니다.
- Tab 의 underline 외 색 칠하기 / 박스 외곽 / 그림자 추가 금지.

### 4.8 Toast

사용자 흐름을 차단하지 않고 짧게 노출되는 알림. 단순 안내(저장 완료·복사·동기화 등) 에 모달 대신 우선 사용.

#### Anatomy

`Icon · Content · Close` 가로 흐름, 하단 `Progress` 바가 dismiss 까지 잔여 시간 표시.
Content = Title + Message (모두 선택적, 최소 한 줄 텍스트 필수).

#### Variants · By Intent (4가지)

| 의도 | 아이콘 / 컬러 | 사용처 |
|---|---|---|
| brand | info / brand | 일반 안내, 진행 알림 |
| good | check / good | 성공 |
| warn | warning / warn | 주의 |
| danger | error / bad | 실패 / 경고 |

Colors 페이지의 semantic 토큰을 그대로 사용합니다. Modal head-icon 변형과 동일 컬러 체계 공유.

#### Variants · By Content (3가지)

- **Message Only** — 한 줄
- **Title + Message** — 컨텍스트 동반
- **With Action** — 되돌리기 / 다시 시도 등 단일 액션 동반. **한 Toast 에 최대 1개 액션.**

#### Positioning

- 기본 우상단 (`top-right`).
- 다른 위치는 예외적 사용. 한 앱에서 하나의 위치로 통일.
- `.rfn-toast-stack--{position}` 모디파이어로 변경.

#### Stack Behavior

- 같은 위치에 세로로 쌓임. **가장 최근 Toast 가 가장 위** (top 기준), 10px 간격.
- 한 번에 노출되는 최대 개수 = **4개**. 초과 시 가장 오래된 것부터 즉시 dismiss.

#### Duration Tokens (4단)

| 토큰 | 시간 | 사용처 |
|---|---|---|
| short | 3s | Message Only 짧은 안내 |
| **default** | **5s** | 기본 |
| long | 8s | Title + Message, 정보량 多 |
| persistent | 닫기 전까지 | With Action, Destructive |

#### Do · Don't

**Do**
- 4가지 의도 + 4단 duration 토큰 안에서만 사용.
- 한 Toast 에 최대 1개 액션.
- 위치는 한 앱에서 통일.

**Don't**
- Toast 안에 2개 이상 액션 금지.
- 5개 이상 스택 금지.
- Toast 로 복잡한 결정 (확인/취소 두 액션 등) 요구 금지 — Modal 우선.

### 4.9 Tooltip

트리거 요소(아이콘 버튼·잘린 텍스트·차트 데이터 포인트 등) 에 hover · focus 시 짧게 노출되는 보조 라벨.

#### 핵심 성질

- **인터랙티브하지 않음** — 클릭/터치 불가, `pointer-events: none`.
- **Inverted 톤** — 라이트 모드 → 다크 bg + 흰 텍스트, 다크 모드 → 라이트 bg + 어두운 텍스트.
- 페이지 위 어떤 표면 톤(흰 카드·회색 페이지·다크 모달 등) 과도 명확히 구분됩니다.

#### Anatomy

`Body · Arrow · Content`. Content 는 단순 라벨 또는 Title + Description + Keyboard Shortcut 의 조합.

#### Variants (4가지)

- **Plain** — 한 줄 라벨 (가장 기본)
- **With Shortcut** — 라벨 + 키보드 단축키 (`<kbd>`)
- **Title + Description** — 컨텍스트 동반
- **Multi-line** — 긴 설명 (max 240px)

#### Positioning (8 방향)

`top / bottom` × `start / center / end`, 그리고 `left / right`. 기본 = `top`. 화면 모서리에 가까울 때 자동 flip.

#### Timing

| 토큰 | delay | 사용처 |
|---|---|---|
| instant | 0ms | 차트 hover |
| short | 150ms | 의미가 즉시 필요한 경우 |
| **default** | **300ms** | 기본 |
| long | 700ms | 발견 비용을 키워야 할 때 (대량 아이콘 그리드 등) |

트리거에서 벗어나면 즉시 사라집니다.

#### Do · Don't

**Do**
- icon-only 버튼은 Tooltip 또는 `aria-label` 제공.
- 단순 보조 라벨에만 사용 — 사용자 입력을 받지 않습니다.
- Inverted 톤 유지.

**Don't**
- Tooltip 안에 액션(버튼·링크) 넣지 않음 — 필요하면 Popover.
- 클릭/터치로 열리게 만들지 않음.
- 본문 페이지 톤과 같은 색으로 만들지 않음 (inverted 원칙).

#### 4.9.1 Data · Graph Popover — 차트 호버 팝오버 (`.cf-tip`)

차트·그래프·히트맵·Sankey 등 **데이터 시각화의 hover 팝오버**는 위 일반 Tooltip(`.rfn-tooltip`)과 **별개의 컴포넌트**이며, 별도 표준을 따릅니다.

> **2026-06-23 — "항상-다크" 공식 표준 승격.** 일반 Tooltip 은 모드별 **inverted**(라이트=다크 bg / 다크=라이트 bg)인 반면, 데이터/그래프 팝오버는 **라이트·다크 모두 항상 다크 톤**(`#16202C` bg + 흰 텍스트)을 유지합니다. 팝오버 안에 **데이터 시리즈 색(`--dv-*`) swatch**·다색 범례가 함께 들어가는 경우가 많아, 두 모드에서 **swatch 색 대비를 일정하게** 보장하기 위한 **의도된 예외**입니다(§5.1 모드 동등 원칙의 인가된 carve-out). 단일 소스 = `refinery.css` 의 **`.cf-tip`**.

**핵심 성질**
- **항상 다크** — `body.dark` 오버라이드 없음. 라이트/다크 무관 동일한 다크 카드(`#16202C` / 흰 텍스트).
- **인터랙티브하지 않음** — `pointer-events:none`. 위치(`left/top/transform`)·표시(`display`)는 JS 가 런타임에 inline 으로 설정.
- **내부 톤 규약** — 타이틀 `#fff`/600 · 라벨 `#CFCFCF` · 값 `#fff`/500 · 색점 = 해당 시리즈 hex(`--dv-*` 또는 brand 스케일). 수치는 `.num`(tabular).
- **적용 대상** — cf-plot 멀티시리즈, 히트맵 셀, Sankey 노드/링크, 트리맵 타일, 스파크라인 등 **모든 데이터 시각화 hover 팝오버**.

**Do**
- 모든 차트/데이터 hover 팝오버는 `.cf-tip` **하나만** 사용 (차트마다 새 톤/클래스 금지).
- 시리즈 색 swatch 는 차트와 **동일한 hex** 로 찍어 범례-팝오버 색을 일치시킵니다.
- 위치는 JS 로 커서/데이터 포인트 기준 inline 설정하고, 경계 충돌 시 flip/clamp 합니다.

**Don't**
- 데이터 팝오버를 모드별로 inverted 시키지 않습니다(일반 Tooltip 과 혼동 금지 — 데이터 팝오버는 **항상 다크**).
- 표면 토큰(`var(--surface-card)`)으로 칠해 라이트 모드에서 밝은 팝오버로 만들지 않습니다(구 `.rfn-sankey-tip` 표면형 패턴은 본 표준으로 대체 · 신규 사용 금지).
- 차트마다 `#cpdTip` 처럼 인라인으로 톤을 중복 정의하지 않습니다 — `.cf-tip` 클래스를 호출합니다.

### 4.10 Carousel

제한된 영역 안에서 여러 슬라이드를 가로 방향으로 순회. 페이지 hero · 카드 그룹 · 위젯 내부 view 등 콘텐츠가 많지만 한 번에 모두 노출할 수 없는 컨텍스트.

#### Anatomy

`Track · Slide · Arrows · Indicator` (Arrows / Indicator 는 선택적, 둘 중 최소 하나 노출 권장).

#### Variants · By Layout

- **Single** — 한 번에 1개 (hero 용)
- **Multi-2 / -3 / -4** — 카드 그룹

슬라이드 너비는 모디파이어로 자동 계산. 별도 width 지정 불필요.

#### Navigation Controls

| 패턴 | 용도 |
|---|---|
| Arrows + Dots | 적은 슬라이드 (3~7개) |
| Arrows + Counter | 많은 슬라이드 (8개+) |
| Arrows + Progress bar | 진행감 강조 (auto-play) |
| Dots only | 매우 적은 슬라이드 (≤5), 최소 컨트롤 |

#### States

`Default · Hover · Active · Focus · Disabled` 5 상태. 가장자리 슬라이드(첫/마지막) 에서는 해당 방향 Arrow 자동 disabled.

#### Auto-play

- hero · 광고 배너 등 정보 제공 목적에만.
- 사용자 입력(hover · focus · 탭) 있으면 즉시 pause.
- 사용자 결정·입력이 중요한 카드 그룹 등에는 사용 금지.

#### Do · Don't

**Do**
- 콘텐츠가 한 번에 노출 불가한 경우에만 사용 (보조 콘텐츠 한정).
- 슬라이드 수에 맞는 인디케이터 선택 (dots / counter / progress).
- Arrows 또는 Indicator 중 최소 하나 노출.

**Don't**
- 페이지 네비게이션(필수 메뉴 등) 에 Carousel 사용 금지.
- 사용자 결정이 필요한 컨텍스트에 auto-play 적용 금지.
- 임의의 슬라이드 너비 / 임의 인디케이터 위치 만들지 않음.

---

## 5. Light · Dark Mode 처리

### 5.1 두 모드의 의미 인덱스 동등

Refinery 는 라이트·다크 모드에서 **동일한 의미 인덱스의 토큰 단계**를 유지합니다. 모드 전환은 토큰 매핑만 바뀌며, 컴포넌트의 위계·간격·구조는 동일합니다.

| 의미 인덱스 | Light | Dark |
|---|---|---|
| 본문 텍스트 (ink-800) | `#22303F` | `#C0C4CA` |
| 보조 텍스트 (ink-600) | `#5A6776` | `#878E97` |
| 비활성 (ink-400) | `#A4ADB8` | `#424850` |
| 카드 표면 (`--surface-card`) | `#FFFFFF` | `#191D22` |
| 페이지 배경 (`--surface-page`) | `#F6F8FA` | `#111316` |
| 가장 깊은 표면 (`--surface-rail`) | `#FAFBFC` | `#131519` |

### 5.2 컴포넌트 작성 시 모드 처리

신규 페이지·컴포넌트를 만들 때는 **CSS 변수 토큰만 호출** 하면 라이트/다크 자동 적응이 보장됩니다.

```css
/* GOOD */
.my-card{
  background: var(--surface-card);
  border: 1px solid var(--ink-200);
  color: var(--ink-800);
}

/* BAD */
.my-card{ background: #FFFFFF; color: #22303F; }    /* hex 직접 */
body.dark .my-card{ background: #191D22; ... }      /* 모드별 분기 */
```

### 5.3 Symbol · Icon 의 `currentColor` 활용

`Symbol`, `Phosphor Icon` 은 `currentColor` 를 통해 상위 텍스트 색을 그대로 상속받습니다. 별도 다크 모드 자산이나 별도 color 토큰을 정의하지 않습니다.

### 5.4 디자인시스템 페이지의 라이트/다크 미리보기 영역

디자인시스템 페이지의 "Light & Dark Mode" 섹션의 두 컬럼은 **앱 테마 전환과 무관하게 항상 자신의 톤을 유지** 합니다.

- 라이트 컬럼: `.ds-mode-col` (또는 `.ds-mode-col:not(.ds-mode-dark)`)
- 다크 컬럼: `.ds-mode-col.ds-mode-dark`
- 라이트 캔버스: `.ds-live-canvas`
- 다크 캔버스: `.ds-live-canvas.ds-live-canvas--dark`

위 4종 컨테이너 안에서는 `--surface-*` 등 모든 토큰이 컨테이너 스코프에서 강제 재정의되므로, 일반 production 컴포넌트(`var(--surface-card)` 호출하는 `.rfn-widget` 등) 도 의도된 색으로 렌더됩니다.

신규 페이지에서도 같은 데모 영역을 만들 때는 이 4개 클래스를 그대로 사용합니다.

#### Do · Don't

**Do**
- 모든 색을 토큰으로 호출 — 자동 모드 적응.
- 모드별 분기가 꼭 필요한 경우에만 `body.dark .X { ... }` 로 단일 속성을 보정.
- 디자인시스템 미리보기는 정해진 4개 클래스 사용.

**Don't**
- 한 모드에서만 동작하는 hex 사용 금지.
- 동일 의미인데 모드별로 다른 의미 인덱스로 매핑하지 않음.
- 다크 모드를 위해 라이트 자산을 별도 만들지 않음 (`currentColor` 활용).

---

## 6. 신규 페이지 워크플로우

### Step 1. App Shell 위에 페이지 등록

- Rail / Side / Topbar / Page 의 4영역은 손대지 않고, `.page` 안에 새 컨텐츠 영역을 추가합니다.
- Side Nav 의 항목을 추가하고 `data-page` 또는 동등한 라우팅 키를 부여합니다.
- 페이지 진입 시 Topbar 의 Breadcrumb 가 자동으로 갱신되도록 합니다.

### Step 2. Page Header 구성

```html
<div class="page-head">
  <h1>페이지 이름</h1>
  <span class="live">LIVE</span>          <!-- 선택 -->
  <div class="page-head-meta">
    <span class="last-sync">…</span>      <!-- 선택 -->
  </div>
  <div class="spacer"></div>
  <!-- page-level actions (필터, 새로고침, +Add 등) -->
  <button class="rfn-btn rfn-btn--secondary"><i class="ph ph-funnel"></i>Filter</button>
  <button class="rfn-btn rfn-btn--primary"><i class="ph ph-plus"></i>Add Widget</button>
</div>
```

- H1: 23 / 700 Pretendard / -0.02em
- `.page-head { margin-bottom: 24px }`

### Step 3. Grid 레이아웃 배치

```html
<div class="grid" style="display:grid;grid-template-columns:repeat(16,1fr);gap:14px">
  <!-- KPI row -->
  <div class="kpi" style="grid-column:span 4">…</div>
  <div class="kpi" style="grid-column:span 4">…</div>
  <div class="kpi" style="grid-column:span 4">…</div>
  <div class="kpi" style="grid-column:span 4">…</div>
  <!-- Main + Side -->
  <div class="rfn-widget" style="grid-column:span 11">…</div>
  <div class="rfn-widget" style="grid-column:span 5">…</div>
</div>
```

- 한 행의 span 합 = 16.
- 패턴은 **§2.5 Grid → Common Span Patterns** 를 우선 사용합니다.

### Step 4. Widget · 컴포넌트 채우기

- 모든 컨테이너는 `.rfn-widget` (1depth) 위에 `.rfn-box` (2depth) 만 중첩.
- 위젯 헤더의 액션 아이콘 순서: 확대 → 다운로드 → 더보기(⋯).
- KPI / 차트 / 테이블 / 리스트 등 컨텐츠 유형별로 §4 의 컴포넌트 규칙을 따릅니다.

### Step 5. 인터랙션 추가

- 보조 옵션 → `.rfn-popover` (Menu / Select).
- 단일 작업 집중 → `.rfn-modal` (4단 사이즈, 4가지 의도).
- 짧은 알림 → `.rfn-toast` (4 의도, 4 duration, 최대 1 액션).
- icon-only / 잘린 텍스트 → `.rfn-tooltip` (8방향, 4 timing).
- 동일 컨텍스트의 콘텐츠 전환 → `.rfn-tabs` (1depth) / `.rfn-tabs--depth-2` (2depth).
- 다중 슬라이드 → `.rfn-carousel` (single / multi-N, dots / counter / progress).

### Step 6. 모드 적응 검증

- 라이트 모드와 다크 모드 양쪽에서 페이지를 열어 봅니다.
- 모든 색·표면·텍스트 위계가 의미 인덱스 동등성을 유지하는지 확인합니다.
- 디자인시스템의 데모 컬럼 영역이 페이지 안에 포함된 경우 — 4개 클래스(`.ds-mode-col` / `.ds-mode-col.ds-mode-dark` / `.ds-live-canvas` / `.ds-live-canvas--dark`) 를 그대로 사용해 색 격리를 보장합니다.

---

## 7. 페이지 코드 템플릿

신규 페이지 추가 시 시작점으로 사용할 수 있는 최소 골격입니다. **이 템플릿 안에서만 페이지를 만들고, 외부 구조를 변경하지 않습니다.**

> CSS 는 `refinery.css` 단일 소스를 link 합니다. 페이지 `<head>` 에 `<link rel="stylesheet" href="refinery.css">` 한 줄만 두고, **`<style>` 블록이나 토큰 hex/px 리터럴을 페이지에 넣지 않습니다.** 아래는 `.page` 본문 골격이며, 색·표면·폰트는 모두 refinery.css 의 토큰으로 자동 적용됩니다.

```html
<!-- 페이지 진입 시 Side Nav 항목과 매칭되는 data-page 값 -->
<div class="page" data-page="my-new-page">

  <!-- ===== Page Header ===== -->
  <div class="page-head">
    <h1>페이지 이름</h1>
    <div class="page-head-meta">
      <!-- last-sync, status, live badge 등 (선택) -->
    </div>
    <div class="spacer"></div>
    <!-- Page-level actions -->
    <button class="rfn-btn rfn-btn--secondary">
      <i class="ph ph-funnel"></i>Filter
    </button>
    <button class="rfn-btn rfn-btn--primary">
      <i class="ph ph-plus"></i>Primary Action
    </button>
  </div>

  <!-- ===== Grid Container ===== -->
  <div class="grid" style="display:grid;grid-template-columns:repeat(16,1fr);gap:14px">

    <!-- Row 1 : KPI Strip (4 metrics × span 4) -->
    <div class="kpi" style="grid-column:span 4">
      <div class="row1">
        <span class="label">KPI Label</span>
        <span class="badge">REALTIME</span>
      </div>
      <div class="v">
        <span class="big num">1,234</span>
        <span class="unit">unit</span>
      </div>
      <div class="foot">
        <span class="delta up"><i class="ph ph-caret-up"></i>0.0%</span>
        <span class="vs">vs baseline</span>
      </div>
      <!-- KPI sparkline (선택) : <svg class="spark" viewBox="0 0 120 36" preserveAspectRatio="none">…</svg> -->
    </div>
    <!-- ... KPI ×3 more -->

    <!-- Row 2 : Main + Side (11 + 5) -->
    <div class="rfn-widget" style="grid-column:span 11">
      <div class="rfn-widget-head">
        <div class="rfn-widget-title">Main Chart</div>
        <div class="rfn-widget-sub">subtitle · meta</div>
        <div class="rfn-widget-actions">
          <i class="ph ph-arrows-out-simple" title="확대"></i>
          <i class="ph ph-download-simple" title="다운로드"></i>
          <i class="ph ph-dots-three" title="더보기"></i>
        </div>
      </div>
      <div class="rfn-widget-body">
        <!-- chart -->
      </div>
    </div>

    <div class="rfn-widget" style="grid-column:span 5">
      <div class="rfn-widget-head">
        <div class="rfn-widget-title">Side Panel</div>
      </div>
      <div class="rfn-widget-body">
        <div class="rfn-box">
          <div class="rfn-box-label">Stat</div>
          <div class="rfn-box-value num">000.0</div>
        </div>
      </div>
    </div>

    <!-- Row 3 : Full Table (span 16) -->
    <div class="rfn-widget" style="grid-column:span 16">
      <div class="rfn-widget-head">
        <div class="rfn-widget-title">Data Table</div>
        <div class="rfn-widget-sub mono">24 ITEMS</div>
        <div class="rfn-widget-actions">
          <!-- filter chip + CSV button -->
        </div>
      </div>
      <div class="rfn-widget-body">
        <table class="rfn-table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Status</th><th class="num">Value</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="mono">F-001</span></td>
              <td>Feeder Alpha</td>
              <td><span class="rfn-tcell-dot rfn-tcell-dot--good"></span>Normal</td>
              <td class="num">1,234</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</div>
```

> 모든 텍스트 컬러, 표면 컬러, 폰트 스택, 보더 컬러는 **CSS 변수 토큰**(`var(--ink-*)`, `var(--surface-*)`, `var(--brand)`, `var(--good|warn|bad)`, `var(--font-en|kr|mono)`) 를 통해 자동 적용됩니다. 위 마크업 안에서는 추가 hex 를 정의할 필요가 없습니다.

---

## 8. 최종 검수 체크리스트

페이지 작업을 마무리하기 전 반드시 통과해야 할 항목입니다.

### 토큰

- [ ] CSS 안에 hex 리터럴이 직접 박힌 곳이 없다. (예외 — ① 디자인시스템 데모 컬럼 강제 주입 영역 ② SVG `fill`/`stroke`/`stop-color` presentation attribute 는 §2.2 팔레트·`--dv-*` 와 동일 값에 한해 허용)
- [ ] 표면 배경은 모두 `var(--surface-*)` 5종 안에서만 사용했다.
- [ ] 텍스트는 `var(--ink-800 / -600 / -400)` 위계를 따른다.
- [ ] 브랜드·의미 컬러는 정의된 용도(액션·강조·상태) 에만 사용했다.
- [ ] 폰트는 `var(--font-en / -kr / -mono)` 만 사용. 입력값에 Mono 사용 안 함.
- [ ] 모든 텍스트 `font-size` 는 `var(--fs-*)` 로 호출 (§2.3 역할→토큰 결정표 기준). 텍스트에 px 리터럴 없음 — 아이콘(§2.4 t셔츠)·디자인시스템 specimen 만 예외.

### 컴포넌트

- [ ] 버튼은 `.rfn-btn` 변형 4종 + 사이즈 3종 안에서만 사용.
- [ ] Primary 외 어떤 변형에도 Refined Blue 가 들어가지 않는다.
- [ ] 위젯은 1depth + 2depth 두 단계만 사용. 3depth 이상 중첩 없음.
- [ ] 2depth 박스에 shadow 없음.
- [ ] 모든 icon-only 트리거에 `title` / `aria-label` 제공.
- [ ] 모달 너비는 4단 토큰(360/480/640/800) 안에서만.
- [ ] Tab 은 1depth (Refined Blue) / 2depth (ink-900) 중 하나만, 3depth 중첩 없음.
- [ ] Toast 액션 ≤ 1, 동시 스택 ≤ 4.
- [ ] Tooltip 안에 액션이 없다. 클릭/터치 불가.

### 레이아웃

- [ ] 모든 그리드 행의 span 합 = 16.
- [ ] 페이지별 추가 breakpoint 없음.
- [ ] `.page-head` 하단 margin = 24px.
- [ ] Topbar 에 페이지별 액션 없음 (Page Header 또는 위젯 헤더에 배치).

### 모드

- [ ] 라이트·다크 모드 양쪽에서 페이지가 의도된 색으로 렌더된다.
- [ ] 모드별 분기 CSS 가 꼭 필요한 단일 속성에 한해 최소화되어 있다.
- [ ] 디자인시스템 데모 컬럼 영역이 있다면 4개 정해진 클래스만 사용했다.

### 접근성·인터랙션

- [ ] Focus 링이 모든 상호작용 요소에 유지된다.
- [ ] Modal · Popover 의 ESC / 외부 클릭 닫기 동작이 정상 (Destructive Confirm 제외).
- [ ] Tooltip 의 `pointer-events: none` 가 유지된다.
- [ ] icon-only 버튼·트리거의 의미가 보조 텍스트로 전달된다.

---

## 9. Do / Don't 종합 사전

| 영역 | DO | DON'T |
|---|---|---|
| **Color** | 토큰만 호출 (`var(--brand)`, `var(--ink-*)`, `var(--surface-*)`, `var(--good|warn|bad)`) | 임의 hex 도입, 브랜드/의미 컬러 오용 |
| **Surface** | `--surface-rail / side / topbar / card / page` 5종만 | Rail/Side/Topbar/Card 의 hex 직접 사용 |
| **Typography** | Roboto / Pretendard / Mono 의 역할 분리, `.num` 으로 자릿수 정렬 | 입력에 Mono, 임의 사이즈/웨이트 추가, 외부 웹폰트 |
| **Icon** | Phosphor Regular, `currentColor` 상속, icon-only 시 `aria-label` | 가중치 혼용, 자체 아이콘, 임의 fill |
| **Grid** | 16-col, span 합 16, 정해진 6 패턴 우선 사용 | 임의 column 수, 페이지별 breakpoint 추가 |
| **Spacing/Radius** | 정해진 스케일만 | 임의 값 |
| **Layout** | App Shell 4영역 보존, page actions 는 Page Header | Topbar 에 페이지 액션 추가 |
| **Button** | Primary = Refined Blue, 3 사이즈, 6 상태 | Primary 외에 Refined Blue, Mono 라벨, Focus 링 제거 |
| **Widget** | 1depth + 2depth, Header(Title/Sub/Actions) + Body | 3depth 이상, 2depth 에 shadow |
| **Table** | 1depth Widget 안에 배치, Mono 는 식별자/리터럴만 | 임의 컬러 줄무늬, 수치에 Mono |
| **Popover** | 4 방향 + flip, ESC / 외부 클릭 닫기 | Popover 안 Popover, Menu+Select 혼용 |
| **Modal** | 4 사이즈, 4 의도, Destructive 만 close-block | 모달 안 모달, 임의 px 너비, 단순 안내에 모달 |
| **Input** | `.rfn-field` 래퍼, Focus = Refined Blue 3px 링, 같은 행 버튼과 height 일치 | 입력값에 Mono, 임의 height/border |
| **Tab** | 1depth(40h, brand) / 2depth(32h, ink) 분리 | 3depth 중첩, 위젯 내부에 1depth |
| **Toast** | 4 의도, 4 duration, 액션 ≤1, 스택 ≤4 | 액션 2개+, 5개+ 스택, 복잡한 결정 |
| **Tooltip** | hover/focus, inverted 톤, 8방향 + flip | Tooltip 안 액션, 클릭/터치, 본문 톤과 동색 |
| **Carousel** | 보조 콘텐츠 한정, 슬라이드 수에 맞는 indicator | 페이지 네비, 결정 필요한 곳 auto-play, 임의 width |
| **Mode** | 토큰 호출만으로 자동 적응, currentColor 활용 | 한 모드 전용 hex, 모드별 자산 별도 생성, 의미 인덱스 분리 |
| **Mode Demo** | `.ds-mode-col` · `.ds-mode-col.ds-mode-dark` · `.ds-live-canvas` · `.ds-live-canvas--dark` 4종만 사용 | 데모 컬럼 안에서 임의 색 재정의 |

---

## 부록 · 빠른 참조

### 핵심 토큰 한눈에 보기

```css
/* Brand */
var(--brand)        /* #76A6D7 — Primary action */
var(--brand-600)    /* #5A8FC5 — Primary hover */
var(--brand-700)    /* #3F76AE — Primary active, link */
var(--brand-50)
var(--brand-100)

/* Ink (Light → Dark 자동 반전) */
var(--ink-900)  var(--ink-800)  var(--ink-700)  var(--ink-600)  var(--ink-500)
var(--ink-400)  var(--ink-300)  var(--ink-200)  var(--ink-100)  var(--ink-50)

/* Surface */
var(--surface-rail)   var(--surface-side)   var(--surface-topbar)
var(--surface-card)   var(--surface-page)

/* Semantic */
var(--good)  var(--good-50)
var(--warn)  var(--warn-50)
var(--bad)   var(--bad-50)

/* Background / White */
var(--bg)     var(--white)

/* Shadow */
var(--shadow-sm)   var(--shadow)   var(--shadow-card)

/* Fonts */
var(--font-en)   /* Roboto, Pretendard, ... */
var(--font-kr)   /* Pretendard */
var(--font-mono) /* JetBrains Mono */
```

### 컴포넌트 셀렉터 한눈에 보기

```
Button       .rfn-btn .rfn-btn--{primary|secondary|tertiary|danger}
             .rfn-btn--{sm|lg}  .rfn-btn--icon   (md=기본 .rfn-btn, 별도 클래스 없음)
Widget       .rfn-widget  .rfn-widget-head  .rfn-widget-body  .rfn-widget-actions
2depth Box   .rfn-box  .rfn-box-label  .rfn-box-value
KPI          .kpi  .row1  .label  .badge  .v  .big  .unit
             .foot  .delta(.up|.down|.flat)  .vs  .spark
Table        .rfn-table  .rfn-tcell-{tag|progress|spark|dot}  .rfn-checkbox
             .rfn-tcell-dot--{good|warn|bad|neutral|off}  .badge
Popover      .rfn-popover  .rfn-popover-{head|sub|sep|item|option|option-icn}
             .rfn-popover-item--danger   .rfn-popover-anchor (트리거 앵커 래퍼)
Modal        .rfn-modal  .rfn-modal-overlay  .rfn-modal-{head|body|foot}
             .rfn-modal--{sm|md|lg|xl}
             .rfn-modal-head-icon--{brand|good|warn|danger}
             .rfn-modal-overlay--drawer-{left|right}
Input        .rfn-field  .rfn-field--{search|textarea}
             .rfn-field--{sm|lg}   (md=기본 .rfn-field, 별도 클래스 없음)
             .rfn-formfield  .rfn-formfield-feedback  .rfn-formfield-meta
Tab          .rfn-tabs  .rfn-tabs--depth-2  .rfn-tab  .rfn-tab-{label|icon|count}
Toast        .rfn-toast  .rfn-toast-stack--{position}  .rfn-toast--{brand|good|warn|danger}
Tooltip      .rfn-tooltip  .rfn-tooltip--{top|bottom|left|right}-{start|center|end}
Data Popover .cf-tip                                (차트/그래프/히트맵/Sankey hover · 라이트·다크 공통 다크 톤 · §4.9.1)
Carousel     .rfn-carousel  .rfn-carousel--{single|multi-2|-3|-4}
             .rfn-carousel-arrow  .rfn-carousel-dots  .rfn-carousel-counter
             .rfn-carousel-progress
Badge·Tag·Chip .rfn-badge  .rfn-badge--sm        (mono 카운트/상태/식별자)
             .rfn-tcell-tag                       (테이블 셀 인라인 분류 태그)
             .chip  .chip--{static|quiet|pill|sm} (기본=인터랙티브 필터/선택, 정적 라벨=static·quiet)
             .pill  .pill.{new|beta|count}         (네비 항목 표식)
Form Control .rfn-seg  .rfn-seg--{fill|on-surface} (Segmented)
             .rfn-toggle (2-state)  .rfn-checkbox  .rfn-radio
             .rfn-radio-group  .rfn-radio-opt(-title|-desc)
Tree         .rfn-tree  .rfn-tree-row  .rfn-tree-{chev|ic|lbl|type|mark}  .rfn-tree-children
ERD · Node   .rfn-erd  .rfn-erd-{scroll|world|edges|edge|dot|legend|zoom|controls}
             .rfn-node(.added)  .rfn-node-{head|ic|name|badge|grip|tabs|tab|colhead|col}
             .rfn-key.{pk|fk|none}
Inspector    .rfn-inspector  .rfn-inspector-scroll
             .rfn-inspector-sec(--stack|.collapsed)  .rfn-inspector-sec-{head|body}
             .rfn-inspector-row  .rfn-inspector-{label|ctl|hint}
             data-insp-{sec|toggle|when}            (선택 대상별 노출 = JS 동작 계약)
```

### 컴포넌트 사이즈 정합표

| 컴포넌트 | sm | md (기본) | lg |
|---|---|---|---|
| Button | 28 | **32** | 40 |
| Input (.rfn-field) | 28 | **32** | 40 |
| Tab | 2depth = 32 | — | 1depth = 40 |
| Modal | 360 | **480** | 640 (lg) / 800 (xl) |
| Icon scale | xs 11 / sm 12 | **md 14** | lg 16 / xl 18 / 2xl 24 / 3xl 32+ |

같은 행의 버튼과 입력은 **반드시 height 를 일치시킵니다.**

---

문서 끝.
